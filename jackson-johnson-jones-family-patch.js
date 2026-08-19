(() => {
  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showPage !== 'function' || typeof window.showResident !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install, 60);
      return;
    }

    const residentPages = {
      'Elizabeth Jones': {
        image: 'elizabeth-jones-profile.png',
        facts: [
          ['Residence', "Hollow's Creek"], ['Species', 'Human'], ['Brother', 'David Jones'],
          ['Education', 'Creekside High School; L. Beaumont Preparatory Sixth Form']
        ]
      },
      'David Jones': {
        image: 'david-jones-profile.png',
        facts: [
          ['Birthday', '23/11/1979'], ['Birthplace', "Hollow's Creek"], ['Residence', "Hollow's Creek"],
          ['Species', 'Human'], ['School', 'Creekside High'], ['Boyfriend', 'John Wilson'],
          ['Best friends', 'Samuel Sinclair, Joseph Miller, Felix Brown, Max Ford, Clarke Hudson, Harry Porter, Poppy Carter, Georgia Carter, Piper Ellswood, Kasey Ford, Rebecca Beaumont']
        ]
      },
      'Milly Jackson': {
        image: 'milly-jackson-profile.png',
        facts: [
          ['Born', '1980'], ['Residence', "Hollow's Creek — Southside"], ['Species', 'Human'],
          ['Sister', 'Ellie Jackson (twin)'], ['School', 'L. Beaumont Preparatory'], ['Boyfriend', 'Evan Rowan'],
          ['Friends', 'Maya Hawthorne, Regulus White, Cassius Ellington, Lydia Rosetti, Lorenzo Whitmore, Pansy Walker, Rebecca Beaumont, Mattheo Montague, Theodore Holt, Harper Beaumont']
        ]
      },
      'William Johnson': {
        image: 'william-johnson-profile.png',
        facts: [
          ['Residence', "Hollow's Creek — Southside"], ['Species', 'Human'], ['Job', 'Security'],
          ['Siblings', 'Corey Johnson, Willow Johnson, Charlotte Johnson']
        ]
      },
      'Corey Johnson': {
        image: 'corey-johnson-profile.png',
        facts: [
          ['Birthday', '27/06/1980'], ['Birthplace', "Hollow's Creek"], ['Residence', "Hollow's Creek — Southside"],
          ['Species', 'Human'], ['School', 'L. Beaumont Preparatory'], ['Girlfriend', 'Morgan Hall'], ['Ex', 'Rebecca Beaumont'],
          ['Friends', 'James Williams, Jasper Williams, Marley Dickson, Pansy Walker'], ['Enemies', 'Mattheo Montague, Dylan Daniels']
        ]
      },
      'Willow Johnson': {
        image: 'willow-johnson-profile.png',
        facts: [
          ['Born', '1981'], ['Residence', "Hollow's Creek — Southside"], ['Species', 'Human'],
          ['School', 'L. Beaumont Preparatory'], ['Girlfriend', 'Lizzie Daniels'], ['Siblings', 'William Johnson, Corey Johnson, Charlotte Johnson']
        ]
      }
    };

    const links = new Set([
      'David Jones','Felix Brown','Poppy Carter','Georgia Carter','Rebecca Beaumont','Cassius Ellington','Pansy Walker','Mattheo Montague','Harper Beaumont',
      'Corey Johnson','Morgan Hall','Marley Dickson','Dylan Daniels','Willow Johnson','Lizzie Daniels','William Johnson'
    ]);

    const clickable = value => {
      let html = value;
      [...links].sort((a,b) => b.length-a.length).forEach(name => {
        html = html.split(name).join(`<button class="inline-link" onclick="showResident('${name.replace(/'/g,"\\'")}')">${name}</button>`);
      });
      return html;
    };

    const makeResident = (name, data) => {
      const id = 'resident-' + name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      if (document.getElementById(id)) return id;
      const section = document.createElement('section');
      section.id = id;
      section.className = 'page';
      section.innerHTML = `
        <div class="family-title"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="subtitle">Resident Profile</div><h2>${name}</h2></div>
        <main class="beaumont-shell">
          <div class="profile-layout">
            <aside class="profile-photo"><img src="${data.image}" alt="${name}"></aside>
            <article class="panel"><h3>Profile</h3>${data.facts.map(([k,v]) => `<div class="fact"><small>${k}</small><strong>${clickable(v)}</strong></div>`).join('')}</article>
          </div>
          <button class="back" onclick="showPage('residents')">← Back to Residents</button>
        </main>`;
      document.getElementById('beaumontFamily').before(section);
      return id;
    };

    const ids = {};
    Object.entries(residentPages).forEach(([n,d]) => ids[n] = makeResident(n,d));

    if (!window.__jjjResidentRouting) {
      const old = window.showResident;
      window.showResident = function(name) {
        if (ids[name]) return window.showPage(ids[name]);
        return old(name);
      };
      window.__jjjResidentRouting = true;
    }

    const families = {
      Jones: {
        title: 'The Jones Family',
        overview: "The Jones family are a loving Southside Hollow's Creek family. They do not have a lot, but they are happy, close and loving people.",
        facts: [['Residence', "Southside, Hollow's Creek"], ['Known members', 'Elizabeth Jones and David Jones']],
        members: ['Elizabeth Jones','David Jones']
      },
      Johnson: {
        title: 'The Johnson Family',
        overview: "The Johnson family live on the Southside of Hollow's Creek. The household is made up of two parents and their four children. There are usually noticeable age gaps between the children, and the parents keep very strict rules at home.",
        facts: [['Residence', "Southside, Hollow's Creek"], ['Parents', 'Names currently unknown'], ['Children', 'William Johnson, Corey Johnson, Willow Johnson, Charlotte Johnson']],
        members: ['William Johnson','Corey Johnson','Willow Johnson','Charlotte Johnson']
      },
      Jackson: {
        title: 'The Jackson Family',
        overview: "The Jackson family live on the Southside of Hollow's Creek. The parents and their two daughters are known as sweet and caring people who want happiness for the people they love.",
        facts: [['Residence', "Southside, Hollow's Creek"], ['Parents', 'Names currently unknown'], ['Children', 'Milly Jackson and Ellie Jackson (twins)']],
        members: ['Milly Jackson','Ellie Jackson']
      }
    };

    Object.entries(families).forEach(([key,f]) => {
      const id = key.toLowerCase() + 'Family';
      if (!document.getElementById(id)) {
        const section = document.createElement('section');
        section.id = id; section.className = 'page';
        section.innerHTML = `<div class="family-title"><div class="crumb">Hollow's Creek → Families → ${key}</div><div class="subtitle">Family Profile</div><h2>${f.title}</h2></div>
          <main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${f.overview}</p></article>
          <aside class="panel">${f.facts.map(([k,v])=>`<div class="fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</aside></div>
          <section class="members"><h3>Known Family Members</h3><div class="member-grid">${f.members.map(n => `<button class="member-card" onclick="showResident('${n}')"><span>${n}</span><small>${residentPages[n] ? 'View profile →' : 'Profile not yet built'}</small></button>`).join('')}</div></section>
          <button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
        document.getElementById('beaumontFamily').before(section);
      }
    });

    if (!window.__jjjFamilyRouting) {
      const old = window.showFamily;
      window.showFamily = function(name) {
        if (families[name]) return window.showPage(name.toLowerCase() + 'Family');
        return old(name);
      };
      window.__jjjFamilyRouting = true;
    }

    const ensureDirectory = () => {
      const familyPage = document.getElementById('families');
      if (familyPage) {
        const grids = [...familyPage.querySelectorAll('.family-grid,.member-grid,.resident-grid,.directory-grid')];
        const grid = grids[grids.length - 1] || familyPage.querySelector('main');
        if (grid) Object.keys(families).forEach(name => {
          if (![...familyPage.querySelectorAll('button')].some(b => b.textContent.includes(name + ' Family'))) {
            const b=document.createElement('button'); b.className='member-card'; b.onclick=()=>showFamily(name); b.innerHTML=`<span>${name} Family</span><small>View family →</small>`; grid.appendChild(b);
          }
        });
      }

      const residents = document.getElementById('residents');
      const wrap = residents && residents.querySelector('.residents-wrap');
      if (residents && wrap) {
        residents.querySelectorAll('.resident-section.letter-section').forEach(section => section.remove());
        Object.keys(residentPages).forEach(name => {
          [...residents.querySelectorAll('button')].filter(b => {
            const text=(b.querySelector('span')?.textContent || b.textContent).trim();
            return text===name && !b.classList.contains('resident-row');
          }).forEach(b=>b.remove());
          if (![...wrap.querySelectorAll('.resident-row')].some(b => (b.querySelector('span')?.textContent || '').trim()===name)) {
            const b=document.createElement('button');
            b.className='resident-row';
            b.type='button';
            b.onclick=()=>showResident(name);
            b.innerHTML=`<span>${name}</span><small>View profile →</small>`;
            wrap.appendChild(b);
          }
        });
      }
    };
    ensureDirectory();
  };
  install();
})();