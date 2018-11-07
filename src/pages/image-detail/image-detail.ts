import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ImagesProvider } from '../../providers/images/images';

/**
 * Generated class for the ImageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-detail',
  templateUrl: 'image-detail.html',
})
export class ImageDetailPage {

	image: any;
	upvote: number;
	downvote: number;
	toast: any;
	upvoteCheck: any;
	downvoteCheck: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public imageService: ImagesProvider, public toastCtrl: ToastController) {
  	this.image = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDetailPage');
    console.log(this.image);
  }

  vote(value) {
  	if (value === 'upvote') {
  		this.upvote = 1;
  		this.downvote = 0;
  		this.upvoteCheck = null;
  		this.downvoteCheck = null;
  	}
  	if (value === 'downvote') {
  		this.downvote = 1;
  		this.upvote = 0;
  		this.downvoteCheck = null;
  		this.upvoteCheck = null;
  	}
  	const votes = {
  		upvote: this.upvote,
  		downvote: this.downvote
  	}
  	this.imageService.vote(votes, this.image.id).then((res: any) => {
  		this.presentToast('Vote added!', 3000);
  		console.log(res);
  		this.image.upvote = res.upvote;
  		this.image.downvote = res.downvote;
  		// this.ionViewDidLoad();
  	}, (err) => {
  		console.log(err);
  		this.presentToast('Vote not added!', 3000);
  	})
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
