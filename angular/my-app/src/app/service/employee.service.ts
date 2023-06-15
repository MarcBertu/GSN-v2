import { Injectable } from '@angular/core';
import { Employee } from '../interface/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http: HttpClient) { }

  getAll() : Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.getEmployees}`);
  };
}
