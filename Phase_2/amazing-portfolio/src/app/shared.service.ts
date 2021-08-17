import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  login:boolean = true;
  portfolio:boolean = false;
  reg:boolean = false;
  
  constructor() { }

  loadPortfolio(){
    this.login = false;
    this.portfolio = true;
    this.reg = false;
  }
  loadReg(){
    this.login = false;
    this.portfolio = false;
    this.reg = true;
  }
  loadLogin(){
    this.login = true;
    this.portfolio = false;
    this.reg = false;
  }
  update(){
    
  }
}
