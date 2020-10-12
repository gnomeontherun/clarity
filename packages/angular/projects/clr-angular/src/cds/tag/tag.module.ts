/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdsTagDirective } from './cds-tag.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CdsTagDirective],
  exports: [CdsTagDirective],
})
export class CdsTagModule {}
