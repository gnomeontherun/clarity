/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsModal } from '@clr/core/modal';

@Directive({ selector: 'cds-alert' })
export class CdsModalDirective extends BaseCdsDirective<CdsModal> {
  get closable() {
    return this.element.closable;
  }
  @Input() set closable(value) {
    this.element.closable = value;
  }
  get size() {
    return this.element.size;
  }
  @Input() set size(value) {
    this.element.size = value;
  }
  get hidden() {
    return this.element.hidden;
  }
  @Input() set hidden(value) {
    this.element.hidden = value;
  }
}
