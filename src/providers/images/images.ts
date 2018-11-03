import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../../utils/config';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {

  constructor(public http: HttpClient, public authService: AuthProvider) {
    console.log('Hello ImagesProvider Provider');
  }

  getImages() {

  	return new Promise((resolve, reject) => {
  		const headers = new HttpHeaders()
  		headers.append('Content-Type', 'application/json')

  		// send the data to the api
  		this.http.get(`${Config.devApiUrl}images/`, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
  	});
  }

  createImage(image) {

  	return new Promise((resolve, reject) => {
  		const headers = new HttpHeaders()
  		headers.append('Content-Type', 'application/json')
  		headers.append('Authorization', this.authService.token);

  		// send the data to the api
  		this.http.post(`${Config.devApiUrl}images/`, image, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
  	});
  }

}
