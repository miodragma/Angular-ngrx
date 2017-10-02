import { Action } from '@ngrx/store';
import { Image } from '../../model/image.model';

export const LOAD_IMAGES = 'LOAD_IMAGES';
export const SET_IMAGES = 'SET_IMAGES';
export const MAKE_KEY = 'MAKE_KEY';
export const SET_KEY = 'SET_KEY';
export const SET_STORAGE_REF = 'SET_STORAGE_REF';
export const STOREAGE_REF = 'STOREAGE_REF';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const DELETED_IMAGE = 'DELETED_IMAGE';

export class LoadImages implements Action {
  readonly type = LOAD_IMAGES;
}

export class SetImages implements Action {
  readonly type = SET_IMAGES;

  constructor(public payload: Image[]) {}
}

export class MakeKey implements Action {
  readonly type = MAKE_KEY;
}

export class SetKey implements Action {
  readonly type = SET_KEY;

  constructor(public payload: number) {}
}

export class SetStorageRef implements Action {
  readonly type = SET_STORAGE_REF;

  constructor(public payload: {setImageName: string, setData: File}) {}
}

export class StorageRef implements Action {
  readonly type = STOREAGE_REF;
}

export class DeleteImage implements Action {
  readonly type = DELETE_IMAGE;

  constructor(public payload: Image) {}
}

export class DeletedImage implements Action {
  readonly type = DELETED_IMAGE;

  constructor(public payload: number) {}
}
export type UploadActions =
  LoadImages |
  SetImages |
  MakeKey |
  SetKey |
  SetStorageRef |
  StorageRef |
  DeleteImage |
  DeletedImage;
