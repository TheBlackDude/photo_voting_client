import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Config } from '../../utils/config';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {

	token: any;

  constructor(public http: HttpClient, public authService: AuthProvider,
  	public storage: Storage) {
    console.log('Hello ImagesProvider Provider');
  }

  getImages() {

  	return new Promise((resolve, reject) => {
  		this.storage.get('token').then((val) => {
          this.token = val
        });
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

  createImage(info) {

  	return new Promise((resolve, reject) => {
  		// send the data to the api
  		this.http.post(`${Config.devApiUrl}images/`, info, {
  			headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
  		})
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
  	});
  }

}
