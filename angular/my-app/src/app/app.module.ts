import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionComponent } from './components/gestion/gestion.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlanningComponent } from './components/planning/planning.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifEmailComponent } from './components/verif-email/verif-email.component';
import { DayElementComponent } from './composables/day-element/day-element.component';
import { DialogComponent } from './composables/dialog/dialog.component';
import { CustomTaskDetailsDialogComponent } from './components/custom-task-details-dialog/custom-task-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    PlanningComponent,
    GestionComponent,
    NavigationComponent,
    VerifEmailComponent,
    DayElementComponent,
    DialogComponent,
    CustomTaskDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
