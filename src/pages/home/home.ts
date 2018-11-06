import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { ImagesProvider } from '../../providers/images/images';
// import { OfflineManagerProvider } from '../../providers/offline-manager/offline-manager';
// import { NetworkProvider, ConnectionStatus } from '../../providers/network/network';
import { LoginPage } from '../login/login';
import { AddImagePage } from '../add-image/add-image';
import { ImageDetailPage } from '../image-detail/image-detail';
import { RankPage } from '../rank/rank';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	toast: any;
	images: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
  	public authService: AuthProvider, public storage: Storage,
  	public imageService: ImagesProvider) {

  }

  ionViewDidLoad() {
  	/* Check the network */
  	// the (network) plugin is not working

  	// this.network.onNetworkChange().subscribe((status: ConnectionStatus) => {
  	// 	if (status == ConnectionStatus.Online) {
  	// 		this.offlineManager.checkForEvents().subscribe();
  	// 	}
  	// });

  	// get the token
    this.storage.get('token').then((val) => {
        if (!val) {
        	this.navCtrl.push(LoginPage);
        } else {
        	/* get the images.
        	   Even though this this will only get called once but
        	   on a real world application, we'll fix the (network plugin issue),
        	   or implement another caching method to cache this data.
        	 */
		  	this.imageService.getImages().then((res: any) => {
		  		this.images = res;
		  		console.log(res);
		  	}, (err) => {
		  		console.log(err);
		  	});
        }
      });
  }

  addImage() {
  	this.navCtrl.push(AddImagePage);
  }

  imageDetail(image) {
  	this.navCtrl.push(ImageDetailPage, image);
  }

  rankImages() {
  	const highVotes = [];
  	const lowVotes = [];

  	for (const image of this.images ) {
  		(image.upvote > 5 && image.downvote < 5) ? highVotes.push(image) : lowVotes.push(image);
  	}
  	this.navCtrl.push(RankPage, {highVotes: [...highVotes], lowVotes: [...lowVotes]});
  }

  logout() {
  	this.authService.logout();
  	this.navCtrl.push(LoginPage);
  	this.presentToast('successfully loged out', 3000);
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
