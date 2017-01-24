import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { SmsPage } from '../pages/sms/sms';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { BackgroundMode } from 'ionic-native';

declare var window, document: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'SMSs', component: SmsPage }
    ];
  }

  initializeApp() 
  {
    this.platform.ready().then
    ( () => 
      {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.

        window.SMS.startWatch
        (
          ()=>
          {
                console.log('watching');
          }, ()=>
          {
                console.log('failed to start watching');
          }
        );

        document.addEventListener
        (
          'onSMSArrive', 
          (e)=>
          {
                var sms = e.data;
                console.log(JSON.stringify(sms));
          }
        );

        StatusBar.styleDefault();
        BackgroundMode.setDefaults({silent:true});
        BackgroundMode.enable();
        BackgroundMode.onactivate().subscribe
        (
          ()=>
          {
            console.log('thiago ativou background mode');
          }
        )
      }
    );
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
