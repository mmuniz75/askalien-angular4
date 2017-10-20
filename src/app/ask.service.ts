import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';

import { IQuestion } from './question';
import { IAnswer } from './answer';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AskService {

  //private static SERVER = "localhost:8080/mythidb-3.2";
  private static SERVER = "mythi-wildfly.us-east-1.elasticbeanstalk.com";

  private _askUrl = 'http://' + AskService.SERVER + '/rest/question/ask?question=';
  private _anwerUrl = 'http://' + AskService.SERVER + '/rest/answer/detail?id=';
  private _feedBackUrl = 'http://' + AskService.SERVER + '/rest/question/feedback';
    
  constructor(private _http: Http) { }

  ask(keyword:String) : Observable<IQuestion[]>{
    
     return this._http.get(this._askUrl + keyword)
        .map((response: Response) => <IQuestion[]> response.json().questions)
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }


  getAnswer(id: Number,search:String) : Observable<IAnswer> {
        return this._http.get(this._anwerUrl + id + "&search=" + search)
        .map((response: Response) => <IAnswer> response.json().answer)
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

  sendFeedBack(questionId:Number,name:String,email:String,comments:String):Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers ,method: "post"});
      
      let data = new URLSearchParams();
      data.set('questionId',questionId.toString());
      data.set('name',name.toString());
      data.set('email',email.toString());
      data.set('comments',comments.toString());
                

      return this._http.post(this._feedBackUrl, data, options)
                    //.map((response: Response) => response.json())
                    .catch(this.handleError);

  }

 private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }

}  