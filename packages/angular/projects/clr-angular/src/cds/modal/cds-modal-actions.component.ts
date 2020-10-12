/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, Input } from '@angular/core';
import { BaseCdsDirective } from '../base';
import { CdsModalActions } from '@clr/core/modal';

@Directive({ selector: 'cds-alert' })
export class CdsModalActionsDirective extends BaseCdsDirective<CdsModalActions> {}
