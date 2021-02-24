const parse = require('fast-xml-parser');
const fs = require('fs');
const path = require('path');
const sitemap = fs.readFileSync(path.resolve(__dirname, '../../../dist/website/sitemap.xml'), 'utf8');

const map = parse.parse(sitemap);
const pages = map.urlset.url.map(item => item.loc.replace('https://clarity.design', ''));

setup({
  // selector: 'body',
  reporter: 'console',
});

for (let i = 0; i < pages.length; i++) {
  if (i < 3) {
    it(pages[i]);
  }
}
