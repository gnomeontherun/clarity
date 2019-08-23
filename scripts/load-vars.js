#!/usr/bin/env node

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

// Only run on CI
if (!process.env.TRAVIS) {
  process.exit(0);
}

const superagent = require('superagent');
const fs = require('fs');
const path = require('path');

superagent.get('https://us-central1-clarity-design-system.cloudfunctions.net/applitools').then((error, response) => {
  if (error) {
    console.log('Could not load vars!');
    console.error(error);
    process.exit(1);
  } else {
    fs.writeFileSync(path.join(__dirname, '.env'), response.body, { encoding: 'utf8' });
    console.log('Vars loaded');
    console.log(response.body);
    process.exit(0);
  }
});
