import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs/observable/from';
// import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';

/*
  Generated class for the OfflineManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const STORAGE_REQ_KEY = 'storedreq';
 
interface StoredRequest {
  url: string,
  type: string,
  data: any,
  time: number,
  id: string
}
@Injectable()
export class OfflineManagerProvider {

	toast: any;

  constructor(public http: HttpClient, private toastCtrl: ToastController,
  	private storage: Storage) {
    console.log('Hello OfflineManagerProvider Provider');
  }

  checkForEvents() {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap((storedOperations): Observable<{}[]> => {
        let storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
            	this.presentToast('Local data succesfully synced to API!', 3000);
 
                this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          console.log('no local events to sync');
          return from(this.storage.get(STORAGE_REQ_KEY));
        }
      })
    )
  }

  storeRequest(url, type, data) {
  	this.presentToast('Your data is stored locally because you seem to be offline.', 3000);
 
    let action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };
 
    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);
 
      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    let obs = [];
 
    for (let op of operations) {
      console.log('Make one request: ', op);
      let oneObs = this.http.request(op.type, op.url, op.data);
      obs.push(oneObs);
    }
 
    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }

  presentToast(msg, time) {

   	 this.toast = this.toastCtrl.create({
   	 	message: msg,
   	 	duration: time,
   	 	position: 'top'
   	 });

   	 this.toast.present();
   }

}
