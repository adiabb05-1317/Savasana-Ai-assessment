// background.ts

function sendMessageToContentScript(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(response);
      }
    });
  });
}

function findChatGptTab(callback) {
  const chatGptBaseUrl = "https://chat.openai.com";
  chrome.tabs.query({}, (tabs) => {
    const chatGptTab = tabs.find(tab => tab.url && new URL(tab.url).origin === chatGptBaseUrl);
    callback(chatGptTab);
  });
}

function ensureChatGptTab(message, sendResponse) {
  findChatGptTab((foundTab) => {
    if (foundTab) {
      chrome.tabs.update(foundTab.id, { active: true }, () => {
        sendMessageToContentScript(foundTab.id, message).then(response => {
          sendResponse({ status: "Success", response });
        }).catch(error => {
          sendResponse({ status: "Failure", error: error.message });
        });
      });
    } else {
      chrome.tabs.create({ url: "https://chat.openai.com" }, (newTab) => {
        chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo) {
          if (tabId === newTab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(onUpdated);
            sendMessageToContentScript(newTab.id, message).then(response => {
              sendResponse({ status: "Success", response });
            }).catch(error => {
              sendResponse({ status: "Failure", error: error.message });
            });
          }
        });
      });
    }
  });
  // Must return true when the response will be sent asynchronously
  return true;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "sendToGpt") {
    const message = {
      action: "sendToGpt",
      text: request.text + " please give me one correct option or answer out of these please only one"
    };
    return ensureChatGptTab(message, sendResponse);
  } else if (request.type === "extract") {
    // Assuming you have a content script that handles 'extractText' action and returns the selected text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        sendResponse({ error: "No active tabs found." });
        return true; // Return true to keep the messaging channel open for the response
      }
      const activeTab = tabs[0];
      sendMessageToContentScript(activeTab.id, { action: "extractText" })
        .then((response) => {
          sendResponse({ extractedText: response.text });
        })
        .catch((error) => {
          console.error("Error:", error);
          sendResponse({ error: error.message });
        });
    });
    return true; // Return true to keep the messaging channel open for the response
  }
  return true; // Handle other types of messages...
});
