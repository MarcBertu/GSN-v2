import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {

  constructor(private _taskService : TaskService, private _snackbarRef : MatSnackBar, private _dialogRef : MatDialogRef<CustomDialogComponent>) {}

  task : Task = {
    idTask: undefined,
    label: "Chambre",
    description: "",
    date: new Date(),
    heureDeb : new Date(),
    heureFin : new Date(),
    idEmployee: undefined,
    idClient: undefined,
    idSite: undefined
  };

  submit() {
    this._taskService.addTask(this.task).subscribe({
      next: (result) => { 
        console.log(result); 
        this._snackbarRef.open("Tâche ajouté avec succès !", "", {
          duration: 1500
        });

        this._dialogRef.close();
      },
      error: (error) => {
        console.log(error);
        this._snackbarRef.open("Un problème est apparu lors de l'ajout de la tâche !", "", {
          duration: 2000
        });
      },
    })
  }

}
