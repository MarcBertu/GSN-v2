import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../interface/client';
import { Credentials } from '../../interface/credentials';
import { Employee } from '../../interface/employee';
import { Users } from '../../interface/users';
import { CredentialsService } from '../../service/credentials.service';
import { EmailService } from '../../service/email.service';
import { Utils } from '../../utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm : FormGroup;

  constructor(
      private _credService : CredentialsService,
      private _emailService: EmailService,
      private _formBuilder: FormBuilder,
      private _router : Router,
      private _snackbarRef : MatSnackBar
    ) {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
  }

  login() {
  
    const cred : Credentials = {
      idCredentials : undefined,
      login: this.f['email'].value,
      hashPassword : Utils.sha512(this.f['password'].value),
      type: undefined,
      isVerified: 0
    }

    this._credService.login(cred).subscribe({
      next: (result : any) => {

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
        }

        if(user.isVerified == 0) {
          this._emailService.sendVerifEmail(user.email, user.idUser, type).subscribe({
            next: () => {
              this._snackbarRef.open("Un email vient de vous être envoyé pensez à vérifier votre boîte mail !", "J'ai compris");
            },
          })
        }
        else if(user.isVerified == -1) {
          this._snackbarRef.open("Veuillez attendre la permission de l'administateur avant de vous connecter !", "J'ai compris");
        }
        else {
          if(type == 0) {
            sessionStorage.setItem('admin', 'true');
          }
          else {
            sessionStorage.setItem('admin', 'false');
          }

          sessionStorage.setItem('id', user.idUser.toString());
          sessionStorage.setItem('type', user.type.toString());

          this._snackbarRef.open(`Connexion réussi !`, '', {
            duration: 2000,
          });

          delay(2000);

          this._router.navigate(['/planning']);
        }

      },
      error : (error) => {
        this._snackbarRef.open("Erreur lors de la connexion !", "J'ai compris");
      },
    })
  }

  redirectRegister() {
    this._router.navigate(['/register']);
  }

}
