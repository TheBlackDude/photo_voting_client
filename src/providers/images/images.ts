import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Config } from '../../utils/config';
import { AuthProvider } from '../auth/auth';
// import { OfflineManagerProvider } from '../offline-manager/offline-manager';
// import { NetworkProvider, ConnectionStatus } from '../network/network';

/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API_STORAGE_KEY = 'key';

@Injectable()
export class ImagesProvider {

	token: any;

  constructor(public http: HttpClient, public authService: AuthProvider,
  	public storage: Storage) {
    console.log('Hello ImagesProvider Provider');
  }

  getImages() {

  	return new Promise((resolve, reject) => {
        /* if offline return cached data */
        // if (this.network.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
        // 	this.getLocalData('images').then(res => {
        // 		resolve(res);
        // 	});
        // } else {
        // 	// put below code here, once the network plugin is working
        // }
        this.storage.get('token').then((val) => {
              this.token = val
        });
    	const headers = new HttpHeaders()
  		headers.append('Content-Type', 'application/json')

  		// send the data to the api
  		this.http.get(`${Config.devApiUrl}images/`, {headers: headers})
        .subscribe(res => {
          /* Cache data */
          this.saveDataLocally('images', res);
          resolve(res);
        }, err => {
          reject(err);
        });
  	});
  }

  createImage(info) {

  	return new Promise((resolve, reject) => {

  		// if (this.network.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
  		// 	/* Store request locally */
  		// 	this.offlineManager.storeRequest(`${Config.devApiUrl}images/`, 'post', info)
  		// 	  .then(res => {
  		// 	  	resolve({'msg': 'image data saved locally'});
  		// 	});
  		// } else {
  		// 	// put the code below here, once the network plugin is working
  		// }
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

  vote(votes, id) {
  	return new Promise((resolve, reject) => {
  		// send the data to the api
  		this.http.put(`${Config.devApiUrl}image/vote/${id}/`, votes)
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
  	});
  }

  getLocalData(key) {
  	return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  saveDataLocally(key, data) {
  	this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

}
