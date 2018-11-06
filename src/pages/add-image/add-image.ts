import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ToastController,
	Platform,
	LoadingController,
	ActionSheetController
} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { ImagesProvider } from '../../providers/images/images';
import { HomePage } from '../home/home';
import { Config } from '../../utils/config';

/**
 * Generated class for the AddImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare const cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-image',
  templateUrl: 'add-image.html',
})
export class AddImagePage {

	lastImage: string = null;
	loading: any;
	toast: any;
	title: string;
	description: string;
	category: string;
	location: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private camera: Camera, private transfer: Transfer, private file: File,
  	private filePath: FilePath, public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController, public platform: Platform,
  	public loadingCtrl: LoadingController, public imageService: ImagesProvider,
  	private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    // get location
    this.getLocation();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
	  // Create options for the Camera Dialog
	  let options = {
	    quality: 100,
	    sourceType: sourceType,
	    saveToPhotoAlbum: true,
	    correctOrientation: true
	  };
	 
	  // Get the data of an image
	  this.camera.getPicture(options).then((imagePath) => {
	    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      this.filePath.resolveNativePath(imagePath)
	        .then(filePath => {
	          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
	          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	        });
	    } else {
	      let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	    }
	  }, (err) => {
	    this.presentToast('Error while selecting image.', 3000);
	  });
  }

    // Create a new name for the image
	createFileName() {
	  let d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}
 
	// Copy the image to a local folder
	copyFileToLocalDir(namePath, currentName, newFileName) {
	  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	  }, error => {
	    this.presentToast('Error while storing file.', 3000);
	  });
	}
 
	// Always get the accurate path to your apps folder
	pathForImage(img) {
	  if (img === null) {
	    return '';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
	}

	sendImage() {

		const info = {
			title: this.title,
			description: this.description,
			category: this.category,
			location: this.location
		}

		this.imageService.createImage(info).then((res: any) => {
			console.log(res);
			if (res.msg === 'image data saved locally') {
				this.presentToast(res.msg, 3000);
			} else {
				this.uploadImage(res.id);
			}
		}, (err) => {
			console.log(err);
		});
	}

	uploadImage(infoId) {
	 
	  // File for Upload
	  let targetPath = this.pathForImage(this.lastImage);

	  // api endpoint
	  let url = `${Config.devApiUrl}image/${infoId}/`;
	 
	  // File name only
	  let filename = this.lastImage;
	 
	  let options = {
	    fileKey: "image",
	    fileName: filename,
	    httpMethod: 'PUT',
	    chunkedMode: false,
	    mimeType: "multipart/form-data",
	    params : {'fileName': filename}
	  };
	 
	  const fileTransfer: TransferObject = this.transfer.create();
	 
	  this.loading = this.loadingCtrl.create({
	    content: 'Uploading...',
	  });
	  this.loading.present();
	 
	  // Use the FileTransfer to upload the image
	  fileTransfer.upload(targetPath, url, options).then(data => {
	    this.loading.dismissAll()
	    this.presentToast('Image succesful uploaded.', 3000);
	    this.navCtrl.push(HomePage);
	  }, err => {
	  	console.log(err)
	    this.loading.dismissAll()
	    this.presentToast('Error while uploading image.', 3000);
	  });
	}

	getLocation(){
    this.geolocation.getCurrentPosition().then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.location = 'lat '+res.coords.latitude+', lng '+res.coords.longitude;
    }).catch((error) => {
    	this.presentToast('Error getting location', 3000);
        console.log('Error getting location', error);
    });
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
