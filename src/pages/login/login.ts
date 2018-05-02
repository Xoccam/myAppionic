import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { User } from '../../providers/providers';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


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

  credentials: Observable<any>;
  cin;
  nom;
  prenom;
  status;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private alertCtrl: AlertController, public httpClient: HttpClient) {

  }

  public openModal(){

    this.credentials = this.httpClient.post('http://10.2.1.138:6060/getCredentials',{"rib":"999","numCheque":"111","montant":33});
    this.credentials
      .subscribe(data => {
        this.cin=data[0];
        this.nom=data[1];
        this.prenom=data[2];
        this.status=data[3];

        let alert = this.alertCtrl.create({
          title: 'Confirm check',
          message: 'CIN : '+ this.cin + '<br> First Name : ' + this.nom + '<br> Last Name : ' + this.prenom ,
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
                this.navCtrl.push('SignupPage');
              }
            }
          ]
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
