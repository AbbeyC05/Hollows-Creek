(() => {
  const jpgProfiles = {
    'celia-profile.png': 'celia-profile.jpg',
    'leon-profile.png': 'leon-profile.jpg',
    'reece-profile.png': 'reece-profile.jpg',
    'libby-profile.png': 'libby-profile.jpg',
    'melissa-profile.png': 'melissa-profile.jpg',
    'lukas-profile.png': 'lukas-profile.jpeg',
    'rosa-profile.png': 'rosa-profile.jpeg',
    'lukas-jr-profile.png': 'lukas-jr-profile.jpeg',
    'charlie-profile.png': 'charlie-profile.jpeg',
    'bradley-profile.png': 'bradley-profile.jpeg',
    'henry-profile.png': 'henry-profile.jpeg'
  };

  function fixProfileImages(root = document) {
    root.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (!src) return;
      for (const [oldName, newName] of Object.entries(jpgProfiles)) {
        if (src.includes(oldName)) {
          img.setAttribute('src', src.replace(oldName, newName));
          break;
        }
      }
    });
  }

  fixProfileImages();
  new MutationObserver(() => fixProfileImages()).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src']
  });
})();
