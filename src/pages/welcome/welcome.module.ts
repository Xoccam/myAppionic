import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { WelcomePage } from './welcome';
import {HTTP} from "@ionic-native/http";

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    TranslateModule.forChild()
  ],
  exports: [
    WelcomePage
  ],
  providers: [
    HTTP

  ]
})
export class WelcomePageModule { }
