import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';

import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(
    private firebaseAnalytics: FirebaseAnalytics,
    private fcm: FCM,
    public popoverCtrl: PopoverController) { }

  presentPopover(event: Event) {
    console.log('test');

    this.fcm.subscribeToTopic('marketing');

    this.fcm.getToken().then(token => {
      alert(token);
    })

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    })

    this.fcm.onTokenRefresh().subscribe(token => {
      alert(token);
    })

    this.firebaseAnalytics.logEvent('page_view', { page: "about" })
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));

    this.firebaseAnalytics.logEvent('page_about', { page: "about" })
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));

    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
