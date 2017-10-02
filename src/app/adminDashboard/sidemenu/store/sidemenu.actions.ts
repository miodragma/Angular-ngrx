import { Action } from '@ngrx/store';

export const IS_PREVIEW = 'IS_PREVIEW';
export const TOGGLE = 'TOGGLE';

export class Toggle implements Action {
  readonly type = TOGGLE;

  constructor(public payload: string) {}
}


export class IsPreview implements Action {
  readonly type = IS_PREVIEW;
}

export type SidemenuActions = IsPreview | Toggle;
