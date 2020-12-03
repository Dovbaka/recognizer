export function Log(el) {

  return {
    clear: () => {
      el.innerHTML = '';
    },

    setResult: (text) => {
      text = text.replace(/\n\s*\n/g, '\n');
      let pre = document.createElement('pre');
      pre.innerHTML = text;
      el.appendChild(pre);
    }
  }
}
