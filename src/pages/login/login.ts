import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

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
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
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
