import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AppSettings } from '../app.settings';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Ticket } from '../models/ticket';

@Injectable()
export class TicketService {

  constructor(private http: Http,
              private settings: AppSettings,
              public authHttp: AuthHttp) { }

  getTickets(): Promise<Ticket[]> {
    const url = `${this.settings.BASE_URL}/tickets`;
    return this.authHttp
      .get(url)
      .toPromise()
      .then(response => response.json() as Ticket[])
      .catch(this.handleError);
  }

  getTicket(id: string): Promise<any> {
    const url = `${this.settings.BASE_URL}/tickets/${id}`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(ticket: Ticket): Promise<Ticket> {
    return ticket.id ? this.put(ticket) : this.post(ticket)
  }

  delete(ticket: Ticket): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.settings.BASE_URL}/tickets/${ticket.id}`;

    return this.authHttp
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Ticket
  private post(ticket: Ticket): Promise<Ticket> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.settings.BASE_URL}/tickets`;

    return this.authHttp
      .post(url, JSON.stringify(ticket), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing Ticket
  private put(ticket: Ticket): Promise<Ticket> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.settings.BASE_URL}/tickets/${ticket.id}`;

    return this.authHttp
      .put(url, JSON.stringify(ticket), { headers: headers })
      .toPromise()
      .then(() => ticket)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
