import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from './../../services/auth.service';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(
    private _authService: AuthService,
    private _flashMessage: NgFlashMessageService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    this._authService.authenticateUser(this.user)
    .subscribe(data => {
      if (data.success === true) {
        // Pass in data.token and data.user to the back end
        this._authService.storeUserData(data.token, data.user);
        this._flashMessage.showFlashMessage({
          messages: data.msg ,
          dismissible: true,
          timeout: 8000,
          type: 'success'
        });
        this._router.navigate(['dashboard']);
      } else {
        this._flashMessage.showFlashMessage({
          messages: data.msg,
          dismissible: true,
          timeout: 8000,
          type: 'danger'
        });
        this._router.navigate(['login']);
      }
    });
  }
}
