import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidationComponent } from './validation/validation.component';
import { ListComponent } from './list/list.component';
import { StatusComponent } from './status/status.component';


const routes: Routes = [
  { path: '', redirectTo: '/validation', pathMatch: 'full' },
  { path: 'validation', component: ValidationComponent },
  { path: 'list', component: ListComponent },
  { path: 'status', component: StatusComponent },
  { path: '**', redirectTo: '/validation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
