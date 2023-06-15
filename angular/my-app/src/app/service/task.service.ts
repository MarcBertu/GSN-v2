import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';
import { environment } from 'src/environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) {}

  getAllTask(id: string, type: string) : Observable<Array<Task>> {
    return this.http.post<Array<Task>>(`${environment.GetAllTasks}`, {
      idUser: id,
      typeUser: type
    });
  }

  addTask(task : Task) : Observable<void> {
    return this.http.post<void>(`${environment.AddTask}`, task);
  } 

  deleteTask(task : Task) : Observable<void> {
    return this.http.delete<void>(`${environment.DeleteTask}`, {
      body : task,
    });
  }
}
