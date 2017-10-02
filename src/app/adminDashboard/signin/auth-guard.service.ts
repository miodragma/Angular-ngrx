import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
        if (!authState.authenticated) {
          this.router.navigate(['/'])
        }
        return authState.authenticated;
      })
  }

}
