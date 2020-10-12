/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdsDividerDirective } from './cds-divider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CdsDividerDirective],
  exports: [CdsDividerDirective],
})
export class CdsDividerModule {}
