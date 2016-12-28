import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TicketService } from '../../../services/ticket.service';
import { AlertService } from '../../../services/alert.service';
import { Ticket } from '../../../models/ticket';
import { User } from '../../../models/user';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'ticket-form.component.html',
  styleUrls: ['ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {
  @Input() ticket: Ticket;
  statuses = ['open', 'reopened', 'closed'];
  authors: User[];
  agents: User[];
  currentUser: User;
  loading = false;
  error: any;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.ticketService.getTicket(params['id'] ? params['id'] : 'new')
        .then(response => {
          this.ticket = response.ticket;
          this.authors = response.authors;
          this.agents = response.agents;
        }).catch(error => {
          this.alertService.error(error);
        });
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.ticketService
      .save(this.ticket)
      .then(ticket => {
        this.loading = false;
        this.ticket = ticket;
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
