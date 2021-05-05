"use strict";

// import "./bootstrap.min.css";

import "./popup.css";

const storage = chrome.storage.sync;

const tokenStorage = {
  set: (value, cb) => {
    storage.set({ token: value }, () => {
      cb();
    });
  },
  get: (cb) => {
    storage.get(["token"], (res) => {
      cb(res.token);
    });
  },
};

document.getElementById("saveToken").addEventListener("click", () => {
  var val = document.getElementById("token").value;
  tokenStorage.set(val, function () {
    document.getElementById("saved").innerHTML =
      "The Token is changed to " + val;
  });
});

function restoreToken() {
  tokenStorage.get((val) => {
    document.getElementById("token").value = val;
  });
}

document.addEventListener("DOMContentLoaded", restoreToken);

// console.log(tokenStorage.get());

// chrome.storage.local.get(['key'], function(result) {
//   console.log('Value currently is ' + result.key);
// });

// const tokenStorage = {
//   get: (cb) => {
//     chrome.storage.local.get(["token"], (result) => {
//       cb(result.token);
//     });
//   },
//   set: (value, cb) => {
//     chrome.storage.local.set(
//       {
//         token: value,
//       },
//       () => {
//         cb();
//       }
//     );
//   },
// };

// chrome.storage.local.set({ key: value }, function () {
//   console.log("Value is set to " + value);
// });

// function setupToken(initialValue = "hello") {
//   document.getElementById("token").value = initialValue;
//
//   document.getElementById("saveToken").addEventListener("click", () => {
//     updateToken();
//   });
// }
//
// const tokenStorage = {
//   get: (cb) => {
//     chrome.storage.local.get(["token"], (result) => {
//       cb(result.token);
//     });
//   },
//   set: (value, cb) => {
//     chrome.storage.local.set(
//       {
//         token: value,
//       },
//       () => {
//         cb();
//       }
//     );
//   },
// };
//
// document.getElementById("saveToken").addEventListener("click", () => {
//   updateToken();
// });
//
// function updateToken() {
//   tokenStorage.set(document.getElementById("token").value, () => {
//     console.log(document.getElementById("token").value);
//   });
// }
//
// function tokenCounter() {
//   // Restore count value
//   tokenStorage.get((token) => {
//     if (typeof token === "undefined") {
//       // Set counter value as 0
//       tokenStorage.set("", () => {
//         setupCounter("");
//       });
//     } else {
//       setupToken(count);
//     }
//   });
// }

// (function () {
//   // We will make use of Storage API to get and store `count` value
//   // More information on Storage API can we found at
//   // https://developer.chrome.com/extensions/storage
//
//   // To get storage access, we have to mention it in `permissions` property of manifest.json file
//   // More information on Permissions can we found at
//   // https://developer.chrome.com/extensions/declare_permissions
//   const counterStorage = {
//     get: (cb) => {
//       chrome.storage.sync.get(["count"], (result) => {
//         cb(result.count);
//       });
//     },
//     set: (value, cb) => {
//       chrome.storage.sync.set(
//         {
//           count: value,
//         },
//         () => {
//           cb();
//         }
//       );
//     },
//   };
//
//   function setupToken(initialValue = "hello") {
//     document.getElementById("token").value = initialValue;
//
//     document.getElementById("saveToken").addEventListener("click", () => {
//       // updateToken();
//     });
//   }
//
//   // function updateToken() {
//   //   tokenStorage.set()
//   // }
//
//   function setupCounter(initialValue = 0) {
//     document.getElementById("counter").innerHTML = initialValue;
//
//     document.getElementById("incrementBtn").addEventListener("click", () => {
//       updateCounter({
//         type: "INCREMENT",
//       });
//     });
//
//     document.getElementById("decrementBtn").addEventListener("click", () => {
//       updateCounter({
//         type: "DECREMENT",
//       });
//     });
//   }
//
//   function updateCounter({ type }) {
//     counterStorage.get((count) => {
//       let newCount;
//
//       if (type === "INCREMENT") {
//         newCount = count + 1;
//       } else if (type === "DECREMENT") {
//         newCount = count - 1;
//       } else {
//         newCount = count;
//       }
//
//       counterStorage.set(newCount, () => {
//         document.getElementById("counter").innerHTML = newCount;
//
//         // Communicate with content script of
//         // active tab by sending a message
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//           const tab = tabs[0];
//
//           chrome.tabs.sendMessage(
//             tab.id,
//             {
//               type: "COUNT",
//               payload: {
//                 count: newCount,
//               },
//             },
//             (response) => {
//               console.log("Current count value passed to contentScript file");
//             }
//           );
//         });
//       });
//     });
//   }
//
//   function restoreCounter() {
//     // Restore count value
//     counterStorage.get((count) => {
//       if (typeof count === "undefined") {
//         // Set counter value as 0
//         counterStorage.set(0, () => {
//           setupCounter(0);
//         });
//       } else {
//         setupCounter(count);
//       }
//     });
//   }
//
//   document.addEventListener("DOMContentLoaded", restoreCounter);
//
//   // Communicate with background file by sending a message
//   chrome.runtime.sendMessage(
//     {
//       type: "GREETINGS",
//       payload: {
//         message: "Hello, my name is Pop. I am from Popup.",
//       },
//     },
//     (response) => {
//       console.log(response.message);
//     }
//   );
// })();
