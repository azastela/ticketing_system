import { Component, Input } from '@angular/core';
import { Router, Params } from '@angular/router';

import { Ticket } from '../../../models/ticket';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

import { CommentService } from '../../../services/comment.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'comment-list',
  templateUrl: 'comment-list.component.html',
})

export class CommentListComponent {
  @Input() comments: Comment[];
  @Input() ticketId: number;
  newComment: Comment = new Comment();
  currentUser: User;
  error: any;

  constructor(
    private router: Router,
    private commentService: CommentService,
    private alertService: AlertService) {
    this.newComment = new Comment();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  addComment(): void {
    this.commentService
      .save(this.ticketId, this.newComment)
      .then(comments => {
        this.newComment = new Comment();
        this.comments = comments;
      })
      .catch(error => this.alertService.error(error));
  }

  deleteComment(comment: Comment, event: any): void {
    this.commentService
      .delete(this.ticketId, comment)
      .then(res => {
        this.comments = this.comments.filter(c => c !== comment);
      })
      .catch(error => this.alertService.error(error));
  }
}
