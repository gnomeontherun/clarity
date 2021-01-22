/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

let counter = 0;

@Injectable()
export class ContainerIdService {
  private _id = 'clr-form-container-' + ++counter;
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
    this._idChange.next(value);
  }

  private _idChange: BehaviorSubject<string> = new BehaviorSubject(this._id);
  public get idChange(): Observable<string> {
    return this._idChange.asObservable();
  }
}
