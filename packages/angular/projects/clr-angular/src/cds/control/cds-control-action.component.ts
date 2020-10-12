/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsControlAction } from '@clr/core/control';

@Directive({ selector: 'cds-alert' })
export class CdsControlActionDirective extends BaseCdsDirective<CdsControlAction> {
  get action() {
    return this.element.action;
  }
  @Input() set action(value) {
    this.element.action = value;
  }
  get readonly() {
    return this.element.readonly;
  }
  @Input() set readonly(value) {
    this.element.readonly = value;
  }
  get type() {
    return this.element.type;
  }
  @Input() set type(value) {
    this.element.type = value;
  }
  get name() {
    return this.element.name;
  }
  @Input() set name(value) {
    this.element.name = value;
  }
  get value() {
    return this.element.value;
  }
  @Input() set value(value) {
    this.element.value = value;
  }
  get disabled() {
    return this.element.disabled;
  }
  @Input() set disabled(value) {
    this.element.disabled = value;
  }
}
