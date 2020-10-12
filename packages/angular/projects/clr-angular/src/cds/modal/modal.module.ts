/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdsModalActionsDirective } from './cds-modal-actions.component';
import { CdsModalContentDirective } from './cds-modal-content.component';
import { CdsModalHeaderActionsDirective } from './cds-modal-header-actions.component';
import { CdsModalHeaderDirective } from './cds-modal-header.component';
import { CdsModalDirective } from './cds-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CdsModalActionsDirective,
    CdsModalContentDirective,
    CdsModalHeaderActionsDirective,
    CdsModalHeaderDirective,
    CdsModalDirective,
  ],
  exports: [
    CdsModalActionsDirective,
    CdsModalContentDirective,
    CdsModalHeaderActionsDirective,
    CdsModalHeaderDirective,
    CdsModalDirective,
  ],
})
export class CdsModalModule {}
