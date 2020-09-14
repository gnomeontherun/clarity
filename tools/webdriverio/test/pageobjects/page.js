export default class Page {
  open(path) {
    browser.url(path);
  }
  snapshot() {
    browser.saveScreenshot('./screen.png');
  }
}
