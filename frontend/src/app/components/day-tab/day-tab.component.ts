import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DayTab } from 'src/app/model/day-tab';
import { CustomTaskDetailsDialogComponent } from '../custom-task-details-dialog/custom-task-details-dialog.component';
import { Task } from 'src/app/interfaces/task';
import { PlanningComponent } from '../planning/planning.component';

@Component({
  selector: 'app-day-tab',
  templateUrl: './day-tab.component.html',
  styleUrls: ['./day-tab.component.css']
})
export class DayTabComponent {

  @Input() model : DayTab | undefined;

  constructor(private _dialogRef : MatDialog, private parent : PlanningComponent) {}

  showDetails(task : Task) {
    this._dialogRef.open(CustomTaskDetailsDialogComponent, {
      data: task,
      disableClose : true,
    });

    this._dialogRef.afterAllClosed.subscribe( () => {
      this.parent.fetchAllTask();
    });
  }

}
