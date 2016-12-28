import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ticket } from '../../../models/ticket';
import { User } from '../../../models/user';
import { TicketService } from '../../../services/ticket.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  templateUrl: 'ticket-list.component.html',
})

export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  currentUser: User;
  error: any;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getTickets(): void {
    this.ticketService
      .getTickets()
      .then(tickets => this.tickets = tickets)
      .catch(error => this.alertService.error(error));
  }

  getStatusClass(ticket: Ticket): string {
    switch (ticket.status) {
      case 'open':
        return 'tag-success';
      case 'reopened':
        return 'tag-warning';
      case 'closed':
        return 'tag-danger';
      default:
        return '';
    }
  }

  assignToMe(ticket: Ticket, event: any): any {
    event.stopPropagation();
    event.preventDefault();
    ticket.assigned_to_id = this.currentUser.id;
    this.ticketService.save(ticket)
      .then(res => this.getTickets())
      .catch(error => this.alertService.error(error));
  }

  changeStatus(ticket: Ticket, status: string, event: any): void {
    event.stopPropagation();
    event.preventDefault();
    ticket.status = status;
    this.ticketService
      .save(ticket)
      .then()
      .catch(error => this.alertService.error(error));
  }

  deleteTicket(ticket: Ticket, event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.ticketService
      .delete(ticket)
      .then(res => {
        this.tickets = this.tickets.filter(t => t !== ticket);
      })
      .catch(error => this.alertService.error(error));
  }

  ngOnInit(): void {
    this.getTickets();
  }
}
