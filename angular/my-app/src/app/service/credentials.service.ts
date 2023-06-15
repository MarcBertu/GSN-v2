import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env.dev';
import { Credentials } from '../interface/credentials';
import { Users } from '../interface/users';

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

  unregister(user : JSON) : Observable<any> {
    return this.http.post<any>(`${environment.Unregister}`, user);
  }

  getAllUsers() : Observable<Credentials[]> {
    return this.http.get<Credentials[]>(`${environment.GetUsers}`);
  }

  allowUser(user : JSON) : Observable<any> {
    return this.http.post<any>(`${environment.AllowUser}`, user);
  }
}
