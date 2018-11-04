import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { ImagesProvider } from '../../providers/images/images';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { AddImagePage } from '../add-image/add-image';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	toast: any;
	token: any;
	images: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
  	public authService: AuthProvider, public storage: Storage,
  	public imageService: ImagesProvider) {

  }

  ionViewDidLoad() {
  	// get the images
  	this.imageService.getImages().then((res: any) => {
  		this.images = res;
  		console.log(res);
  	}, (err) => {
  		console.log(err);
  	})
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

  addImage() {
  	this.navCtrl.push(AddImagePage);
  }

  logout() {
  	this.authService.logout()
  	this.showToast('successfully loged out', 3000);
  	this.ionViewDidLoad();
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
