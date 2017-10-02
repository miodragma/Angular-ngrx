import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import * as SidemenuActions from '../../sidemenu/store/sidemenu.actions';
import * as fromApp from '../../../store/app.reducers';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      return action.payload
    })
    .switchMap((authData: {username: string, password: string}) => {
      return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
        .switchMap(() => {
          return fromPromise(firebase.auth().currentUser.getIdToken())
        })
        .mergeMap((token: string) => {
          this.router.navigate(['adminDashboard']);
          return [
            {
              type: AuthActions.AUTH_FAILED,
              payload: ''
            },
            {
              type: SidemenuActions.IS_PREVIEW
            },
            {
              type: AuthActions.SIGNIN
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ]
        })
        .catch((error) => {
          return [
            {
              type: AuthActions.AUTH_FAILED,
              payload: error.message
            }
          ]
        });
    });

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.store.dispatch(new SidemenuActions.IsPreview());
      this.router.navigate(['/'])
    });

  constructor(private actions$: Actions, private router: Router, private store: Store<fromApp.AppState>) {}
}
