/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdsFormGroupDirective } from './cds-form-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CdsFormGroupDirective],
  exports: [CdsFormGroupDirective],
})
export class CdsFormModule {}
