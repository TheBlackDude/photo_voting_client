import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	LoadingController,
	ToastController,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;
	loading: any;
	toast: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public authService: AuthProvider, public loadingCtrl: LoadingController,
  	public toastCtrl: ToastController, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.showLoading('Checking for authentication');

    if (this.authService.isAuthenticated()) {
    	this.showToast('Already Authenticated', 3000);
    	this.loading.dismiss();
    	// redirect to HomePage
    	this.navCtrl.setRoot(HomePage);
    } else {
    	this.showToast('Go ahead and login', 3000);
    	this.loading.dismiss();
    }
  }

  login(){
 
    this.showLoading('Login you in...');

    const credentials = {
        username: this.username,
        password: this.password
    };

    this.authService.login(credentials).then((res: any) => {
        this.loading.dismiss();
        this.storage.set('token', res.token);
        this.showToast('LogedIn successfuly', 3000);
        this.navCtrl.setRoot(HomePage);
    }, (err) => {
    	this.showToast('Your username or password is not correct!', 3000);
        this.loading.dismiss();
        console.log(err);
    });
 
  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }

  showLoading(msg){
 
    this.loading = this.loadingCtrl.create({
        content: msg,
        duration: 5000
    });

    this.loading.present();
  }

   showToast(msg, time) {

   	 this.toast = this.toastCtrl.create({
   	 	message: msg,
   	 	duration: time,
   	 	position: 'top'
   	 });

   	 this.toast.present();
   }

}
