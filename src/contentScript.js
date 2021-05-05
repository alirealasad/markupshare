chrome.runtime.onMessage.addListener((response) => {
  if (response === "GetHTML") {
    chrome.runtime.sendMessage(
      {
        action: "SendHTML",
        data: document.getElementsByTagName("body")[0].innerHTML.split("\n"),
      },
      (res) => {
        console.log(res);
      }
    );
  }
});
