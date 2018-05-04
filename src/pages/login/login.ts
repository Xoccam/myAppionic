import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, AlertController, LoadingController} from 'ionic-angular';

import { User } from '../../providers/providers';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {AmountProvider} from '../../providers/amount/amount'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { numCheque: string, montant: string ,codeAgence:string, rib: string , codeBanque: string} = {
    numCheque: '2495159',
    rib: '000402500350153',
    codeBanque: '06',
    codeAgence: '801',
    montant: ''
  };

  // Our translated text strings

  credentials: Observable<any>;
  cin;
  nom;
  prenom;
  status;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private alertCtrl: AlertController, public httpClient: HttpClient, public amountprov:AmountProvider,public loadingCtrl: LoadingController) {
  }

  public openModal(){
    if ( this.account.montant == '' ) {              // invalid login
      let alertttt = this.alertCtrl.create({
        title: 'Incorrect Amount',
        subTitle: 'Please enter the amount !',
        buttons: ['Ok']
      });
      alertttt.present();
      return false;
    }
    this.amountprov.amount = this.account.montant;
    this.credentials = this.httpClient.post('http://10.2.1.128:6060/getCredentials',{"rib":"000402500350153","numCheque":"2495159","montant":this.account.montant});
    this.credentials
      .subscribe(data => {
        this.cin=data[0];
        this.nom=data[1];
        this.prenom=data[2];
        this.status=data[3];
        let alert = this.alertCtrl.create({
          title: 'Identity details',
          message: 'Please check if the cheque\'s owner  matches these details !<br><br>' + '<b>CIN</b> : '+ this.cin + '<br> <b>First Name</b> : ' + this.nom + '<br> <b>Last Name</b> : ' + this.prenom ,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                console.log(this.cin);
                this.navCtrl.push('WelcomePage');
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                console.log('Confirm');
                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                });

                loading.present();

                setTimeout(() => {
                  loading.dismiss();
                  this.navCtrl.push('SignupPage');
                }, 5000);
                // let TIME_IN_MS = 2000;
                // let hideFooterTimeout = setTimeout( () => {
                //   this.navCtrl.push('SignupPage');
                // }, TIME_IN_MS);

              }
            }
          ],
          cssClass: 'alertCustomCss',
        });
        alert.present();
        console.log('my data: ', this.cin);
      })

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
