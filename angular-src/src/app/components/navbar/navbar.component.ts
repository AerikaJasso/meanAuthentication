import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _flashMessage: NgFlashMessageService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logoutClick() {
    this._authService.logout();
    this._flashMessage.showFlashMessage({
      messages: ['Successful logout'],
      dismissible: true,
      timeout: 8000,
      type: 'success'
    });
    this._router.navigate(['login']);
    return false;
  }

}
