/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsControlMessage } from '@clr/core/control';

@Directive({ selector: 'cds-alert' })
export class CdsControlMessageDirective extends BaseCdsDirective<CdsControlMessage> {
  get status() {
    return this.element.status;
  }
  @Input() set status(value) {
    this.element.status = value;
  }
  get error() {
    return this.element.error;
  }
  @Input() set error(value) {
    this.element.error = value;
  }
}
