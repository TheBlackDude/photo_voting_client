import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	email: string;
	username: string;
	first_name: string;
	last_name: string;
	password: string;
	confirm_password: string;

	toast: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public authService: AuthProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    if (this.authService.isAuthenticated()) {
    	this.showToast('Already Authenticated', 3000);
    	// redirect to HomePage
    	this.navCtrl.setRoot(HomePage);
    } else {
    	this.showToast('Register', 3000);
    }
  }

  register(){
 
    const details = {
        email: this.email,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        confirm_password: this.confirm_password
    };
 
    this.authService.createAccount(details).then((res: any) => {
      this.showToast(res.msg, 3000);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
    	this.showToast('Make sure your information is correct!', 3000);
        console.log(err);
    });
 
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
