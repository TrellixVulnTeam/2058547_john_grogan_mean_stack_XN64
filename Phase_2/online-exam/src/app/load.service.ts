import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(public http:HttpClient) { }

  checkData():Observable<Question[]>{
    return this.http.get<Question[]>("/assets/test.json")
  }
}
