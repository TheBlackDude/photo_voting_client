import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ToastController
} from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';

/**
 * Generated class for the AddImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-image',
  templateUrl: 'add-image.html',
})
export class AddImagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddImagePage');
  }

}
