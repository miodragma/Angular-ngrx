import * as SidemenuActions from './sidemenu.actions';

export interface State {
  isPreview: boolean;
  onToggle: string;
}

const initialState: State = {
  isPreview: true,
  onToggle: '250px'
};

export function sidemenuReducer(state = initialState, action: SidemenuActions.SidemenuActions) {
  switch (action.type) {
    case (SidemenuActions.IS_PREVIEW):
      if (state.isPreview) {
        state.isPreview = false;
      } else {
        state.isPreview = true;
      }
      return {
        ...state,
        isPreview: state.isPreview
      };
    case (SidemenuActions.TOGGLE):
      if (state.onToggle === '250px') {
        state.onToggle = '0'
      } else {
        state.onToggle = '250px'
      }
      return {
        ...state,
        onToggle: state.onToggle
      };
    default:
      return state;
  }
}
