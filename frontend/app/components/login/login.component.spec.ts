import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AlertService } from '../../services/alert.service'
import { AuthenticationService } from '../../services/authentication.service'
import { AlertComponent } from '../shared/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

describe('Login', () => {
  beforeEach(() => {
    let alertServiceStub = {};
    let authenticationServiceStub = {};
    let activatedRoute = {};
    let router = {};
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent, AlertComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: router },
      ]
    });
  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(LoginComponent);
    let alertService = TestBed.get(AlertService);
    expect(fixture.componentInstance instanceof LoginComponent).toBe(true, 'should create LoginComponent');
  });
});
