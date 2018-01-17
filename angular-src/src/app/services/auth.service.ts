import { User } from './../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  authToken: any;
  user: User;

  constructor(private _http: HttpClient) { }

  // Backend Post Req to /register
  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'my-auth-token');
    return this._http.post<User>('http://localhost:3000/users/register', user, {headers});
  }

  // Backend post to /authenticate
  authenticateUser(user: User): Observable<any> {
    this.user = user;
    const headers = new HttpHeaders();
    headers.set('Authorization', 'my-auth-token');
    // Return observable
    return this._http.post('http://localhost:3000/users/authenticate', user, {headers});

  }

  // Backend get user
  getProfile(): Observable<any> {
    // access to jwt
    this.loadToken();
    // sending jwt to header with the req
    // Return observable
    return this._http.get('http://localhost:3000/users/profile', { headers: new HttpHeaders().set('Authorization', this.authToken )});

  }
  // login jwt and user data storage
  storeUserData(token, user) {
    // Save the jwt in local storage
    localStorage.setItem('id_token', token);
    // Save user in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Fetch the jwt in local storage
  loadToken() {
    // jwt
    const token = localStorage.getItem('id_token');
    // assign jwt
    this.authToken = token;
  }

  // Check to see if the token present.
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  // Clear token remove user from local storage to log user out.
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
