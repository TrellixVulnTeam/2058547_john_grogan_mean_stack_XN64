import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRef=new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })



  loginBool:boolean=false;
  msg:string=""

  constructor(public ser:SharedService) { }

  ngOnInit(): void {
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
          this.ser.loadPortfolio();
          this.loginRef.reset()
          this.msg = "Login Success! please click the login button to proceed"
          return;
        }
      }
    }
    this.loginBool = false;
    this.msg = "Login Failed... Please try again"
    this.loginRef.reset()
    
  }
}
