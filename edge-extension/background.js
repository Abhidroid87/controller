// background.js
// Listens for tab updates and injects content script if on rewards.bing.com

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.startsWith("https://rewards.bing.com") && changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"]
    });
  }
});

// Listen for messages from content.js and relay to native messaging host
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "trigger_native") {
    // TODO: Replace 'com.rewards.trigger' with your actual native messaging host name if changed
    const port = chrome.runtime.connectNative("com.rewards.trigger");
    port.postMessage({ trigger: true });
    port.disconnect();
    sendResponse({ status: "sent" });
  }
});
