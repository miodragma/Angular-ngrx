import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  authErrorMessage: string;
}

const initialState: State = {
  token: null,
  authenticated: false,
  authErrorMessage: ''
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    case (AuthActions.AUTH_FAILED):
      return {
        ...state,
        authErrorMessage: action.payload
      };
    default:
      return state;
  }
}
