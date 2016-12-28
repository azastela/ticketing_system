import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AppSettings } from './app.settings';

import { AuthGuard } from './guards/auth.guard';
import { AlertService, AuthenticationService, TicketService, CommentService, UserService } from './services/index';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './components/tickets/ticket-form/ticket-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    TicketListComponent,
    TicketDetailComponent,
    TicketFormComponent,
    UserListComponent,
    UserFormComponent,
    CommentListComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    TicketService,
    CommentService,
    UserService,
    AppSettings,
    AUTH_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
