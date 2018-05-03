import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,AlertController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {AmountProvider} from '../../providers/amount/amount'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;
  credentials: Observable<any>;
  status;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,public httpClient: HttpClient,private alertCtrl: AlertController,public amountprov: AmountProvider) {

    this.credentials = this.httpClient.post('http://10.2.1.128:6060/getCredentials',{"rib":"000402500339580","numCheque":"9123456","montant":this.amountprov.amount});
    this.credentials
      .subscribe(data => {
        this.status=data[3];
        console.log('my data: ', data);
      })

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  cancel(){
    this.navCtrl.push('WelcomePage');
  }

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
              // alert.dismiss();
              let alerttt = this.alertCtrl.create({
                title: 'Success',
                subTitle: 'Funds are succesfuly blocked',
                buttons: [{
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.push('WelcomePage');
                  }
                }]
              });

              let TIME_IN_MS = 2000;
              let hideFooterTimeout = setTimeout( () => {
                alerttt.present();
              }, TIME_IN_MS);

            } else {
              // invalid login
              alert.dismiss();
              let alertt = this.alertCtrl.create({
                title: 'Incorrect Password',
                subTitle: 'Please enter your correct password !',
                buttons: ['Ok']
              });
              alertt.present();
              console.log("no no no");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
