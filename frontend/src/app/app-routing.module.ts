import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlanningComponent } from './components/planning/planning.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { LoginComponent } from './components/credentials/login/login.component';
import { RegisterComponent } from './components/credentials/register/register.component';
import { MainComponent } from './components/main/main.component';
import { VerifEmailViewComponent } from './components/verif-email-view/verif-email-view.component';

const routes: Routes = [
  {path: 'main', component: MainComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'planning', component: PlanningComponent},
    {path: 'data', component: GestionComponent},
    {path: '', redirectTo: '/main/planning', pathMatch: 'full'},
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'email', component: VerifEmailViewComponent},
  {path: '', redirectTo: '/login', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
