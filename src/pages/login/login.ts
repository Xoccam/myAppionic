import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { User } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { numCheque: string, montant: string , rib: string , codeBanque: string} = {
    numCheque: '346137849346137849',
    rib: '64857123461378491206',
    codeBanque: '64',
    montant: ''
  };

  // Our translated text strings


  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private alertCtrl: AlertController) {

  }

  public openModal(){
    let alert = this.alertCtrl.create({
      title: 'Confirm check',
      message: 'CIN : ******** ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.push('WelcomePage');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Confirm');
            this.navCtrl.push('SignupPage');
          }
        }
      ]
    });
    alert.present();
  }

  // Attempt to login in through our User service
  checkCIN() {
    this.navCtrl.push('SignupPage');


    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push('SignupPage');
    // }, (err) => {
    //   this.navCtrl.push('SignupPage');
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     // message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
    // console.log('t3ada');
  }
}
