import { User } from '../Shared/User.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface AuthResponse {
    idToken: string ;
    email: string ;
    refreshToken: string ;
    expiresIn: string ;
    localId: string ;
    registered ?: string ;
  }

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currUser = new BehaviorSubject<User>(null) ;

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(usrEmail: string, usrPassword: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBB4aQcw3yHGvgYGa-zD2V46Y3ZONJ3PvA',
    {
      email : usrEmail ,
      password : usrPassword ,
      returnSecureToken : true
    })
    .pipe(catchError(this.handleError),
          tap(response => {
            // console.log(response) ;
            this.createUser(response.email, response.localId, response.idToken, +response.expiresIn);
          }));
  }

  logIn(usrEmail: string, usrPassword: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBB4aQcw3yHGvgYGa-zD2V46Y3ZONJ3PvA',
    {
      email : usrEmail ,
      password : usrPassword ,
      returnSecureToken : true
    })
    .pipe(catchError(this.handleError),
          tap(response => {
          // console.log(response) ;
          this.createUser(response.email, response.localId, response.idToken, +response.expiresIn);
        }));
  }

  autoLogin() {
    const localStorageUser: {
      email: string,
      uId: string,
      _token: string,
      _tokenExpirationdate: Date} = JSON.parse(localStorage.getItem('auth')) ;
    // console.log(localStorageUser);
    if (!localStorageUser) {
      return null ;
    }
    const loggedInUser = new User(localStorageUser.email,
                                  localStorageUser.uId,
                                  localStorageUser._token,
                                  localStorageUser._tokenExpirationdate) ;
    if (loggedInUser.token) {
      this.currUser.next(loggedInUser);
      const expiresInMilliSeconds = new Date(localStorageUser._tokenExpirationdate).getTime()  - new Date().getTime() ;
      console.log(expiresInMilliSeconds);
      this.autoLogout(expiresInMilliSeconds);
    }
  }

  logout() {
    this.currUser.next(null);
    localStorage.removeItem('auth');
    this.router.navigate(['/Auth']);
  }

  autoLogout(expirationTime: number) {
    setTimeout(() => {
      this.logout() ;
    }, expirationTime) ;
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes.error.error.message);
      let errorMessage = 'Unknown error occurred' ;
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS' :
          errorMessage = 'Email already exists' ;
          break;
        case 'INVALID_EMAIL' :
          errorMessage = 'Email is invalid' ;
          break;
        case 'EMAIL_NOT_FOUND' :
          errorMessage = 'Email/Password  is incorrect' ;
          break;
        case 'INVALID_PASSWORD' :
          errorMessage = 'Email/Password  is incorrect' ;
         break;
      }
      return throwError(errorMessage);
  }

  private createUser(email: string, localId: string, tokenId: string, expiresIn: number) {
     //  expiresIn is in seconds
            const expirationDate  = new Date( new Date().getTime() + expiresIn * 1000) ;
            const user = new User(email, localId, tokenId, expirationDate);
            this.currUser.next(user);
            localStorage.setItem('auth', JSON.stringify(user)) ;
            this.autoLogout(expiresIn * 1000 );
  }
}

