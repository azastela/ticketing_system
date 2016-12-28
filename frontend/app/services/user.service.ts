import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AppSettings } from '../app.settings';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: Http,
              private settings: AppSettings,
              public authHttp: AuthHttp) { }

  getUsers(): Promise<User[]> {
    const url = `${this.settings.BASE_URL}/users`;
    return this.authHttp
      .get(url)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.settings.BASE_URL}/users/${id}/edit`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  save(user: User): Promise<User> {
    return user.id ? this.put(user) : this.post(user)
  }

  delete(user: User): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.settings.BASE_URL}/users/${user.id}`;

    return this.authHttp
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new User
  private post(user: User): Promise<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.settings.BASE_URL}/users`;

    return this.authHttp
      .post(url, JSON.stringify({user: user}), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing User
  private put(user: User): Promise<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.settings.BASE_URL}/users/${user.id}`;

    return this.authHttp
      .put(url, JSON.stringify({user: user}), { headers: headers })
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
