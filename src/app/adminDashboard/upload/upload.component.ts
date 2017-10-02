import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/take';
import 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Image } from '../model/image.model';
import { InfoImage } from '../model/infoImage.model';
import * as fromApp from '../../store/app.reducers';
import * as fromUpload from './store/upload.reducers';
import * as UploadActions from './store/upload.actions'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  /*files*/
  uploadState: Observable<fromUpload.State>;
  storedFileBeforeUpload: File[] = [];
  skippedImages: InfoImage[] = [];
  uploadImages: InfoImage[] = [];

  /*proccess values*/
  imagesLength: number;
  value = 0;
  bufferValue = 0;
  uploaded = 0;
  percent = 0;
  forUpload = 0;
  counter = 0;

  /*modes*/
  disabledMode = false;
  isDisabledImages = true;
  isDisableBar = true;
  isDisabledSpinner = true;
  isDisabledSkippedImage = true;

  /*File info*/
  imageName: string;
  imageSize: string;
  exportedImageSize: string;
  exportedImageName: string;
  imageSizeInfo: string;
  exportedImage: string;
  convertedImage: string;
  startImageTime: number;
  totalImageTime: string;
  calculateImageSeconds: number;
  startImagesTime: number;
  totalImagesTime: string;
  calculateImagesSeconds: number;

  constructor(
    private imgTools: Ng2ImgMaxService,
    private mdSnackBar: MdSnackBar,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new UploadActions.LoadImages());
    this.uploadState = this.store.select('upload');
  }

  pushAndTimeout(file) {
    this.storedFileBeforeUpload.push(file);
    if (this.counter < 1) {
      this.isDisabledSpinner = false;
      setTimeout(() => {
        setTimeout(() => {this.disabledMode = true; this.isDisabledSpinner = true}, 2500);
        this.snackBar(`Succeeded! ${this.storedFileBeforeUpload.length > 1 ? 'Images' : 'Image'} was uploaded.`);
      }, 10000);
      this.counter = 1
    }
  }

  onUploadFinished(event) {
    this.isDisabledImages = true;
    this.disabledMode = false;
    const file: File = event.file;
    this.store.select('upload')
      .take(1)
      .subscribe((uploadState: fromUpload.State) => {
      if (uploadState.images === []) {
        console.log('Images array is empty!');
        this.pushAndTimeout(file);
      } else {
        let isEquality = false;
        Object.keys(uploadState.images).forEach((key) => {
          if (uploadState.images[key].name === file.name) {
            console.log('This file: ' + file.name + ' is exists!!!');
            this.skippedImages.push(new InfoImage(file.name, event.src));
            isEquality = true;
          }
        });
        if (!isEquality) {
          this.pushAndTimeout(file);
          this.uploadImages.push(new InfoImage(file.name, event.src));
        }
      }
    });
  }

  imageRemoved(event) {
    this.counter = 0;
    const file: File = event.file.name;
    this.storedFileBeforeUpload.splice(this.storedFileBeforeUpload.indexOf(file), 1);
    if (this.storedFileBeforeUpload.length === 0) {
      this.disabledMode = false;
      this.isDisableBar = true;
      this.clearValues();
    }
  }

  uploader(i) {
    this.counter = 0;
    if (i <= this.storedFileBeforeUpload.length - 1) {
      this.startImageTime = new Date().getTime();
      this.exportedImage = this.uploadImages[i].src;
      this.imageName = this.storedFileBeforeUpload[i].name;
      this.imageSize = (this.storedFileBeforeUpload[i].size / 1000000).toFixed(1);
      this.imgTools.resizeImage(this.storedFileBeforeUpload[i], 1360, 768)
        .subscribe(
          (resizedImage) => {
            this.progressBuffer();
            this.imgTools.compressImage(resizedImage, 0.150)
              .subscribe(
                file => {
                  if (!file) {
                    console.log('error')
                  } else {
                    this.convertedImage = this.exportedImage;
                    const uploadedImage: File = new File([file], file.name, {type: 'image/jpeg'});
                    this.store.dispatch(new UploadActions.MakeKey());
                    this.store.dispatch(new UploadActions.SetStorageRef({setImageName: uploadedImage.name, setData: uploadedImage}));
                    this.store.dispatch(new UploadActions.StorageRef());
                    this.exportedImageName = this.imageName;
                    this.exportedImageSize = (file.size * 0.001).toFixed(0);
                    this.imageSizeInfo = this.imageSize;
                    this.calculateImageSeconds = Math.round((new Date().getTime() - this.startImageTime) / 1000);
                    this.totalImageTime = this.timeElapsed(this.calculateImageSeconds);
                    this.uploader(i + 1);
                    this.progressValue();
                    this.uploaded++;
                  }
                }
              )
          }
        )
    } else {
      this.disabledMode = false;
      this.calculateImagesSeconds = Math.round((new Date().getTime() - this.startImagesTime) / 1000);
      this.totalImagesTime = this.timeElapsed(this.calculateImagesSeconds);
      this.store.dispatch(new UploadActions.LoadImages());
      this.isDisabledSkippedImage = false;
      console.log('DONE')
    }
  }

  timeElapsed(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }
  onStoreFiles() {
    this.startImagesTime = new Date().getTime();
    this.forUpload = this.storedFileBeforeUpload.length;
    this.disabledMode = false;
    this.isDisableBar = false;
    this.imagesLength = 100 / this.storedFileBeforeUpload.length;
    this.bufferValue = 5;
    this.uploader(0)
  }

  progressBuffer() {
    for (let i = 0; i <= Math.round(this.imagesLength); i++) {
      this.bufferValue++;
      if ((this.bufferValue === Math.round(this.imagesLength) * this.storedFileBeforeUpload.length) && this.bufferValue !== 100) {
        this.bufferValue = 100;
      }
    }
  }

  progressValue() {
    for (let i = 1; i <= Math.round(this.imagesLength); i++) {
      this.value++;
      this.percent = this.value;
      if ((this.value === Math.round(this.imagesLength) * this.storedFileBeforeUpload.length) && this.value !== 100) {
        this.value = 100;
        this.percent = 100;
      }
    }
  }

  onClickDelete(image: Image, index: number) {
    this.store.dispatch(new UploadActions.DeleteImage(image));
    this.store.dispatch(new UploadActions.DeletedImage(index));
  }

  snackBar(imageName: string) {
    this.mdSnackBar.open(imageName, '' , {
      duration: 2000
    })
  }

  onLoadImages(isdisabled) {
    this.isDisableBar = true;
    if (isdisabled) {
      this.store.dispatch(new UploadActions.LoadImages());
      this.isDisabledImages = false;
    } else {
      this.isDisabledImages = true;
    }
  }

  onResetCounter() {
    this.clearValues();
    this.storedFileBeforeUpload = [];
  }

  clearValues() {
    this.skippedImages = [];
    this.uploadImages = [];
    this.imagesLength = -1;
    this.value = 0;
    this.bufferValue = 0;
    this.uploaded = 0;
    this.percent = 0;
    this.forUpload = 0;
    this.counter = 0;
    this.imageName = '';
    this.imageSize = '';
    this.exportedImageSize = '';
    this.exportedImageName = '';
    this.imageSizeInfo = '';
    this.exportedImage = '';
    this.convertedImage = '';
    this.totalImageTime = '';
    this.totalImagesTime = '';
    this.isDisableBar = true;
  }

}
