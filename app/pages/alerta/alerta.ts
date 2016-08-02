import { Component } from '@angular/core';
import { NavController ,Alert} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';

/*
  Generated class for the AlertaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/alerta/alerta.html',
})
export class AlertaPage {

  constructor(private nav: NavController) {

  	 LocalNotifications.on("click", (notification, state) => {
            let alert = Alert.create({
                title: "Notification Clicked",
                subTitle: "You just clicked the scheduled notification",
                buttons: ["OK"]
            });
            this.nav.present(alert);
        });

  }

   public schedule() {
        LocalNotifications.schedule({
            title: "Test Title",
            text: "Delayed Notification",
            at: new Date(new Date().getTime() + 5 * 1000),
            sound: null
        });
    }

    /*
    // Schedule a single notification
LocalNotifications.schedule({
  id: 1,
  text: 'Single Notification',
  sound: isAndroid? 'file://sound.mp3': 'file://beep.caf'
  data: { secret: key }
});


// Schedule multiple notifications
LocalNotifications.schedule([{
   id: 1,
   text: 'Multi Notification 1',
   sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
   data: { secret:key }
  },{
   id: 2,
   title: 'Local Notification Example',
   text: 'Multi Notification 2',
   icon: 'http://example.com/icon.png'
}]);


// Schedule delayed notification
LocalNotifications.schedule({
   text: 'Delayed Notification',
   at: new Date(new Date().getTime() + 3600),
   led: 'FF0000',
   sound: null
});*/

}
