/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

if (!process.env.APPLITOOLS_BATCH_ID) {
  process.env.APPLITOOLS_BATCH_ID = `localhost-${Date.now()}`;
}
if (!process.env.CLARITY_THEME) {
  process.env.CLARITY_THEME = 'light';
}

export function checkEyes(testName, selector = '.content-area') {
  cy.eyesCheckWindow({
    tag: testName,
    sizeMode: 'selector',
    selector: selector,
  });
}

export function setup(testName) {
  cy.eyesOpen({
    appName: 'Clarity',
    testName: `${testName} - ${process.env.CLARITY_THEME}`,
    batchId: process.env.APPLITOOLS_BATCH_ID,
    batchName: process.env.APPLITOOLS_BATCH_ID,
  });
}
