import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http : HttpClient) {}

  sendVerifEmail(receiver: string, id: number, type: number) : Observable<any> {
    return this.http.post(`${environment.SendEmailVerif}`, {
      receiver: receiver,
      id: id,
      userType: type
    });
  }

  verifEmail(id: number, type: number) : Observable<any> {
    return this.http.post(`${environment.EmailIsVerified}`, {
      userId: id,
      userType: type
    });
  }
}
