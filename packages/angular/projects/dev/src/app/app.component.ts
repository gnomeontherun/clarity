/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';

import '@clr/core/icon/register.js';
import {
  angleDoubleIcon,
  angleIcon,
  bellIcon,
  boltIcon,
  bugIcon,
  certificateIcon,
  checkCircleIcon,
  checkIcon,
  ClarityIcons,
  cloudIcon,
  cogIcon,
  dotCircleIcon,
  ellipsisHorizontalIcon,
  ellipsisVerticalIcon,
  errorStandardIcon,
  eventIcon,
  exclamationCircleIcon,
  exclamationTriangleIcon,
  filterGridCircleIcon,
  filterGridIcon,
  flameIcon,
  folderIcon,
  happyFaceIcon,
  helpInfoIcon,
  homeIcon,
  hourglassIcon,
  imageIcon,
  infoCircleIcon,
  lightbulbIcon,
  musicNoteIcon,
  pencilIcon,
  searchIcon,
  stepForward2Icon,
  successStandardIcon,
  thermometerIcon,
  timesIcon,
  userIcon,
  viewColumnsIcon,
  vmBugIcon,
  windowCloseIcon,
} from '@clr/core/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public routes: Route[] = APP_ROUTES;

  constructor() {
    ClarityIcons.addIcons(
      // Used by @clr/angular
      vmBugIcon,
      cogIcon,
      angleIcon, // caret
      exclamationCircleIcon,
      checkCircleIcon,
      ellipsisHorizontalIcon,
      ellipsisVerticalIcon,
      viewColumnsIcon,
      windowCloseIcon, // close
      // datagrid sort arrow here
      timesIcon,
      filterGridCircleIcon,
      filterGridIcon,
      stepForward2Icon,
      angleDoubleIcon,
      stepForward2Icon,
      // alert icon shapes?
      exclamationTriangleIcon,
      eventIcon,
      infoCircleIcon,
      homeIcon,
      // signpost info icon?
      dotCircleIcon,
      successStandardIcon,
      errorStandardIcon,

      // Demos Only
      helpInfoIcon,
      bellIcon,
      cloudIcon,
      userIcon,
      searchIcon,
      imageIcon,
      checkIcon,
      folderIcon,
      homeIcon,
      certificateIcon,
      musicNoteIcon,
      bugIcon,
      boltIcon,
      pencilIcon,
      hourglassIcon,
      happyFaceIcon,
      flameIcon,
      thermometerIcon,
      lightbulbIcon
    );
  }
}
