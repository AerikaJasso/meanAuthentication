import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    canActivate() {
        if (this._authService.loggedIn()) {
            return true;
        } else {
            this._router.navigate(['/']);
        }
    }
}
