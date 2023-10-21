chrome.runtime.onInstalled.addListener(() => {
  // ローカルストレージに"enabled"キーがなければ、falseを設定する
  chrome.storage.local.get("enabled", (result) => {
    if (result.enabled === undefined) {
      chrome.storage.local.set({ enabled: false });
    }
  });
});

chrome.runtime.onStartup.addListener(() => {
  // ローカルストレージから"enabled"キーの値を取得する
  chrome.storage.local.get("enabled", (result) => {
    // trueであれば、バッジに"ON"と表示する
    if (result.enabled) {
      chrome.action.setBadgeText({ text: "ON" });
    }
  });
});
