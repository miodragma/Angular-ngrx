import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../signin/store/auth.reducers';
import * as SidemenuActions from '../sidemenu/store/sidemenu.actions';
import * as AuthActions from '../signin/store/auth.actions';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>

  constructor(
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store<fromApp.AppState>
    ) {
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'))
  }

  ngOnInit() {
    this.authState = this.store.select('auth')
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  onToggle() {
    this.store.dispatch(new SidemenuActions.Toggle('0'));
  }

  onClickPreview() {
    this.store.dispatch(new SidemenuActions.IsPreview())
  }

}
