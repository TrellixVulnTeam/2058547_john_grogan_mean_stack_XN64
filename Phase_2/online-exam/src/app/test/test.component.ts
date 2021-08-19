import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadService } from '../load.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questionsArray:Array<Question> = [];
  num:number = 0;
  numCorrect:number = 0;

  ans1ArrayStr:Array<any> = []
  ans1Checked:Array<boolean> = []

  ans2ArrayStr:Array<any> = []
  ans2Checked:Array<boolean> = []

  ans3ArrayStr:Array<any> = []
  ans3Checked:Array<boolean> = []

  ans4ArrayStr:Array<any> = []
  ans4Checked:Array<boolean> = []

  submitedAns:Array<any> = []

  constructor(public load:LoadService, public router:Router) { }

  ngOnInit(): void {
    this.load.checkData().subscribe(result=>{
      for(let ll of result){
        var tempQuestion = new Question(ll.question,
          ll.ans1,
          ll.ans2,
          ll.ans3,
          ll.ans4,
          ll.correctAns,
          ll.num,
          ll.statment1,
          ll.statment2,
          ll.statment3,
          ll.statment4);
          this.questionsArray.push(tempQuestion);
      }
    })
  }

  loadResults(){
    document.getElementsByName("ans1").forEach(ans=>
      this.ans1ArrayStr.push(ans.classList.value)
      );
    document.getElementsByName("ans2").forEach(ans=>
      this.ans2ArrayStr.push(ans.classList.value)
      ); 
    document.getElementsByName("ans3").forEach(ans=>
      this.ans3ArrayStr.push(ans.classList.value)
      );
    document.getElementsByName("ans4").forEach(ans=>
      this.ans4ArrayStr.push(ans.classList.value)
      );

    for(var i = 0; i < this.ans1ArrayStr.length; i++){
      if(this.ans1ArrayStr[i].includes("mat-radio-checked")){
        this.ans1Checked.push(true)
      }
      else{
        this.ans1Checked.push(false)
      }
      if(this.ans2ArrayStr[i].includes("mat-radio-checked")){
        this.ans2Checked.push(true)
      }
      else{
        this.ans2Checked.push(false)
      }
      if(this.ans3ArrayStr[i].includes("mat-radio-checked")){
        this.ans3Checked.push(true)
      }
      else{
        this.ans3Checked.push(false)
      }
      if(this.ans4ArrayStr[i].includes("mat-radio-checked")){
        this.ans4Checked.push(true)
      }
      else{
        this.ans4Checked.push(false)
      }
    }

    for(var i = 0; i < this.ans1Checked.length; i++){
      if(this.questionsArray[i].correctAns == "1"){
        if(this.ans1Checked[i] == true){
          var temp = {correct:true, ansSelected:"1",correctAns:"1"}
          this.submitedAns.push(temp)
          this.numCorrect++
        }
        else if(this.ans2Checked[i] == true){
          var temp = {correct:false, ansSelected:"2",correctAns:"1"}
          this.submitedAns.push(temp)
        }
        else if(this.ans3Checked[i] == true){
          var temp = {correct:false, ansSelected:"3",correctAns:"1"}
          this.submitedAns.push(temp)
        }
        else if(this.ans4Checked[i] == true){
          var temp = {correct:false, ansSelected:"4",correctAns:"1"}
          this.submitedAns.push(temp)
        }
      }

      if(this.questionsArray[i].correctAns == "2"){
        if(this.ans1Checked[i] == true){
          var temp = {correct:false, ansSelected:"1",correctAns:"2"}
          this.submitedAns.push(temp)
        }
        else if(this.ans2Checked[i] == true){
          var temp = {correct:true, ansSelected:"2",correctAns:"2"}
          this.submitedAns.push(temp)
          this.numCorrect++
        }
        else if(this.ans3Checked[i] == true){
          var temp = {correct:false, ansSelected:"3",correctAns:"2"}
          this.submitedAns.push(temp)
        }
        else if(this.ans4Checked[i] == true){
          var temp = {correct:false, ansSelected:"4",correctAns:"2"}
          this.submitedAns.push(temp)
        }
      }

      if(this.questionsArray[i].correctAns == "3"){
        if(this.ans1Checked[i] == true){
          var temp = {correct:false, ansSelected:"1",correctAns:"3"}
          this.submitedAns.push(temp)
        }
        else if(this.ans2Checked[i] == true){
          var temp = {correct:false, ansSelected:"2",correctAns:"3"}
          this.submitedAns.push(temp)
        }
        else if(this.ans3Checked[i] == true){
          var temp = {correct:true, ansSelected:"3",correctAns:"3"}
          this.submitedAns.push(temp)
          this.numCorrect++
        }
        else if(this.ans4Checked[i] == true){
          var temp = {correct:false, ansSelected:"4",correctAns:"3"}
          this.submitedAns.push(temp)
        }
      }

      if(this.questionsArray[i].correctAns == "4"){
        if(this.ans1Checked[i] == true){
          var temp = {correct:false, ansSelected:"1",correctAns:"4"}
          this.submitedAns.push(temp)
        }
        else if(this.ans2Checked[i] == true){
          var temp = {correct:false, ansSelected:"2",correctAns:"4"}
          this.submitedAns.push(temp)
        }
        else if(this.ans3Checked[i] == true){
          var temp = {correct:false, ansSelected:"3",correctAns:"4"}
          this.submitedAns.push(temp)
        }
        else if(this.ans4Checked[i] == true){
          var temp = {correct:true, ansSelected:"4",correctAns:"4"}
          this.submitedAns.push(temp)
          this.numCorrect++
        }
      }
    }
    localStorage.setItem("sub",JSON.stringify(this.submitedAns))
    localStorage.setItem("questions", JSON.stringify(this.questionsArray))
    this.router.navigate(['review'])
  }

}
