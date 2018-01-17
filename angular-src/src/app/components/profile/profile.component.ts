import { Router } from '@angular/router';
import { User } from './../../user';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    // load user when component init.
    this._authService.getProfile().subscribe(data => {
      console.log('profile component data observable', data);
      this.user = data.user;
    },
    err => {
      this._flashMessage.showFlashMessage({
        messages: ['Something Went Wrong'],
        dismissible: true,
        timeout: 8000,
        type: 'danger'
      });
      return false;
    });
  }

}
