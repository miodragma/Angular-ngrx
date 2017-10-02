import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import { Image } from '../../model/image.model';
import * as UploadActions from './upload.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../signin/store/auth.reducers';
import * as fromUpload from '../../upload/store/upload.reducers';


@Injectable()
export class UploadEffects {
  @Effect()
  loadImages = this.actions$
    .ofType(UploadActions.LOAD_IMAGES)
    .switchMap((action: UploadActions.LoadImages) => {
      return this.http.get('https://angular-gallery-6845f.firebaseio.com/images/gallery01.json')
    })
    .map(
      (response: Response) => {
        const images = response.json();
        let lastImageKey: number;
        if (images) {
          lastImageKey = Number(Object.keys(images).pop())
        }
        function cleanArray(imagess) {
          const newArray = new Array();
          for (let i = 0; i <= lastImageKey; i++) {
            if (imagess[i]) {
              newArray.push(imagess[i]);
            }
          }
          return newArray;
        }
        return {
          type: UploadActions.SET_IMAGES,
          payload: cleanArray(images)
        }
      }
    );

  @Effect()
  makeNewKey = this.actions$
    .ofType(UploadActions.MAKE_KEY)
    .switchMap(() => {
    return this.http.get('https://angular-gallery-6845f.firebaseio.com/images/gallery01.json')
      .map((response: Response) => {
      const images = response.json();
        let keyMode = false;
        let newKey: number;
        if (images === 'undefined' || images === null) {
          newKey = 0
        } else {
          Object.keys(images).forEach((key) => {
            if (images[key] === null) {
              keyMode = true
            }
          });
          if (keyMode) {
            for (let i = 0; i <= images.length; i++) {
              if (images[i - 1] !== i && images[i] === null) {
                newKey = i;
                break;
              }
            }
          } else {
            if (images === 'undefined' || images === null) {
              newKey = 0
            } else {
              newKey = Object.keys(images).length
            }
          }
        }
        return {
          type: UploadActions.SET_KEY,
          payload: newKey
        }
      })
    });

  @Effect({dispatch: false})
  storeImage = this.actions$
    .ofType(UploadActions.STOREAGE_REF)
    .withLatestFrom(this.store.select('upload'))
    .switchMap(([action, state]) => {
    return fromPromise(firebase.storage().ref('images/' + state.imageName).put(state.data))
    })
    .switchMap((imageFile) => {
    let token: string;
    this.store.select('auth')
      .subscribe((authState: fromAuth.State) => {token = authState.token});
    let key: number;
    let name: string;
    this.store.select('upload')
      .subscribe((uploadState: fromUpload.State) => {key = uploadState.key; name = uploadState.imageName});
    console.log(key);
    return this.http.patch(
        'https://angular-gallery-6845f.firebaseio.com/images/gallery01.json?auth=' + token,
        {[key]: new Image(key, name, imageFile.downloadURL)});
    });

  @Effect({dispatch: false})
  deleteImage = this.actions$
    .ofType(UploadActions.DELETE_IMAGE)
    .map((action: UploadActions.DeleteImage) => {
      return action.payload
    })
    .switchMap((image: Image) => {
    return fromPromise(firebase.storage().ref('images/' + image.name).delete()),
      fromPromise(firebase.database().ref('images/gallery01/' + image.id).remove())
    });


  constructor(private actions$: Actions, private http: Http, private store: Store<fromApp.AppState>) {}
}
