import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/interface/credentials';
import { Utils } from './../../utils/utils';
import { CredentialsService } from 'src/app/service/credentials.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  faxInput : HTMLElement | null;
  clientSideInput : HTMLElement | null;
  birthDateInput : HTMLElement | null ;

  private userType : number = -1;

  constructor(
    private _credService : CredentialsService,
    private _formBuilder: FormBuilder,
    private _snackbarRef : MatSnackBar,
    private _router : Router,
  ) 
  {
    this.registerForm = this._formBuilder.group({
      lastname : ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      verifPassword: ['', Validators.required],
      birthDate: [''],
      fax : [''],
      siret: [''],
      siren : ['']
    });

    this.faxInput = null;
    this.clientSideInput = null;
    this.birthDateInput = null;
  }

  ngOnInit(): void {
    var clientInput;
    var employeeInput;

    clientInput = document.getElementById('type_client');
    employeeInput = document.getElementById('type_employee');

    this.faxInput = document.getElementById('fax');
    this.clientSideInput = document.getElementById('client_side');
    this.birthDateInput = document.getElementById('birthDate');

    // On initialise la vue 
    this.userType = 1;
    this.birthDateInput!!.style.display = 'block';

    clientInput?.addEventListener('click',() => {
      this.faxInput!!.style.display = "block";
      this.clientSideInput!!.style.display = "block";
      this.birthDateInput!!.style.display = "none";

      this.userType = 2;
    });

    employeeInput?.addEventListener('click', () => {
      this.faxInput!!.style.display = "none";
      this.clientSideInput!!.style.display = "none";
      this.birthDateInput!!.style.display = "block";

      this.userType = 1;
    });
  }

  get f() { return this.registerForm.controls; }

  submit() {
    
    if(this.f['email'].invalid) {
      this._snackbarRef.open("Veuillez renseigner une adresse mail !", "", {
        duration: 1500,
      });
    }
    else {
      this.checkEmail();
    }

  }

  checkEmail() {

    const {email} = this.f;

    this._credService.checkEmail(email.value).subscribe({
      next: (result) => {

        if(result == false) {
          this._snackbarRef.open("Cette adresse mail est déjà utilisé ! Vous possèdez peut être déjà un compte ?", "Ok");
        }
        else {
          this.checkPassword();
        }
      },
      error: (error) => {
        this._snackbarRef.open("Une erreur est survenue lors de la vérification de votre adresse mail !", "Ok");
      },
    })
  }

  checkPassword() {

    const {password, verifPassword} = this.f;

    if(password.value != verifPassword.value) {
      this._snackbarRef.open("Vos mot de passe ne sont pas identiques !", "J'ai compris");
    } else {
      this.register();
    }
  }

  register() {

    const {email, lastname, firstname, phone, password, verifPassword, birthDate, fax, siret, siren} = this.f;

    var bool = true;

    if(this.userType == 1) {
      if(birthDate.value == '') {
        this._snackbarRef.open("Veuillez renseigner une date de naissance !", "", {
          duration: 1500,
        });

        bool = false;
      }
    } else if(this.userType == 2) {
      if(fax.value == '' || siren.value == '' || siret.value == '') {
        this._snackbarRef.open("Veuillez vérifiez que votre numéro FAX, SIRET ou SIREN est bien renseigné", "", {
          duration: 1500,
        });

        bool = false;
      }
    }

    if(bool) {

      var json: JSON;
      var data: any = {
        "mail": email.value,
        "hashPassword": Utils.sha512(password.value),
        "typeUser": this.userType,
        "firstname": firstname.value,
        "lastname": lastname.value,
        "birthDate": birthDate.value,
        "phone": phone.value,
        "fax": fax.value,
        "siret": siret.value,
        "siren": siren.value
      };

      json = <JSON>data;

      this._credService.register(json).subscribe({
        next: (result) => {
          this._snackbarRef.open("Votre inscription à bien était pris en compte !", "J'ai compris").afterDismissed().subscribe({
            next: () => this._router.navigate(['/login'])
          })
          
        },
        error: (error) => {
          this._snackbarRef.open("Une erreur est survenue lors de votre inscription !", "J'ai compris");
        }
      })
    }

    
  }

  redirectLogin() {
    this._router.navigate(['/login']);
  }

}
