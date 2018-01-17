import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../services/auth.service';
import { ValidateService } from './../../services/validate.service';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  flash = {};

  constructor(
    private _validateService: ValidateService,
    private _flashMessage: NgFlashMessageService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  registerSubmit(registerForm: NgForm) {
    // Required Fields
    if (this._validateService.validateRegister(this.user)) {
      // Validate Email
          this._validateService.validateEmail(this.user.email);
          // Register Auth
          this._authService.registerUser(this.user).subscribe(data => {
          console.log('In the authentication method', data);
          if (data) {
            this._flashMessage.showFlashMessage({
              messages: ['You can now login'],
              dismissible: true,
              timeout: 10000,
              type: 'success'
            });
            this._router.navigate(['login']);
          } else {
            this._flashMessage.showFlashMessage({
              messages: ['Something went wrong!'],
              dismissible: true,
              timeout: 10000,
              type: 'danger'
            });
            this._router.navigate(['register']);
          }
        });
      }
    // registerForm.reset();
  }
}
