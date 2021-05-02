import { AuthenticationService } from './../auth/authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorSerrvice implements HttpInterceptor {
    token: string;
    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.authService.currUser.pipe(take(1)).subscribe(user => {
            if (!user) {
                return next.handle(req);
            }
            this.token = user.token ;
          });
        const authReq = req.clone({
            params: new HttpParams().set('auth', this.token)
          });
        return next.handle(authReq);
    }

}
