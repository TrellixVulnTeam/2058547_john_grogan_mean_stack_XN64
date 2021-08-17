import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { User } from '../user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regRef=new FormGroup({
    fname:new FormControl("",[Validators.required]),
    lname:new FormControl("",[Validators.required]),
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })
  str:any = localStorage.getItem("accounts")
  constructor(public ser:SharedService) { }

  ngOnInit(): void {
  }
  addUser(){
    let temp = JSON.parse(this.str)

    let login=this.regRef.value;
    let tempUser = new User(login.fname,login.lname,login.user,login.pass,[]);
    
    temp.push(tempUser);
    console.log(temp)
    localStorage.setItem("accounts",JSON.stringify(temp))

    this.ser.loadLogin()
    this.regRef.reset()
  }

}
