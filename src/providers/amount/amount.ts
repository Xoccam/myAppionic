import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AmountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AmountProvider {

  amount:any;


  constructor(public http: HttpClient) {
    console.log('Hello AmountProvider Provider');
  }

}
