const changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', data => {
  console.log({changeColor, data});
  if (!changeColor) return;
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

interface IElement {
  target: {
    value: string;
  }
}

if (changeColor) {
  changeColor.onclick = element => {
    if (!element) return;
    const color = (element as unknown as IElement).target.value || 'blue';
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.executeScript(tabs[0].id as number, {
        code: 'document.body.style.backgroundColor = "' + color + '";',
      });
    });
  };
}
