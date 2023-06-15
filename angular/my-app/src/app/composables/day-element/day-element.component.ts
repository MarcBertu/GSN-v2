import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanningComponent } from 'src/app/components/planning/planning.component';
import { Task } from 'src/app/interface/task';
import { WeekElement } from 'src/app/model/week_element';
import { DialogComponent } from '../dialog/dialog.component';
import { CustomTaskDetailsDialogComponent } from 'src/app/components/custom-task-details-dialog/custom-task-details-dialog.component';

@Component({
  selector: 'app-day-element',
  templateUrl: './day-element.component.html',
  styleUrls: ['./day-element.component.css']
})
export class DayElementComponent {

  @Input() model : WeekElement | undefined;

  constructor(private _dialogRef : MatDialog, private parent : PlanningComponent) {}

  showDetails(task : Task) {

    if( sessionStorage.getItem('admin') == 'false' ) { return; }

    this._dialogRef.open(CustomTaskDetailsDialogComponent, {
      data: task,
      disableClose : true,
    });

    this._dialogRef.afterAllClosed.subscribe( () => {
      this.parent.fetchAllTask();
    });
  }

}
