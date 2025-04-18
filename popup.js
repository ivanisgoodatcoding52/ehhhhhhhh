const labelElement = document.getElementById('label');
const scoreElement = document.getElementById('score');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "misinformation_results") {
    labelElement.textContent = request.label;
    scoreElement.textContent = request.score.toFixed(2);
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: getSelectedText
  },
  function(results) {
    if (results && results[0] && results[0].result) {
      const selectedText = results[0].result;
      chrome.runtime.sendMessage({ message: "detect_misinformation", text: selectedText },
        function(response) {
          if (response) {
            labelElement.textContent = response.label;
            scoreElement.textContent = response.score.toFixed(2);
          } else {
            labelElement.textContent = "Error: No response from background script.";
            scoreElement.textContent = "";
          }
        });
    } else {
      labelElement.textContent = "No text selected.";
      scoreElement.textContent = "";
    }
  });
});

function getSelectedText() {
  return window.getSelection().toString();
}