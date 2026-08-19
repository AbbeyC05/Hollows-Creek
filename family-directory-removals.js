(() => {
  const removeFamilies = () => {
    const familiesPage = document.getElementById('families');
    if (!familiesPage) {
      setTimeout(removeFamilies, 100);
      return;
    }

    const removeNames = new Set([
      "O'Donnell",
      'Porter',
      'Rivera',
      'Rosetti',
      'Stone',
      'White',
      'Williams',
      'Wilson'
    ]);

    familiesPage.querySelectorAll('.family-row').forEach(button => {
      const match = button.getAttribute('onclick')?.match(/showFamily\('([^']+)'\)/);
      if (match && removeNames.has(match[1])) button.remove();
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
