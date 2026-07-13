import { browser } from 'wxt/browser';
// open the side panel when the user clicks the browser extension icon
export default defineBackground(() => {
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => { console.error(error); });
});
