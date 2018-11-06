import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ToastController,
	Platform
} from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable()
export class NetworkProvider {

	private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
	toast: any;

  constructor(public http: HttpClient, private network: Network,
  	private toastCtrl: ToastController, private plt: Platform) {
    console.log('Hello NetworkProvider Provider');
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {
  	console.log('Inside func');
  	console.log(this.network);
  	/* for some reason the network plugin have some issues.
  	   I can't access the functions "onDisconnect and onConnect"
  	   am getting Object(...) is not a function.
  	   I've spent 5 hours trying to figure it out, but no luck
  	 */
    this.network.onDisconnect().subscribe(() => {
    	console.log('Inside onDisconnect');
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
 
    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
 
    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    this.presentToast(`You are now ${connection}`, 3000);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }
 
  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
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
