import {
  Component,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActiveFragmentService } from './utils/active-fragment.service';
import { Router, NavigationEnd } from '@angular/router';
import { EssentialShapes } from '@clr/icons/shapes/essential-shapes';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { IconsViewService } from './icons-view.service';
import { filter } from 'rxjs/operators';

let essentialShapesNames = Object.keys(EssentialShapes);
let blinkEssentialShapes = essentialShapesNames;

export const COMMON_PATH = 'assets/icons/';

@Component({
  selector: 'icons',
  templateUrl: 'icons.component.html',
  styleUrls: ['icons.component.scss'],
  providers: [ActiveFragmentService, IconsViewService],
  animations: [
    trigger('searchBarStickAnimation', [
      state(
        'void',
        style({
          backgroundColor: '#fafafa',
          boxShadow: '0 0 3px 0 rgba(0,0,0,0)',
        })
      ),
      state(
        '*',
        style({
          backgroundColor: '#fff',
          boxShadow: '0 0 3px 0 rgba(0,0,0,0.3)',
        })
      ),
      transition('void => *', animate('300ms ease-in')),
    ]),
  ],
})
export class IconsComponent implements AfterViewInit, OnDestroy {
  allSetsLink = COMMON_PATH + 'all-shapes.zip';

  // Check whether the current route is on ./icons/icon-sets
  isOnIconSetsRoute = false;

  // Scroll this much distance to make the searchbar sticky.
  thresholdOffsetTop = 240;

  isSidenavSticky = false;

  // Blinking icons in the header background
  blinkIconsFromEssentialSet: string[] = blinkEssentialShapes.filter(shape => {
    let hideIcons: string[] = [];

    return hideIcons.indexOf(shape) === -1;
  });

  // Will contain two numbers that are randomly generated every 3000ms.
  blinkIconsRandomly: number[] = [];

  private _scrollEvent: any;

  private _subscriptions: Subscription[] = [];
  private interval: any;

  constructor(
    private _el: ElementRef,
    private _router: Router,
    private _iconsViewService: IconsViewService,
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._subscriptions.push(
      this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
        this.isOnIconSetsRoute = _router.isActive('/icons', false);

        // reset search input value when route changes to another pages
        if (!this.isOnIconSetsRoute) this.resetSearchBar();
      })
    );

    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => {
        this.blinkIconsRandomly = [
          Math.floor(Math.random() * this.blinkIconsFromEssentialSet.length),
          Math.floor(Math.random() * this.blinkIconsFromEssentialSet.length),
        ];
      }, 3000);
    }
  }

  private _isSearchbarSticky = false;

  get isSearchbarSticky(): boolean {
    return this._isSearchbarSticky;
  }

  searchValue: string = '';

  resetSearchBar() {
    this.searchValue = '';
    this._iconsViewService.searchValue.next(this.searchValue);
  }

  getSearchValue($event: any) {
    this._iconsViewService.searchValue.next($event.target.value);
    // this.searchValue = $event.target.value;
  }

  set isSearchbarSticky(value: boolean) {
    // Every time the searchbar changes its state of stickiness, it loses its previous focus state so we save
    // the focus state before searchbar changes its state of stickiness so that if the input was focused,
    // we set focus to the search input.

    this._isSearchbarSticky = value;

    setTimeout(() => {
      // search input exists only on icons-set route
      if (this.isOnIconSetsRoute && this.searchValue.length > 0) {
        this._el.nativeElement.querySelector('#search-icons-sticky').focus();
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._scrollEvent = this._renderer.listen(window, 'scroll', () => {
        this.isSidenavSticky = !this.hasResponsivenessTriggered() && this.hasPastThreshold() && this.isOnIconSetsRoute;

        if (this.isSearchbarSticky !== this.hasPastThreshold()) {
          this.isSearchbarSticky = this.hasPastThreshold();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this._scrollEvent) {
      this._scrollEvent();
    }
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  hasResponsivenessTriggered() {
    return document.body.getBoundingClientRect().width < 768;
  }

  hasPastThreshold() {
    return window.pageYOffset >= this.thresholdOffsetTop;
  }

  previewClasses: any = {
    'is-solid': false,
    'has-alert': false,
    'has-badge': false,
  };

  private _iconDecoration: any;

  get iconDecoration(): any {
    return this._iconDecoration;
  }

  set iconDecoration(value: any) {
    this._iconDecoration = value;

    if (this._iconDecoration === 'alert') {
      this.previewClasses['has-badge'] = false;
      this.previewClasses['has-alert'] = true;
    } else if (this._iconDecoration === 'badge') {
      this.previewClasses['has-alert'] = false;
      this.previewClasses['has-badge'] = true;
    } else {
      this.previewClasses['has-alert'] = false;
      this.previewClasses['has-badge'] = false;
    }

    this._iconsViewService.previewClasses.next(this.previewClasses);
  }

  private _iconSolidness: boolean = false;

  get iconSolidness(): boolean {
    return this._iconSolidness;
  }

  set iconSolidness(value: boolean) {
    this._iconSolidness = value;
    this.previewClasses['is-solid'] = this._iconSolidness;
    this._iconsViewService.previewClasses.next(this.previewClasses);
  }
}
