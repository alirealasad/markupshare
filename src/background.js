import axios from "axios";

function GetHTML(info, tab) {
  chrome.tabs.sendMessage(tab.id, "GetHTML");
}

const API_URL = "https://markupshare.herokuapp.com/token/";

var TOKEN = "";

chrome.storage.sync.get(["token"], function (result) {
  TOKEN = result.token;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.token) {
    TOKEN = changes.token.newValue;
  }
});

async function sendData(msg) {
  const response = await axios.post(API_URL + TOKEN, {
    data: msg,
  });
  return response;
}

chrome.contextMenus.create({
  id: "send-markup",
  title: "Send Markup",
  onclick: GetHTML,
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "SendHTML") {
    sendData(msg.data)
      .then((res) => {
        sendResponse({ msg: "Received the links" });
      })
      .catch((err) => {
        sendResponse({ msg: err.message });
      });
  }
  return true;
});

chrome.commands.onCommand.addListener(function (command, tab) {
  GetHTML(command, tab);
});
