/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsCheckboxGroup } from '@clr/core/checkbox';

@Directive({ selector: 'cds-alert' })
export class CdsCheckboxGroupDirective extends BaseCdsDirective<CdsCheckboxGroup> {
  get status() {
    return this.element.status;
  }
  @Input() set status(value) {
    this.element.status = value;
  }
  get layout() {
    return this.element.layout;
  }
  @Input() set layout(value) {
    this.element.layout = value;
  }
  get controlAlign() {
    return this.element.controlAlign;
  }
  @Input() set controlAlign(value) {
    this.element.controlAlign = value;
  }
  get disabled() {
    return this.element.disabled;
  }
  @Input() set disabled(value) {
    this.element.disabled = value;
  }
  get controlWidth() {
    return this.element.controlWidth;
  }
  @Input() set controlWidth(value) {
    this.element.controlWidth = value;
  }
  get responsive() {
    return this.element.responsive;
  }
  @Input() set responsive(value) {
    this.element.responsive = value;
  }
}
