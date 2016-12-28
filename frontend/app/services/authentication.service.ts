import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http,
              private settings: AppSettings) { }

  login(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `${this.settings.BASE_URL}/sign_in`

    return this.http.post(
      url,
      JSON.stringify({ email: email, password: password }),
      {headers: headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json()['user'];
        if (user && user.auth_token) {
          //store user details and jwt token in local storage
          //to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('id_token', user.auth_token);
        }
      });
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('id_token');
  }
}
