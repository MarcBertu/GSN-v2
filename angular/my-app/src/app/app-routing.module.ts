import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlanningComponent } from './components/planning/planning.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifEmailComponent } from './components/verif-email/verif-email.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'email', component: VerifEmailComponent},
  {path:'planning', component: PlanningComponent},
  {path: 'gestion', component: GestionComponent},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
