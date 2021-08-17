import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amazing-portfolio';
  loginFlag:boolean=true;
  registerFlag:boolean=false;
  portfolioFlag:boolean=false;

  loginRef=new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })


  loginBool:boolean=false;
  msg:string=""

  constructor (public ser:SharedService){}

  update(){
    this.loginFlag = this.ser.login;
    this.registerFlag = this.ser.reg;
    this.portfolioFlag = this.ser.portfolio;
  }

  register(){
    this.ser.loadReg();
    this.update();
  }
  loadLogin(){
    this.ser.loadLogin()
    this.update();
  }
  loadPortfolio(){
    this.ser.loadPortfolio();
    this.update();
  }

  checkUser(){
    let login=this.loginRef.value
    let arrayStr:any = localStorage.getItem("accounts");
    let array = JSON.parse(arrayStr);
    for(let i = 0; i < array.length; i++){
      if(login.user == array[i].username){
        if(login.pass == array[i].password){
          this.loginBool = true;
          localStorage.setItem("current",JSON.stringify(array[i]))
          this.loadPortfolio();
          this.loginRef.reset();
          return;
        }
      }
    }
    this.loginRef.reset()
    this.msg = "Login Failed! Please try again"

    
  }
}
