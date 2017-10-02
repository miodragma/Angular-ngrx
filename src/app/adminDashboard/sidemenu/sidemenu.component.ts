import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit, OnDestroy {

  @ViewChild('sidemenuRef') sidemenuRef: ElementRef;
  @ViewChild('main') main: ElementRef;
  subscription: Subscription;
  isOpened = '';

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.sidemenuRef.nativeElement.style.width = '250px';
    this.subscription = this.store.select('sidemenu')
      .subscribe(
        data => {
          this.sidemenuRef.nativeElement.style.width = data.onToggle;
          this.main.nativeElement.style.marginLeft = data.onToggle;
        }
      );
  }

  onOpenGallery(name: string) {
    this.isOpened = name;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
