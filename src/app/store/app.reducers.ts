import { ActionReducerMap } from '@ngrx/store';

import * as fromSidemenu from '../adminDashboard/sidemenu/store/sidemenu.reducers';
import * as fromAuth from '../adminDashboard/signin/store/auth.reducers';
import * as fromUpload from '../adminDashboard/upload/store/upload.reducers';

export interface AppState {
  sidemenu: fromSidemenu.State,
  auth: fromAuth.State,
  upload: fromUpload.State
}

export const reducers: ActionReducerMap<AppState> = {
  sidemenu: fromSidemenu.sidemenuReducer,
  auth: fromAuth.authReducer,
  upload: fromUpload.uploadReducer
};
