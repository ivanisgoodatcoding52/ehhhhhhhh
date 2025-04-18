let model;
tf.loadLayersModel('model/model.json').then(loadedModel => {
  model = loadedModel;
  console.log('Model loaded successfully!');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "detect_misinformation") {
    const text = request.text;
    const processedText = preprocessText(text);

    const tensor = textToTensor(processedText);

    const prediction = model.predict(tensor);
    const label = getLabel(prediction); 
    const score = getConfidenceScore(prediction);

    sendResponse({ label: label, score: score });
  }
});