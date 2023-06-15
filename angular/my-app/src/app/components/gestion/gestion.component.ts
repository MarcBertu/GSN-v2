import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/interface/client';
import { Credentials } from 'src/app/interface/credentials';
import { Employee } from 'src/app/interface/employee';
import { ClientService } from 'src/app/service/client.service';
import { CredentialsService } from 'src/app/service/credentials.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  clients: Client[] = [];
  employees: Employee[] = [];
  candidates: Credentials[] = [];

  liste : any[] = [];

  type : number = -1;

  constructor(private location: Location, private _router: Router, private _clientService: ClientService, private _employeeService: EmployeeService, private _credentialService: CredentialsService) { }

  ngOnInit(): void {

    let data = sessionStorage.getItem('admin');
    if(data == 'false') {
      this.location.back();
    }

    this._clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.liste = this.clients;
    this.type = 0;
  }

  showEmployee() {
    this.liste = this.employees;
    this.type = 1;
  }

  showClient() {
    this.liste = this.clients;
    this.type = 0;
  };

  deleteUser(user: Employee|Client) {

    var json: JSON;
      var data: any = {
        "email": user.email,
        "hashPassword": "",
        "isAdmin": true
      };

      json = <JSON>data;

    this._credentialService.unregister(json).subscribe({
      next: (data) => {
        console.log(data);

        this.showClient();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getWaitingList() {
    this._credentialService.getAllUsers().subscribe({
      next: (data) => {
        this.candidates = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  allowUser(user: Credentials) {

    var json: JSON;
    var data: any = {
      "email": user.login,
    };

    json = <JSON>data;

    this._credentialService.allowUser(json).subscribe({
      next: (data) => {
        console.log(data);

        document.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  disconnect() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}
