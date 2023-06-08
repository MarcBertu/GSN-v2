import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PlanningComponent } from './components/planning/planning.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { TimeTabComponent } from './components/time-tab/time-tab.component';
import { DayTabComponent } from './components/day-tab/day-tab.component';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { CustomTaskDetailsDialogComponent } from './components/custom-task-details-dialog/custom-task-details-dialog.component';
import { LoginComponent } from './components/credentials/login/login.component';
import { RegisterComponent } from './components/credentials/register/register.component';
import { MainComponent } from './components/main/main.component';
import { VerifEmailDialogComponent } from './components/verif-email-dialog/verif-email-dialog.component';
import { VerifEmailViewComponent } from './components/verif-email-view/verif-email-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanningComponent,
    GestionComponent,
    TimeTabComponent,
    DayTabComponent,
    CustomDialogComponent,
    CustomTaskDetailsDialogComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    VerifEmailDialogComponent,
    VerifEmailViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
