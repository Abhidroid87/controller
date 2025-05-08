// Scrapes the visible total search progress and triggers native messaging if needed
(function() {
  function getProgress() {
    // Adjust selector if Microsoft changes Rewards page layout
    const progressElem = document.querySelector('[class*="progressBarText"]');
    if (!progressElem) return null;
    const match = progressElem.textContent.match(/(\d+)\s*\/\s*(\d+)/);
    if (!match) return null;
    return { current: parseInt(match[1], 10), total: parseInt(match[2], 10) };
  }

  const progress = getProgress();
  if (!progress) return;
  if (progress.current >= progress.total) {
    // Already maxed out, do nothing
    return;
  }
  // Send message to background to trigger native messaging
  chrome.runtime.sendMessage({ type: "trigger_native" });
})();