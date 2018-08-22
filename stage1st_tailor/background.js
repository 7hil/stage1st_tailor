'use strict';

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.loc) {
      console.log("loc: " + msg.loc + " " + sender.tab.id);
    }
    if (msg.action && msg.action == "update_hist") {
    }
});
