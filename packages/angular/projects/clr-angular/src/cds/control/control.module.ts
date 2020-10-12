/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdsControlActionDirective } from './cds-control-action.component';
import { CdsControlMessageDirective } from './cds-control-message.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CdsControlActionDirective, CdsControlMessageDirective],
  exports: [CdsControlActionDirective, CdsControlMessageDirective],
})
export class CdsControlModule {}
