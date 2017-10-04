import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { ImageComponent } from './image/image.component';
import * as fromApp from '../../store/app.reducers';
import * as fromUpload from '../../adminDashboard/upload/store/upload.reducers';
import * as UploadActions from '../../adminDashboard/upload/store/upload.actions';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  uploadState: Observable<fromUpload.State>;

  constructor(private store: Store<fromApp.AppState>, private dialog: MdDialog) { }

  ngOnInit() {
    this.store.dispatch(new UploadActions.LoadImages());
    this.uploadState = this.store.select('upload')
  }

  onOpenModal(image: string) {
    this.dialog.open(ImageComponent, {
      data: image
    })
  }

}
