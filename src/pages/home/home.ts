import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	toast: any;
	token: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
  	public authService: AuthProvider, public storage: Storage) {

  }

  ionViewDidLoad() {
  	// get the token
    this.storage.get('token').then((val) => {
        if (val) {
        	this.token = 'yes'
        } else {
        	this.token = 'no'
        }
      });
  }

  gotoLogin() {
  	this.navCtrl.push(LoginPage);
  }

  gotoRegister() {
  	this.navCtrl.push(SignupPage);
  }

  logout() {
  	this.authService.logout().then((res: any) => {
  		console.log(res);
  		this.storage.remove('token');
  		this.showToast(res.detail, 3000);
  		this.ionViewDidLoad();
  	}, (err) => {
  		console.log(err);
  	})
  }


  showToast(msg, time) {

   	 this.toast = this.toastCtrl.create({
   	 	message: msg,
   	 	duration: time,
   	 	position: 'bottom'
   	 });

   	 this.toast.present();
   }

}
