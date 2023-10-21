window.onload = function() {
  chrome.storage.local.get("enabled", (data) => {
    let isEnabled = data.enabled;
    document.getElementById("switch").checked = isEnabled;
  });

  chrome.action.setBadgeBackgroundColor({color: '#33FF66'});
  chrome.action.setBadgeTextColor({color: '#000000'});


  document.getElementById("switchLabel").title = chrome.i18n.getMessage('switch_title');
};

document.getElementById("switch").onclick = () => {
  let isEnabled = document.getElementById("switch").checked;
  
  chrome.storage.local.set({enabled: isEnabled}, () => {
    if (isEnabled) {
      chrome.action.setBadgeText({text: "ON"});
    } else {
      chrome.action.setBadgeText({text: ""});
    }
  });
  
  // UpdateRulesetOptions (Chrome 87+)
  let options = { enableRulesetIds: [], disableRulesetIds: [] };
  
  if (isEnabled) {
    options.enableRulesetIds = ["ruleset_1"];
  } else {
    options.disableRulesetIds = ["ruleset_1"];
  }
  chrome.declarativeNetRequest.updateEnabledRulesets(options);
};
