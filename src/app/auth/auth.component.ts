import { AuthenticationService, AuthResponse } from './authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isSignedUp: Boolean = false ;
  isLoading: Boolean = false ;
  errorMessage: string = null ;
  authObserver:  Observable<AuthResponse> ;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {}

  switchMode() {
    this.isSignedUp = !this.isSignedUp ;
    this.errorMessage = '' ;
  }

  onSubmit(form: NgForm) {
    console.log(form.value.email);
    console.log(this.isSignedUp);
    this.isLoading = true;
    if (!this.isSignedUp) {
      this.authObserver = this.authService.signUp(form.value.email, form.value.password) ;
    } else {
      this.authObserver = this.authService.logIn(form.value.email, form.value.password) ;
    }
    this.authObserver
    .subscribe(
      response => {
        // console.log(response);
        this.errorMessage = '';
        this.isLoading = false ;
      },
      message => {
        this.errorMessage = message ;
        this.isLoading = false ;
      }
    );
    form.reset() ;
    console.log('hi');
  }


}
