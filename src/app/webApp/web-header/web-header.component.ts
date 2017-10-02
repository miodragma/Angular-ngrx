import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../adminDashboard/signin/store/auth.reducers';
import * as SidemenuActions from '../../adminDashboard/sidemenu/store/sidemenu.actions';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css']
})
export class WebHeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>

  constructor(private store: Store<fromApp.AppState>) {

  }

    ngOnInit() {
    this.authState = this.store.select('auth')
    }

  onAdminDashboard() {
    this.store.dispatch(new SidemenuActions.IsPreview())
  }

}
