'use strict';

const fs = require('fs-extra');
const path = require('path');
const del = require('del');
const cpy = require('cpy');
const shell = require('child_process').execSync;
const Mustache = require('mustache');
const mkdirp = require('mkdirp');

const componentTemplate = fs.readFileSync(__dirname + '/stubs/component.ts.mustache', 'utf8');
const moduleTemplate = fs.readFileSync(__dirname + '/stubs/module.ts.mustache', 'utf8');
const indexTemplate = fs.readFileSync(__dirname + '/stubs/index.ts.mustache', 'utf8');
const rootIndexTemplate = fs.readFileSync(__dirname + '/stubs/root-index.ts.mustache', 'utf8');
const baseTemplate = fs.readFileSync(__dirname + '/stubs/base.ts.mustache', 'utf8');

const elements = require('../../../core/dist/core/custom-elements.json');

const base = path.join(__dirname, './src/cds');

function getModuleName(name) {
  const parts = name.split('-');
  return `${parts[0]}-${parts[1]}`;
}

function dashToUppercase(text) {
  return text
    .split('-')
    .map(part => `${part.charAt(0).toUpperCase()}${part.substring(1)}`)
    .join('');
}

const ignores = [
  'cds-test',
  'cds-internal',
  'cds-placeholder',
  'cds-card',
  'cds-demo',
  'cds-icon',
  'cds-inline-button',
  'cds-progress-circle',
  'cds-control-action',
];

function generateModules(tags) {
  const mods = [];
  tags.forEach(tag => {
    const dashName = getModuleName(tag.name);

    if (ignores.includes(dashName)) {
      return;
    }

    let mod = mods.find(mod => mod.dashName === dashName);

    if (!mod) {
      mod = {
        name: dashToUppercase(dashName),
        baseName: dashName.split('-')[1],
        dashName,
        moduleName: dashToUppercase(dashName) + 'Module',
        components: [],
      };
      mods.push(mod);
    }

    if (tag.path.indexOf('register.d.ts') < 0) {
      const component = generateComponent(tag, mod);
      mod.components.push(component);
    }
  });

  for (let index in mods) {
    const mod = mods[index];
    if (mod.components.length) {
      mkdirp.sync(`${base}/${mod.base}`);

      const modFilePath = `${base}/${mod.baseName}/${mod.baseName}.module.ts`;
      fs.writeFileSync(modFilePath, Mustache.render(moduleTemplate, mod), 'utf8');
      console.log(`Wrote ${modFilePath}`);
      const indexFilePath = `${base}/${mod.baseName}/index.ts`;
      fs.writeFileSync(indexFilePath, Mustache.render(indexTemplate, mod), 'utf8');
      console.log(`Wrote ${indexFilePath}`);
    }
  }

  fs.writeFileSync(`${base}/base.ts`, Mustache.render(baseTemplate, {}), 'utf8');
  console.log(`Wrote ${base}/base.ts`);
  fs.writeFileSync(`${base}/index.ts`, Mustache.render(rootIndexTemplate, { mods }), 'utf8');
  console.log(`Wrote ${base}/index.ts`);

  return mods;
}

const ignoreProps = ['layoutStable'];

function generateComponent(component, mod) {
  component.componentName = dashToUppercase(component.name);
  component.directiveName = `${component.componentName}Directive`;
  component.baseName = mod.baseName;
  if (component.properties) {
    component.props = component.properties.filter(prop => ignoreProps.indexOf(prop.name) === -1);
  }
  const template = Mustache.render(componentTemplate, component);
  const filePath = `${base}/${mod.baseName}/${component.name}.component.ts`;
  mkdirp.sync(`${base}/${mod.baseName}`);
  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`Wrote ${filePath}`);
  return component;
}

function cleanDist() {
  console.log(`Cleaning up build`);
  del.sync([base]);
}

cleanDist();
generateModules(elements.tags);
