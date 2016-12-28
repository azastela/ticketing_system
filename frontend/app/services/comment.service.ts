import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AppSettings } from '../app.settings';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  constructor(private http: Http,
              private settings: AppSettings,
              public authHttp: AuthHttp) { }

  // Add new Comment
  save(ticketId: number, comment: Comment): Promise<Comment[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.settings.BASE_URL}/tickets/${ticketId}/comments`;

    return this.authHttp
      .post(url, JSON.stringify({comment: comment}), { headers: headers })
      .toPromise()
      .then(res => res.json() as Comment[])
      .catch(this.handleError);
  }

  delete(ticketId: number, comment: Comment): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.settings.BASE_URL}/tickets/${ticketId}/comments/${comment.id}`;

    return this.authHttp
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
