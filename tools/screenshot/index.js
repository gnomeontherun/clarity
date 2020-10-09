const puppeteer = require('puppeteer');
const config = require('./config');
const path = require('path');
const mkdirp = require('mkdirp');
const del = require('del');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const minimatch = require('minimatch');
const sharp = require('sharp');

const argv = require('minimist')(process.argv.slice(2), {
  default: {
    type: 'dev',
    root: '../../',
    out: './dist/references',
    report: './reports/screenshot',
    href: 'http://localhost:4200/',
    ref: './references',
    compare: false,
    filter: false,
    threshold: 0.05,
  },
});

const refPath = path.join(__dirname, argv.root, argv.ref, argv.type);
const outPath = path.join(__dirname, argv.root, argv.out, argv.type);
const reportPath = path.join(__dirname, argv.root, argv.report, argv.type);

const changes = [];
const errors = [];
let browser;
let tries = 0;
const defaultViewport = {
  width: 1240,
  height: 1600,
};

function compare(name, file) {
  const ref = PNG.sync.read(fs.readFileSync(path.join(refPath, file)));
  const out = PNG.sync.read(fs.readFileSync(path.join(outPath, file)));
  const { width, height } = ref;
  const diff = new PNG({ width, height });

  const size = pixelmatch(ref.data, out.data, diff.data, width, height, {
    threshold: argv.threshold,
  });

  if (size) {
    console.error(`${name} contains changes!`);
    mkdirp.sync(reportPath);
    fs.writeFileSync(path.join(reportPath, file), PNG.sync.write(diff));
    changes.push({ name, size });
  } else {
    console.log(`${name} has no changes!`);
  }
}

function getUrl(item) {
  if (typeof item === 'object') {
    return item.url;
  } else {
    return item;
  }
}

async function delay(item) {
  let timeout = 0;
  if (item.delay) {
    timeout = item.delay;
  }

  return new Promise(resolve => setTimeout(resolve, timeout));
}

async function processOverlays(test, outFile) {
  if (typeof test === 'object' && test.overlays && test.overlays.length) {
    const overlays = [];

    for (let overlay of test.overlays) {
      overlays.push({
        input: {
          create: {
            width: overlay.width,
            height: overlay.height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 1 },
          },
        },
        top: overlay.y,
        left: overlay.x,
      });

      const data = await sharp(path.resolve(outFile)).composite(overlays).toBuffer();

      fs.writeFileSync(outFile, data);
    }
  }
}

async function clean() {
  del([`${outPath}/**`, `${reportPath}/**`], { force: true });
}

async function launch() {
  return puppeteer.launch({
    defaultViewport,
  });
}

async function capture(test) {
  const page = await browser.newPage();
  const url = getUrl(test);
  const file = `${url.replace(/\//g, '-')}.png`;

  if (test.viewport) {
    await page.setViewport(test.viewport);
  }

  try {
    console.log(`Capturing page ${url}`);
    const outFile = path.join(outPath, file);
    await page.goto(`${argv.href}${url}`);
    await delay(test);
    await page.screenshot({ path: outFile });
    await page.setViewport(defaultViewport);

    await processOverlays(test, outFile);

    if (argv.compare === true) {
      compare(url, file);
    }
  } catch (e) {
    if (tries < 2) {
      console.log('Restarting browser to try and fix timeouts');
      await browser.close();
      browser = await launch();
      tries++;
      await capture(test);
    } else {
      console.error(`Error capturing ${url}: ${e}`);
      process.exitCode = 1;
      errors.push({ url, e });
    }
  }
}

async function run() {
  const tests = config[argv.type];

  console.log(`Testing ${argv.href}, capturing ${tests.length}, and storing in ${outPath}`);

  for (const test of tests) {
    if (!argv.filter || (argv.filter && minimatch(getUrl(test), argv.filter))) {
      await capture(test);
    }
  }

  if (changes.length) {
    console.log('Summary of changed diffs');
    console.table(changes);
  } else if (argv.compare) {
    console.log('No changes detected in whole project!');
  }

  if (errors.length) {
    console.log('Some tests had errors');
    console.table(errors);
  }
}

// Run the script
(async () => {
  // Launch the browser
  browser = await launch();
  // Clean the reports
  await clean();
  // Make output directory
  await mkdirp(outPath);
  // Run tests
  await run();
  // Close browser
  await browser.close();
})();
