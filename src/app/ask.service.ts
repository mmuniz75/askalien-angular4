import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';

import { IQuestion } from './question';
import { IAnswer } from './answer';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class AskService {

  private static SERVER = environment.SERVER_URL;

  private _askUrl = 'http://' + AskService.SERVER + '/ask?question=';
  private _anwerUrl = 'http://' + AskService.SERVER + '/answer/';
  private _feedBackUrl = 'http://' + AskService.SERVER + '/feedback';
    
  constructor(private _http: Http) { }

  ask(keyword:String) : Observable<IQuestion[]>{
      let headers = new Headers({ 'Authorization': 'Basic ' +  btoa('admin:456') });   
      let options = new RequestOptions({ headers: headers ,method: "get"});

     return this._http.get(this._askUrl + keyword)
        .map((response: Response) => <IQuestion[]> response.json())
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }


  getAnswer(id: Number,search:String) : Observable<IAnswer> {
        return this._http.get(this._anwerUrl + "/" + id + "?question=" + search)
        .map((response: Response) => <IAnswer> response.json())
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

  sendFeedBack(questionId:Number,name:String,email:String,comments:String):Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers ,method: "post"});
      let data = new Comment();
      data.id = questionId;
      data.creator = name.toString();
      data.email = email.toString();
      data.feedback = comments.toString();          
      
      return this._http.post(this._feedBackUrl, JSON.stringify(data), options)
                    //.map((response: Response) => response.json())
                    .catch(this.handleError);

  }

 private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }
}  

export class Comment {
   id: Number;
   email : String;
   creator : String;
   feedback : String;
}
  