/**
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Optional } from '@angular/core';
import { ContainerIdService } from './providers/container-id.service';
import { ControlIdService } from './providers/control-id.service';

@Component({
  selector: 'clr-control-error',
  template: ` <ng-content></ng-content> `,
  host: {
    '[class.clr-subtext]': 'true',
    '[id]': 'id',
  },
})
export class ClrControlError {
  constructor(
    @Optional() private controlIdService: ControlIdService,
    @Optional() private containerIdService: ContainerIdService
  ) {}

  get id(): string {
    if (this.containerIdService) {
      return this.containerIdService.id + '-error';
    } else if (this.controlIdService) {
      return this.controlIdService.id + '-error';
    } else {
      return null;
    }
  }
}
