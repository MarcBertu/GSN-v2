import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { Credentials } from 'src/app/interfaces/credentials';
import { Employee } from 'src/app/interfaces/employee';
import { Users } from 'src/app/interfaces/users';
import { Utils } from 'src/app/model/utils';
import { CredentialsService } from 'src/app/services/credentials.service';
import { VerifEmailDialogComponent } from '../../verif-email-dialog/verif-email-dialog.component';
import { EmailService } from 'src/app/services/email.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
      private _credService : CredentialsService,
      private _emailService: EmailService,
      private formBuilder: FormBuilder,
      private snackbarRef : MatSnackBar,
      private _router : Router,
      private _dialogRef: MatDialog,
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    
  }

  login() {

    console.log(this.f);
    

    const cred : Credentials = {
      idCredentials : undefined,
      login: this.f['email'].value,
      hashPassword : Utils.sha512(this.f['password'].value),
      type: undefined
    }

    this._credService.login(cred).subscribe({
      next: (result : any) => {

        console.log(result);

        const type : number = result.userType;
        var data : Object = result.data;

        let user : Users = {
          idUser: -1,
          type: type,
          lastname: "",
          firstname: "",
          email: "",
          phone: 0,
          fax: undefined,
          birthDate: undefined,
          siren: undefined,
          siret : undefined,
          isVerified: undefined
        }

        if(type == 0 || type == 1) {

          const employee = data as Employee;

          user.idUser = employee.idEmployee;
          user.lastname = employee.lastname;
          user.firstname = employee.firstname;
          user.birthDate = employee.birthDate;
          user.email = employee.email;
          user.phone = employee.phone;
          user.isVerified = employee.isVerified;
        }
        else if (type == 2) {

          var client =  data as Client;

          user.idUser = client.idClient;
          user.lastname = client.lastname;
          user.firstname = client.firstname;
          user.email = client.email;
          user.phone = client.phone;
          user.fax = client.fax;
          user.siret = client.siret;
          user.siren = client.siren;
          user.isVerified = client.isVerified;
        }

        if(user.isVerified == 0) {
          this._emailService.sendVerifEmail(user.email, user.idUser, type).subscribe({
            next: () => {
              this.snackbarRef.open("Un email vient de vous être envoyé pensez à vérifier votre boîte mail !", "J'ai compris");
            },
            error: (error) => console.log(error)
          })
        }
        else if(user.isVerified == -1) {

        }
        else {
          this.snackbarRef.open(`Connexion réussi !`, '', {
            duration: 2000,
          });
  
          this._router.navigate(['/main']);
        }

      },
      error : (error) => {
        console.log(error);
        
      },
    })
  }

}
