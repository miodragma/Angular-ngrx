import { Action } from '@ngrx/store';

export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const AUTH_FAILED = 'AUTH_FAILED';

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;

  constructor(public payload: string) {}
}

export type AuthActions = Signin | Logout | SetToken | TrySignin | AuthFailed;
