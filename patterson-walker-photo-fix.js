(() => {
  const applyPhotos = () => {
    const annabella = document.getElementById('annabellaPattersonProfile');
    const steven = document.getElementById('stevenWalkerProfile');
    if (!annabella || !steven) {
      setTimeout(applyPhotos, 100);
      return;
    }

    const setPhoto = (page, src, alt) => {
      const grid = page.querySelector('.profile-grid');
      if (!grid) return;
      const first = grid.children[0];
      if (!first) return;
      first.innerHTML = `<img class="profile-photo" src="${src}" alt="${alt}">`;
    };

    setPhoto(annabella, 'Annabella-Patterson-profile.png', 'Annabella Patterson');
    setPhoto(steven, 'steven-walker-profile.png', 'Steven Walker');
  };

  applyPhotos();
})();