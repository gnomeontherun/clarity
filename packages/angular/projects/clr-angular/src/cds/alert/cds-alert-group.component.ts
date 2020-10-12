/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsAlertGroup } from '@clr/core/alert';

@Directive({ selector: 'cds-alert' })
export class CdsAlertGroupDirective extends BaseCdsDirective<CdsAlertGroup> {
  get size() {
    return this.element.size;
  }
  @Input() set size(value) {
    this.element.size = value;
  }
  get type() {
    return this.element.type;
  }
  @Input() set type(value) {
    this.element.type = value;
  }
  get status() {
    return this.element.status;
  }
  @Input() set status(value) {
    this.element.status = value;
  }
}
