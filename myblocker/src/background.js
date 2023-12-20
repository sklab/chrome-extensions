// Resource types for filtering conditions
const ALL_RESOURCE_TYPE = ['beacon', 'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script', 'sub_frame', 'websocket', 'xmlhttprequest'];

// Update rules from storage
const updateRules = async () => {
  let { urls } = await chrome.storage.local.get('urls');
  urls = urls || [];

  const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
  const ruleIds = currentRules.map(rule => rule.id);
  // Remove all rules
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ruleIds });

  const rules = urls
    .filter(url => url.trim() !== '' && !url.trim().startsWith('#'))
    .map((url, index) => ({
      id: index + 1,
      priority: index + 1,
      action: { type: 'block' },
      condition: {
        urlFilter: url,
        resourceTypes: ALL_RESOURCE_TYPE
      }
    }));
  if (rules.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules });
  }

};

// Update rules when storage changes
chrome.storage.onChanged.addListener(() => {
  updateRules();
});

// Update rules when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  updateRules();
});

