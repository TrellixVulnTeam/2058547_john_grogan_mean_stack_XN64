import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contacts.model';
import { User } from '../user.model';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {
  userStr:any = localStorage.getItem("current")
  userJSON:any = JSON.parse(this.userStr)
  name:string = this.userJSON.username;
  array:Array<Contacts> = this.userJSON.contacts
  constructor() { } 

  ngOnInit(): void {
  }
  addTable(contactName:any, contactNum:any){
    let name = contactName.value;
    let num = contactNum.value;

    let tempContact = new Contacts(name,num);
    this.array.push(tempContact)

    this.userJSON.contacts = this.array;
    localStorage.setItem("current",JSON.stringify(this.userJSON))

    let accountsStr:any = localStorage.getItem("accounts");
    let accountsArray = JSON.parse(accountsStr);

    for(var user of accountsArray){
      if(user.username == this.name && user.password == this.userJSON.password){
        user.contacts = this.array;
      }
    }

    localStorage.setItem("accounts", JSON.stringify(accountsArray));
    
    contactName.value = ""
    contactNum.value = ""
  }

}
