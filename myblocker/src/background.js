// ストレージからルール情報を取得し更新する関数
const updateRules = async () => {
  let { urls } = await chrome.storage.local.get('urls');
  urls = urls || [];

  // 現在のルールをすべて取得
  const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
  const ruleIds = currentRules.map(rule => rule.id);
  
  // 現在のルールをすべて削除
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ruleIds });

  let rules = [];
  let idCount = 0;
  for (const url of urls) {
    if (url.trim() === '') continue;
    idCount++;
    console.log(idCount + ": " + url);
    // 新しいURLブロックルールを作成する
    const rule = {
      id: idCount,
      priority: idCount,
      action: { type: 'block' },
      condition: { urlFilter: url, resourceTypes: ['main_frame', 'image', 'media', 'object', 'other', 'script',
      'sub_frame', 'webbundle', 'websocket', 'csp_report', 'xmlhttprequest'] }
    };
    rules.push(rule);
  }

  if (rules.length > 0) {
    // ルールを追加する
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules });
  }

};

// ストレージが更新されたときにルールを更新する
chrome.storage.onChanged.addListener(() => {
  updateRules();
});

// 拡張機能がインストールまたはアップデートされた時にルールを更新
chrome.runtime.onInstalled.addListener(() => {
  updateRules();
});

