window.onload = function() {
  chrome.storage.local.get(['urls'], function(result) {
    if (!result) return;
    document.getElementById('url_list').value = result.urls.join('\n');
  });

  document.getElementById("list_title").innerText = chrome.i18n.getMessage('list_title');
  document.getElementById("apply_button_text").innerText = chrome.i18n.getMessage('apply_button_text');
};

document.getElementById('apply').addEventListener('click', () => {
  let urlList = document.getElementById('url_list').value.split('\n');
  chrome.storage.local.set({urls: urlList});
});
