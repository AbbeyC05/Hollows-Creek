(() => {
  const fixText = root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (/Piper\s+Ellswood/gi.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(/Piper\s+Ellswood/gi, 'Piper Ellwood');
      }
      if (/Ellswood/gi.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(/Ellswood/gi, 'Ellwood');
      }
    }
  };

  const run = () => fixText(document.body);
  run();
  const observer = new MutationObserver(() => run());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();