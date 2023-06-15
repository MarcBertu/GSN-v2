import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/composables/dialog/dialog.component';
import { WeekElement } from 'src/app/model/week_element';
import { TaskService } from 'src/app/service/task.service';
import { Utils } from 'src/app/utils/utils';

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
 
  constructor(private _taskService : TaskService, private _dialog : MatDialog, private _router: Router) {}

  ngOnInit(): void {
    this.fetchAllTask();

    this.updateDate();

    let button = document.getElementById("addTaskButton");
    if( sessionStorage.getItem('admin') == 'false' ) {
      button!!.hidden = true;
    }
  }
  
  weekLabels : Array<WeekElement> = [
    new WeekElement("Dimanche", new Array(), new Date()),
    new WeekElement("Lundi", new Array(), new Date()),
    new WeekElement("Mardi", new Array(), new Date()),
    new WeekElement("Mercredi", new Array(), new Date()),
    new WeekElement("Jeudi", new Array(), new Date()),
    new WeekElement("Vendredi", new Array(), new Date()),
    new WeekElement("Samedi", new Array(),new Date() ),
  ];

  initData() {
    this.weekLabels.forEach((tab, index) => {
      tab.tasks = new Array();
    })
  }

  fetchAllTask() {
    this._taskService.getAllTask(sessionStorage.getItem('id')!!, sessionStorage.getItem('type')!!).subscribe({
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
        alert("Une erreur est survenue lors de la récupération des tâches !");
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
    this._dialog.open( DialogComponent, {
      disableClose: true,
    })

    this._dialog.afterAllClosed.subscribe(() => this.fetchAllTask());
  }

  disconnect() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}