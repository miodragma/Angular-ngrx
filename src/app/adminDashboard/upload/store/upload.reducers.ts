import { Image } from '../../model/image.model';
import * as UploadActions from './upload.actions';

export interface State {
  images: Image[];
  key: number;
  imageName: string;
  data: File;
}

const initialState: State = {
  images: [],
  key: null,
  imageName: '',
  data: null,
};

export function uploadReducer(state = initialState, action: UploadActions.UploadActions) {
  switch (action.type) {
    case (UploadActions.SET_IMAGES):
      return {
        ...state,
        images: [...action.payload]
      };
    case (UploadActions.SET_KEY):
      return {
        ...state,
        key: action.payload
      };
    case (UploadActions.SET_STORAGE_REF):
      return {
        ...state,
        imageName: action.payload.setImageName,
        data: action.payload.setData
      };
    case (UploadActions.DELETED_IMAGE):
      const oldImages = [...state.images];
      oldImages.splice(action.payload, 1);
      return {
        ...state,
        images: oldImages
      };
    default:
      return state;
  }
}
