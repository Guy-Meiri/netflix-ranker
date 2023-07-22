console.error("in background");
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.error("tab updated");
  if (tab.url && tab.url.includes("netflix.com/browse")) {
    console.warn("sending loaded event to content");
    chrome.tabs.sendMessage(tabId, { type: "loaded_netflix" });
  }
});
