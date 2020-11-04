import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { IQuestion } from './question';
import { IAnswer } from './answer';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { IServer } from './server';
import { SERVER_CONF } from './consts';

@Injectable()
export class AskService {

      constructor(private _http: Http) { }

      ask(keyword: String): Observable<IQuestion[]> {
            const askUrl = environment.SERVER_URL + '/ask?question=';
            let headers = new Headers({ 'Authorization': 'Basic ' + btoa('admin:456') });
            let options = new RequestOptions({ headers: headers, method: "get" });

            return this._http.get(askUrl + keyword)
                  .map((response: Response) => <IQuestion[]>response.json())
                  //.do(data => console.log('All: ' +  JSON.stringify(data)))
                  .catch(this.handleError);
      }


      getAnswer(id: Number, search: String): Observable<IAnswer> {
            const anwerUrl = environment.SERVER_URL + '/answer';
            return this._http.get(anwerUrl + "/" + id + "?question=" + search)
                  .map((response: Response) => <IAnswer>response.json())
                  //.do(data => console.log('All: ' +  JSON.stringify(data)))
                  .catch(this.handleError);
      }


      public configServer(): Observable<IServer> {
            return this._http.get(SERVER_CONF)
                  .map((response: Response) => {
                        this.setServer(<IServer>response.json())
                  })
                        
                  .catch(this.handleError);
      }

      private setServer(server) {
            environment.SERVER_URL = server.serverWeb;
      }

      sendFeedBack(questionId: Number, name: String, email: String, comments: String): Observable<any> {
            const feedBackUrl = environment.SERVER_URL + '/feedback';
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers, method: "post" });
            let data = new Comment();
            data.id = questionId;
            data.creator = name.toString();
            data.email = email.toString();
            data.feedback = comments.toString();

            return this._http.post(feedBackUrl, JSON.stringify(data), options)
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
      email: String;
      creator: String;
      feedback: String;
}
