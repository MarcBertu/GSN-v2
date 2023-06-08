import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-custom-task-details-dialog',
  templateUrl: './custom-task-details-dialog.component.html',
  styleUrls: ['./custom-task-details-dialog.component.css']
})
export class CustomTaskDetailsDialogComponent {

  constructor(
    private _taskService : TaskService, 
    @Inject(MAT_DIALOG_DATA) public data: Task, 
    private _snackbarRef : MatSnackBar,
    private _dialogRef : MatDialogRef<CustomTaskDetailsDialogComponent>
    ) {}

  submit() {
    this._taskService.deleteTask(this.data).subscribe({
      next: (result) => { 
        console.log(result); 
        this._snackbarRef.open("Tâche supprimé avec succès !", "", {
          duration: 1500
        });

        this._dialogRef.close();
      },
      error: (error) => {
        console.log(error);
        this._snackbarRef.open("Un problème est apparu lors de la suppresion de la tâche !", "", {
          duration: 2000
        });
      },
    });
  }

}
