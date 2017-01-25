import { Component } from '@angular/core';
import { Platform, NavController, NavParams  } from 'ionic-angular';
 

//import { ItemDetailsPage } from '../item-details/item-details';

declare var window: any;

@Component({
  templateUrl: 'sms.html'
})
export class SmsPage {

  items: Array<{read: string, address: string, body: string}>;
  texto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) 
  { 
    this.items = [];
    platform.ready().then
    (
      () => 
      {
        this.listSMS();
        window.SMS.enableIntercept(true, ()=>{}, ()=>{});
        document.addEventListener('onSMSArrive', (e: any)=>{
            	var data = e.data;
              this.texto=data;
              /*
            	smsList.push( data );
            	updateStatus('SMS arrived, count: ' + smsList.length );
            	var divdata = $('div#data');
            	divdata.html( divdata.html() + JSON.stringify( data ) );
              */
            });
      }
    );
  }

  listSMS()
  {
    var filter = 
    {
      box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

      // following 4 filters should NOT be used together, they are OR relationship
      read : 1, // 0 for unread SMS, 1 for SMS already read
      //_id : 1234, // specify the msg id
      //address : '+8613601234567', // sender's phone number
      body : 'Bradesco' // content to match

      // following 2 filters can be used to list page up/down
      //indexFrom : 0, // start from index 0
      //maxCount : 10, // count of SMS to return each time
    };
    //this.texto="thiago2";
    if(!window.SMS)
      console.log("erro");
    window.SMS.listSMS
    (
      filter, (data)=>
      {
       //this.texto=JSON.stringify(data);

        if(Array.isArray(data)) 
        {
            for(var i in data) 
            {
               // this.texto+=(data[i]+"\n\n");
                this.items.push({read: data[i].read, address: data[i].address, body: data[i].body})
            }
        }
      }, function(err){
        console.log('error list sms: ' + err);
      }
    );
  }

  itemTapped(event, item) 
  {
    //this.navCtrl.push(ItemDetailsPage, {item: item});
  }
}
