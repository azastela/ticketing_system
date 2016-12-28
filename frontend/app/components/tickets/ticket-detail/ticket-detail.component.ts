import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { TicketService } from '../../../services/ticket.service';
import { CommentService } from '../../../services/comment.service';
import { AlertService } from '../../../services/alert.service';
import { Ticket } from '../../../models/ticket';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'ticket-detail.component.html',
  styleUrls: ['ticket-detail.component.scss']
})

export class TicketDetailComponent implements OnInit {
  ticket: Ticket;

  constructor(
    private ticketService: TicketService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.ticketService.getTicket(params['id'])
        .then(resp => this.ticket = resp.ticket)
        .catch(error => this.alertService.error(error));
    });
  }

  goBack(): void {
    this.location.back();
  }
}
