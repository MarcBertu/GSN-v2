import { Component, OnInit } from '@angular/core';
import { DayTab } from 'src/app/model/day-tab';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { Utils } from 'src/app/model/utils';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private weekNumber : number = Utils.getWeekNumber();

  private currentDate : Date = new Date;

  labels : Array<string> = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ];
 
  constructor(private _taskService : TaskService, private _dialog : MatDialog) {}

  ngOnInit(): void {
    this.fetchAllTask();

    this.updateDate();
  }
  
  weekLabels : Array<DayTab> = [
    new DayTab("Dimanche", new Array(), new Date()),
    new DayTab("Lundi", new Array(), new Date()),
    new DayTab("Mardi", new Array(), new Date()),
    new DayTab("Mercredi", new Array(), new Date()),
    new DayTab("Jeudi", new Array(), new Date()),
    new DayTab("Vendredi", new Array(), new Date()),
    new DayTab("Samedi", new Array(),new Date() ),
  ];

  initData() {
    this.weekLabels.forEach((tab, index) => {
      tab.tasks = new Array();
    })
  }

  fetchAllTask() {
    this._taskService.getAllTask().subscribe({
      next: (data) => {

        this.initData();

        data.forEach( (task) => {
          let date : Date = new Date(task.date);

          let weekIndex : number = date.getDay();

          let tab = this.weekLabels[weekIndex];
          
          let tabYear = tab.date.getFullYear();
          let tabMonth = tab.date.getMonth();
          let tabDay = tab.date.getDate();

          if( (date.getFullYear() == tabYear) && (date.getMonth() == tabMonth) && (date.getDate() == tabDay) ) tab.tasks.push(task);
 
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateDate() {
    // FirstDay
    let day = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay()));

    this.weekLabels.forEach((tab, index) => {
      tab.date = day;

      day = new Date( day.getFullYear(), day.getMonth(), day.getDate() + 1 );
    })
  }

  today() {
    this.currentDate = new Date();

    // The first day of the week will always return the correct week number but susbtract by one so we add one
    this.weekNumber = Utils.getWeekNumberFromDate(this.currentDate) + 1;

    this.updateDate();

    this.fetchAllTask();
  }

  previousWeek() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);

    // The first day of the week will always return the correct week number but susbtract by one so we add one
    this.weekNumber = Utils.getWeekNumberFromDate(this.currentDate) + 1;

    this.updateDate();

    this.fetchAllTask();
  }

  nextWeek() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);

    this.weekNumber = Utils.getWeekNumberFromDate(this.currentDate) + 1;

    this.updateDate();

    this.fetchAllTask();
  }

  addTaskButton() {
    this._dialog.open( CustomDialogComponent, {
      disableClose: true,
    } )

    this._dialog.afterAllClosed.subscribe(() => this.fetchAllTask());
  }

}
