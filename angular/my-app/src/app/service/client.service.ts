import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interface/client';
import { environment } from 'src/environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.getClients}`);
  };

}
