let checkbox = document.getElementById('show');

const setSeekBarOpacity = show => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const display = show ? 'block' : 'none';
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: `document.getElementsByClassName("ytp-chrome-bottom")[0].style['display'] = '${display}'` }
    );
  });
}

chrome.storage.sync.get('show', function({ show }) {
  console.log("data", show)
  checkbox.checked = show;
  setSeekBarOpacity(show)
});

checkbox.onclick = function(element) {
  const show = element.target.checked;
  chrome.storage.sync.set({ show });
  setSeekBarOpacity(show)
};
