/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // This is a simple plugin to capture env variables from the system, since a
  // plugin is the only way to access the NodeJS runtime.

  // Detect if there is a theme to use or fallback
  config.env.CLARITY_THEME = process.env.CLARITY_THEME || 'light';

  // If we don't have a BATCH ID already, try to build one from Travis then fallback.
  if (!config.env.APPLITOOLS_BATCH_ID) {
    if (process.env.TRAVIS_PULL_REQUEST_SHA) {
      config.env.APPLITOOLS_BATCH_ID = `${process.env.TRAVIS_PULL_REQUEST_SHA}:=${process.env.TRAVIS_COMMIT}`;
    } else {
      config.env.APPLITOOLS_BATCH_ID = `localhost-${config.env.CLARITY_THEME}-${Date.now()}`;
    }
  }

  return config;
};
require('@applitools/eyes-cypress')(module);
