import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddticketComponent } from './components/addticket/addticket.component';
import { ViewallticketsComponent } from './components/viewalltickets/viewalltickets.component';
import { ViewticketComponent } from './components/viewticket/viewticket.component';
import { EditticketComponent } from './components/editticket/editticket.component';
import { AuthGuard, AuthGuardLogin } from './services/auth.guard';

const routes: Routes = [
  { path: '',  canActivate: [AuthGuardLogin], component: LoginComponent },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'addticket', component: AddticketComponent },
      { path: 'viewalltickets', component: ViewallticketsComponent },
      { path: 'viewticket', component: ViewticketComponent },
      { path: 'editticket/:id', component: EditticketComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
