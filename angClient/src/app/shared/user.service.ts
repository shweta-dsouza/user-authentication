import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { User } from './user.model';


@Injectable()
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // Http Methods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + 'register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + 'authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + 'userProfile');
  }


  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else
      return null;
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
