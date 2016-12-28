import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './components/tickets/ticket-form/ticket-form.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: TicketListComponent
        },
        {
          path: 'tickets/new',
          component: TicketFormComponent
        },
        {
          path: 'tickets/:id',
          component: TicketDetailComponent
        },
        {
          path: 'tickets/:id/edit',
          component: TicketFormComponent
        },
        {
          path: 'users',
          component: UserListComponent
        },
        {
          path: 'users/new',
          component: UserFormComponent
        },
        {
          path: 'users/:id/edit',
          component: UserFormComponent
        }
      ]
    },
    { path: 'login', component: LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routes = RouterModule.forRoot(appRoutes);
