import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AddImagePage } from '../pages/add-image/add-image';
import { ImageDetailPage } from '../pages/image-detail/image-detail';
import { RankPage } from '../pages/rank/rank';
import { AuthProvider } from '../providers/auth/auth';
import { ImagesProvider } from '../providers/images/images';
import { NetworkProvider } from '../providers/network/network';
import { OfflineManagerProvider } from '../providers/offline-manager/offline-manager';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    AddImagePage,
    ImageDetailPage,
    RankPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'voting',
      driverOrder: ['indexeddb', 'sqlite']
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    AddImagePage,
    ImageDetailPage,
    RankPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    AuthProvider,
    ImagesProvider,
    NetworkProvider,
    OfflineManagerProvider
  ]
})
export class AppModule {}
