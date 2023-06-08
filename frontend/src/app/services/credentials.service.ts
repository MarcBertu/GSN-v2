import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Credentials } from '../interfaces/credentials';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http : HttpClient) {}

  login(instance : Credentials) : Observable<any> {
    return this.http.post<any>(`${environment.Login}`, instance);
  }

  checkEmail(login: string) : Observable<boolean> {

    var json = {
      email: login
    }

    return this.http.post<boolean>(`${environment.CheckEmail}`, json);
  }

  register(user : JSON) : Observable<any> {
    return this.http.post<any>(`${environment.Register}`, user);
  }
}
