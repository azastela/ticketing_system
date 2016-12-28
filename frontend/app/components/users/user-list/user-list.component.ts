import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  templateUrl: 'user-list.component.html',
})

export class UserListComponent implements OnInit {
  users: User[];
  currentUser: User;
  error: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => this.users = users)
      .catch(error => {
        this.alertService.error(error);
      });
  }

  getRoleClass(user: User): string {
    switch (user.role) {
      case 'customer':
        return 'tag-success';
      case 'agent':
        return 'tag-warning';
      case 'admin':
        return 'tag-danger';
      default:
        return '';
    }
  }

  deleteUser(user: User, event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.userService
      .delete(user)
      .then(res => {
        this.users = this.users.filter(u => u !== user);
      })
      .catch(error => this.alertService.error(error));
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
