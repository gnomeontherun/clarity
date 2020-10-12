/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsFormGroup } from '@clr/core/form';

@Directive({ selector: 'cds-alert' })
export class CdsFormGroupDirective extends BaseCdsDirective<CdsFormGroup> {
  get layout() {
    return this.element.layout;
  }
  @Input() set layout(value) {
    this.element.layout = value;
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
  get validate() {
    return this.element.validate;
  }
  @Input() set validate(value) {
    this.element.validate = value;
  }
}
