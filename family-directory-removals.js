(() => {
  const removeFamilies = () => {
    const familiesPage = document.getElementById('families');
    if (!familiesPage) {
      setTimeout(removeFamilies, 100);
      return;
    }

    const removeLabels = new Set([
      "The O'Donnell Family",
      'The Porter Family',
      'The Rivera Family',
      'The Rosetti Family',
      'The Stone Family',
      'The White Family',
      'The Williams Family',
      'The Wilson Family'
    ]);

    familiesPage.querySelectorAll('.family-row').forEach(button => {
      const label = button.querySelector('span')?.textContent.trim();
      if (label && removeLabels.has(label)) button.remove();
    });

    familiesPage.querySelectorAll('.letter-group').forEach(group => {
      const list = group.querySelector('.family-list');
      if (list && !list.querySelector('.family-row')) group.remove();
    });

    const existingLetters = new Set(
      [...familiesPage.querySelectorAll('.letter-group')]
        .map(group => group.id.replace('letter-', ''))
    );

    const az = familiesPage.querySelector('.az');
    if (az) {
      az.querySelectorAll('a').forEach(link => {
        const letter = (link.getAttribute('href') || '').replace('#letter-', '');
        if (!existingLetters.has(letter)) link.remove();
      });
    }
  };

  removeFamilies();
})();
