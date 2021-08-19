import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadService } from '../load.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  questionsArray:Array<Question> = [];
  num:number = 0;
  passResult:string = ""
  failResult:string = ""

  constructor(public load:LoadService,
    public router:Router) {
   
   }

  ngOnInit(): void {
    this.load.checkData().subscribe(result=>{
      for(let ll of result){
        var tempQuestion = new Question(
          ll.question,
          ll.ans1,
          ll.ans2,
          ll.ans3,
          ll.ans4,
          ll.correctAns,
          ll.num,
          ll.statment1,
          ll.statment2,
          ll.statment3,
          ll.statment4)
          this.questionsArray.push(tempQuestion);
      }
    })
    let submitedStr:any = localStorage.getItem("sub")
    let submitedArray = JSON.parse(submitedStr);

    for(let i = 0; i < submitedArray.length; i++){
      if(submitedArray[i].correct == true){
        this.num++
      }
    }
    if(this.num > 6){
      this.passResult = "Result " + this.num +" / " + submitedArray.length + " Pass"
      this.failResult = ""
    }
    else{
      this.failResult = "Result " + this.num +" / " + submitedArray.length + " Fail"
      this.passResult = ""
    }

    for(let q of this.questionsArray){
      console.log("here")
    }

  }

  showResults(){
    let submitedStr:any = localStorage.getItem("sub")
    let submitedArray = JSON.parse(submitedStr);

    for(let i = 0; i < submitedArray.length; i++){
      if(submitedArray[i].correct == true){
        if(submitedArray[i].ansSelected == "1"){
          this.questionsArray[i].statment1 = "   Correct Answer Submited"
        }
        if(submitedArray[i].ansSelected == "2"){
          this.questionsArray[i].statment2 = "   Correct Answer Submited"
        }
        if(submitedArray[i].ansSelected == "3"){
          this.questionsArray[i].statment3 = "   Correct Answer Submited"
        }
        if(submitedArray[i].ansSelected == "4"){
          this.questionsArray[i].statment4 = "   Correct Answer Submited"
        }
      }
      if(submitedArray[i].correct == false){
        if(submitedArray[i].ansSelected == "1"){
          this.questionsArray[i].statment1 = "   Selected Wrong Answer"
          if(submitedArray[i].correctAns == "2"){
            this.questionsArray[i].statment2 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "3"){
            this.questionsArray[i].statment3 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "4"){
            this.questionsArray[i].statment4 = "   Correct Asnwer"
          }
        }
        if(submitedArray[i].ansSelected == "2"){
          this.questionsArray[i].statment2 = "   Selected Wrong Answer"
          if(submitedArray[i].correctAns == "1"){
            this.questionsArray[i].statment1 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "3"){
            this.questionsArray[i].statment3 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "4"){
            this.questionsArray[i].statment4 = "   Correct Asnwer"
          }
        }
        if(submitedArray[i].ansSelected == "3"){
          this.questionsArray[i].statment3 = "   Selected Wrong Answer"
          if(submitedArray[i].correctAns == "1"){
            this.questionsArray[i].statment1 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "2"){
            this.questionsArray[i].statment2 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "4"){
            this.questionsArray[i].statment4 = "   Correct Asnwer"
          }
        }
        if(submitedArray[i].ansSelected == "4"){
          this.questionsArray[i].statment4 = "   Selected Wrong Answer"
          if(submitedArray[i].correctAns == "2"){
            this.questionsArray[i].statment2 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "3"){
            this.questionsArray[i].statment3 = "   Correct Asnwer"
          }
          if(submitedArray[i].correctAns == "1"){
            this.questionsArray[i].statment1 = "   Correct Asnwer"
          }
        }
      }
    }
  }

  loadHome(){
    this.router.navigate(['home'])
  }

}
