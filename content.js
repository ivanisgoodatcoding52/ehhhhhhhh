chrome.contextMenus.create({
  id: "detect-misinformation",
  title: "Detect Misinformation",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "detect-misinformation") {
    const selectedText = info.selectionText;
    chrome.runtime.sendMessage({ message: "detect_misinformation", text: selectedText },
      function(response) {
        alert("Label: " + response.label + ", Score: " + response.score);
      });
  }
});