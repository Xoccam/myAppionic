import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  credentials: Observable<any>;
  constructor(public navCtrl: NavController,private camera: Camera ,public httpClient: HttpClient) {

  }


  getCred(){

    this.credentials = this.httpClient.post('http://10.2.1.138:6060/getCredentials',{"rib":"999","numCheque":"111","montant":33});
    this.credentials
      .subscribe(data => {
        console.log('my data: ', data);
      })

  }

  scanCode() {
    // this.getCred();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push('LoginPage');
    }, (err) => {
      // Handle error
    });

    // this.navCtrl.push('LoginPage');
  }

  inputCode() {
    this.navCtrl.push('SignupPage');
  }


}
