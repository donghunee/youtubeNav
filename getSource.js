chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const result = request.result;
  const params = request.params;
  location.href = `/watch?v=${params}&t=${result}s`;
  sendResponse({ farewell: "제발" });
});
