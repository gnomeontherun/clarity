/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdsRadioGroupDirective } from './cds-radio-group.component';
import { CdsRadioDirective } from './cds-radio.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CdsRadioGroupDirective, CdsRadioDirective],
  exports: [CdsRadioGroupDirective, CdsRadioDirective],
})
export class CdsRadioModule {}
