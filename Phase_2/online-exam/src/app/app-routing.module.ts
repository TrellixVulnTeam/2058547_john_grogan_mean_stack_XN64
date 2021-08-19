import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReviewComponent } from './review/review.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"test", component:TestComponent},
  {path:"review", component:ReviewComponent},
  //{path:"home/:uname", component:DashboardComponent},
  {path: "", redirectTo:"home", pathMatch:"full"},
  {path: "**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
