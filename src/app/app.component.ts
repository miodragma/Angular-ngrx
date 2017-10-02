import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducers';
import * as fromSidemenu from './adminDashboard/sidemenu/store/sidemenu.reducers';
import * as UploadActions from './adminDashboard/upload/store/upload.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  previewState: Observable<fromSidemenu.State>;

  constructor(private store: Store<fromApp.AppState>) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCdyEGt9Do-598Ma1dg1NVEL64hjaBgogg',
      authDomain: 'angular-gallery-6845f.firebaseapp.com',
      databaseURL: 'https://angular-gallery-6845f.firebaseio.com',
      projectId: 'angular-gallery-6845f',
      storageBucket: 'angular-gallery-6845f.appspot.com',
      messagingSenderId: '52744520740'
    })
  }

  ngOnInit() {
    this.previewState = this.store.select('sidemenu');
  }

}
