import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) {}

  getAllTask() : Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${environment.GetAllTasks}`);
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
