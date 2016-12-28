import { Component } from '@angular/core';

import { User } from '../../models/user';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent {
  currentUser: User;
  reportUrl: string;
  users: User[] = [];

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const accessToken = localStorage.getItem('id_token');
    this.reportUrl = `http://localhost:3000/api/v1/tickets/report.pdf?access_token=Bearer ${accessToken}`
  }
}
