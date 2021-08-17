import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MyPortfolioComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
