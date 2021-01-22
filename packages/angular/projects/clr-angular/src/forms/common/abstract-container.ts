/**
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ContentChild, Directive, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

import { NgControlService } from './providers/ng-control.service';
import { LayoutService } from './providers/layout.service';
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { ClrLabel } from './label';
import { ControlClassService } from './providers/control-class.service';
import { Subscription } from 'rxjs';
import { IfControlStateService, CONTROL_STATE } from './if-control-state/if-control-state.service';
import { ClrControlSuccess } from './success';
import { ClrControlError } from './error';
import { ClrControlHelper } from './helper';

@Directive()
export abstract class ClrAbstractContainer implements DynamicWrapper, OnDestroy {
  protected subscriptions: Subscription[] = [];
  _dynamic = false;
  @ContentChild(ClrLabel, { static: false })
  label: ClrLabel;
  control: NgControl;
  private state: CONTROL_STATE;

  /**
   * Search for `ClrSuccessComponent` to know do we want to display clr-success or not
   */
  @ContentChild(ClrControlSuccess) controlSuccessComponent: ClrControlSuccess;
  @ContentChild(ClrControlError) controlErrorComponent: ClrControlError;
  @ContentChild(ClrControlHelper) controlHelperComponent: ClrControlHelper;

  get showHelper(): boolean {
    // The helper text should basically show if it is available, unless the state is INVALID or VALID with a corresponding error or success component to display
    return (
      (!!this.controlHelperComponent && // If there is no helper component, then don't show helper
        (this.state === CONTROL_STATE.NONE || // Now we know there is a helper component, show it if the state is NONE
          (this.state === CONTROL_STATE.INVALID && !this.showInvalid))) || // Or if the state is INVALID but there is no error helper
      (this.state === CONTROL_STATE.VALID && !this.controlSuccessComponent)
    ); // Or show it if the state is VALID but we don't have success helper
  }

  get showValid(): boolean {
    return this.state === CONTROL_STATE.VALID && !!this.controlSuccessComponent;
  }

  get showInvalid(): boolean {
    return this.state === CONTROL_STATE.INVALID && !!this.controlErrorComponent;
  }

  constructor(
    protected ifControlStateService: IfControlStateService,
    @Optional() protected layoutService: LayoutService,
    protected controlClassService: ControlClassService,
    protected ngControlService: NgControlService
  ) {
    this.subscriptions.push(
      this.ifControlStateService.statusChanges.subscribe((state: CONTROL_STATE) => {
        this.state = state;
        this.ngControlService.setHelpers({
          show: this.showInvalid || this.showHelper || this.showValid,
          showInvalid: this.showInvalid,
          showHelper: this.showHelper,
          showValid: this.showValid,
        });
      })
    );

    this.subscriptions.push(
      this.ngControlService.controlChanges.subscribe(control => {
        this.control = control;
      })
    );
  }

  controlClass() {
    /**
     * Decide what subtext to display:
     *   - element is valid but no success component is implemented - show helper
     *   - element is valid and success component is implemented - show success
     */
    if (!this.controlSuccessComponent && this.state === CONTROL_STATE.VALID) {
      return this.controlClassService.controlClass(CONTROL_STATE.NONE, this.addGrid());
    }
    /**
     * Pass form control state and return string of classes to be applyed to the container.
     */
    return this.controlClassService.controlClass(this.state, this.addGrid());
  }

  addGrid() {
    return this.layoutService && !this.layoutService.isVertical();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
