import { RouterTestingModule } from '@angular/router/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Renderer } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

class MockRouter { public navigate() {}; }

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            AppComponent,
            Renderer,
            {provide: Router,  useClass: MockRouter }
        ],
        declarations: [AppComponent],
        imports: [ RouterTestingModule ]
    });

  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
