import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Config } from '../../utils/config';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

	public token: any;

  constructor(public http: HttpClient, public storage: Storage) {}

  // Check if the user is already authenticated
  isAuthenticated() {
    // get the token
    this.storage.get('token').then((val) => {
        if (val) {
          this.token = val
          return true
        }
      });
    
  	return false
  }

  createAccount(details) {

  	return new Promise((resolve, reject) => {
  		const headers = new HttpHeaders()
  		headers.append('Content-Type', 'application/json')

  		// send the data to the api
  		this.http.post(`${Config.devApiUrl}accounts/`, details, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
  	});
  }

  login(credentials) {

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
      headers.append('Content-Type', 'application/json')

      // send the data to the api
      this.http.post(`${Config.devApiUrl}auth/`, credentials, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  logout() {
    this.storage.remove('token');
  }

}
