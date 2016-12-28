import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { User } from '../../../models/user';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'user-form.component.html'
})

export class UserFormComponent implements OnInit {
  @Input() user: User;
  roles = [
    {displayValue: 'Normal User', value: 'customer'},
    {displayValue: 'Support Agent', value: 'agent'},
    {displayValue: 'Admin', value: 'admin'},
  ]

  loading = false;
  error: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        let id = +params['id'];
        this.userService.getUser(id)
          .then(user => this.user = user)
          .catch(error => this.alertService.error(error));
      } else {
        this.user = new User();
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.userService
      .save(this.user)
      .then(user => {
        this.loading = false;
        this.user = user;
        this.goBack();
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false
      });
  }

  goBack(): void {
    window.history.back();
  }
}
