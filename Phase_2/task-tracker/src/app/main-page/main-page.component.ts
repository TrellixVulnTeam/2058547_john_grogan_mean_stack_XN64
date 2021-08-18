import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  arrayStr:any = localStorage.getItem("tasks");
  array:Array<Task> = JSON.parse(this.arrayStr);
  displayedColumns:string[] = ['id','name','task','date']
  isDisabled:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  addTask(taskRef:NgForm){
    let userTask = taskRef.value;
    if(userTask.id==null || userTask.name==null || userTask.task==null || userTask.date==null){
      taskRef.reset()
    }
    else if(userTask.id=="" || userTask.name=="" || userTask.task==""|| userTask.date==""){
        taskRef.reset()
    }
    else{
      let tempTask = new Task(userTask.id,userTask.name,userTask.task,userTask.date);
      let taskStr:any = localStorage.getItem("tasks")
      let taskArray = JSON.parse(taskStr)
      taskArray.push(tempTask)
      localStorage.setItem("tasks",JSON.stringify(taskArray))
      this.array = taskArray;
    }
    taskRef.reset()
  }

}
