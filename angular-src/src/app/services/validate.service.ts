import { Injectable } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable()
export class ValidateService {

  constructor(private _flashMessage: NgFlashMessageService) { }

  validateRegister(user) {
    if (
      user.name === '' || user.email === '' ||
      user.username === '' || user.password === ''
    ) {
        this._flashMessage.showFlashMessage({
        messages: ['Must complete all fields'],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 7000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;
    }
    return true;
  }

  validateEmail(email) {
    console.log('*' + email + '*');
    // tslint:disable-next-line:max-line-length
    const re = /(\w+)\@(\w+)\.[a-zA-Z]/g;
    const emailTest = re.test(email);
    if ( emailTest === false) {
      this._flashMessage.showFlashMessage({
        messages: ['Please provide a valid email'],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });
      return false;
    }
    return true;
  }

}
