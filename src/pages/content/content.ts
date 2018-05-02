import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public navCtrl: NavController,private alertCtrl: AlertController) { }

  next(){
    let alert = this.alertCtrl.create({
      title: 'Bank Account',
      message: 'Please enter your password',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            if (data.password=="123") {
              // logged in!
              console.log("ok ok ok");
              this.navCtrl.push('WelcomePage');
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

}
