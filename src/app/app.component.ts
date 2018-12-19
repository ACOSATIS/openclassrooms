import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monblog';

  constructor() {
    var config = {
      apiKey: "AIzaSyCW3e-ZmrsI-cgENIuVCTSYdCy2SIenkV8",
      authDomain: "monblog-3c4aa.firebaseapp.com",
      databaseURL: "https://monblog-3c4aa.firebaseio.com",
      projectId: "monblog-3c4aa",
      storageBucket: "monblog-3c4aa.appspot.com",
      messagingSenderId: "716407364360"
    };

    firebase.initializeApp(config);
  }
}
