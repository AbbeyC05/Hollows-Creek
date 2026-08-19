(() => {
  const install = () => {
    if (typeof window.showPage !== 'function' || typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install, 60);
      return;
    }

    const residentPages = {
      'Fiona Madden': { image:'fiona-madden-profile.png', facts:[['Residence',"Hollow's Creek — Southside"],['Species','Human'],['Husband','Jamie Madden'],['Daughters','Daphne Madden, Deliah Madden']] },
      'Jamie Madden': { image:'jamie-madden-profile.png', facts:[['Residence',"Hollow's Creek — Southside"],['Species','Human'],['Wife','Fiona Madden'],['Daughters','Daphne Madden, Deliah Madden']] },
      'Daphne Madden': { image:'Daphne-madden-profile.png', facts:[['Born','1978'],['Residence',"Hollow's Creek — Southside"],['Species','Human'],['School','L. Beaumont Preparatory'],['Girlfriend','Eleanor Bradford'],['Parents','Fiona Madden and Jamie Madden'],['Sister','Deliah Madden']] },
      'Deliah Madden': { image:'deliah-madden-profile.png', facts:[['Born','1979'],['Residence',"Hollow's Creek — Southside"],['Species','Human'],['School','L. Beaumont Preparatory'],['Boyfriend','Reece Beaumont'],['Parents','Fiona Madden and Jamie Madden'],['Sister','Daphne Madden']] },
      'Joseph Miller': { image:'joseph-miller-profile.png', facts:[['Born','1980'],['Residence',"Hollow's Creek — Southside"],['School','Creekside High'],['Girlfriend','April Sinclair'],['Friends','David Jones, Samuel Sinclair, John Wilson, Harry Porter, Felix Brown, Max Ford, Clarke Hudson'],['Sibling','Sarah Miller']] },
      'Sarah Miller': { image:'sarah-miller-profile.png', facts:[['Born','1981'],['Residence',"Hollow's Creek — Southside"],['Species','Human'],['School','Creekside High'],['Boyfriend','Noah Evans'],['Friends','April Sinclair, Harper Beaumont, Jackson Wilson'],['Sibling','Joseph Miller']] }
    };

    const linkNames = new Set(['Jamie Madden','Fiona Madden','Daphne Madden','Deliah Madden','Reece Beaumont','David Jones','Felix Brown','Harper Beaumont','Joseph Miller','Sarah Miller']);
    const clickable = value => {
      let html = value;
      [...linkNames].sort((a,b)=>b.length-a.length).forEach(name => {
        html = html.split(name).join(`<button class="inline-link" onclick="showResident('${name.replace(/'/g,"\\'")}')">${name}</button>`);
      });
      return html;
    };

    const ids = {};
    Object.entries(residentPages).forEach(([name,data]) => {
      const id='resident-'+name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      ids[name]=id;
      if (document.getElementById(id)) return;
      const section=document.createElement('section');
      section.id=id; section.className='page';
      section.innerHTML=`<div class="family-title"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="subtitle">Resident Profile</div><h2>${name}</h2></div><main class="beaumont-shell"><div class="profile-layout"><aside class="profile-photo"><img src="${data.image}" alt="${name}"></aside><article class="panel"><h3>Profile</h3>${data.facts.map(([k,v])=>`<div class="fact"><small>${k}</small><strong>${clickable(v)}</strong></div>`).join('')}</article></div><button class="back" onclick="showPage('residents')">← Back to Residents</button></main>`;
      document.getElementById('beaumontFamily').before(section);
    });

    if (!window.__maddenMillerResidentRouting) {
      const old=window.showResident;
      window.showResident=function(name){ if(ids[name]) return window.showPage(ids[name]); return old(name); };
      window.__maddenMillerResidentRouting=true;
    }

    const families={
      Madden:{title:'The Madden Family',overview:"The Madden family are a quiet Southside Hollow's Creek family consisting of two parents, Fiona and Jamie Madden, and their daughters Daphne and Deliah.",facts:[['Residence',"Southside, Hollow's Creek"],['Parents','Fiona Madden and Jamie Madden'],['Children','Daphne Madden and Deliah Madden']],members:['Fiona Madden','Jamie Madden','Daphne Madden','Deliah Madden']},
      Miller:{title:'The Miller Family',overview:"The Miller family are a Southside Hollow's Creek family made up of their parents and two children, Joseph and Sarah Miller. Little else is currently known about the family.",facts:[['Residence',"Southside, Hollow's Creek"],['Parents','Names currently unknown'],['Children','Joseph Miller and Sarah Miller']],members:['Joseph Miller','Sarah Miller']}
    };

    Object.entries(families).forEach(([key,f])=>{
      const id=key.toLowerCase()+'Family';
      if(document.getElementById(id)) return;
      const section=document.createElement('section'); section.id=id; section.className='page';
      section.innerHTML=`<div class="family-title"><div class="crumb">Hollow's Creek → Families → ${key}</div><div class="subtitle">Family Profile</div><h2>${f.title}</h2></div><main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${f.overview}</p></article><aside class="panel">${f.facts.map(([k,v])=>`<div class="fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</aside></div><section class="members"><h3>Known Family Members</h3><div class="member-grid">${f.members.map(n=>`<button class="member-card" onclick="showResident('${n}')"><span>${n}</span><small>View profile →</small></button>`).join('')}</div></section><button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
      document.getElementById('beaumontFamily').before(section);
    });

    if(!window.__maddenMillerFamilyRouting){
      const old=window.showFamily;
      window.showFamily=function(name){if(families[name]) return window.showPage(name.toLowerCase()+'Family'); return old(name);};
      window.__maddenMillerFamilyRouting=true;
    }

    const familyPage=document.getElementById('families');
    if(familyPage){
      const grid=[...familyPage.querySelectorAll('.family-grid,.member-grid,.directory-grid')].pop() || familyPage.querySelector('main');
      if(grid) Object.keys(families).forEach(name=>{
        if(![...familyPage.querySelectorAll('button')].some(b=>b.textContent.includes(name+' Family'))){const b=document.createElement('button');b.className='member-card';b.onclick=()=>showFamily(name);b.innerHTML=`<span>${name} Family</span><small>View family →</small>`;grid.appendChild(b);}
      });
    }

    const residents=document.getElementById('residents');
    const wrap=residents&&residents.querySelector('.residents-wrap');
    if(wrap){
      let group=document.getElementById('res-m');
      if(!group){group=document.createElement('section');group.className='letter-group';group.id='res-m';group.innerHTML='<div class="letter">M</div><div class="resident-list"></div>';wrap.appendChild(group);}
      const list=group.querySelector('.resident-list');
      Object.keys(residentPages).forEach(name=>{
        wrap.querySelectorAll('.resident-row').forEach(row=>{const s=row.querySelector('span'); if(s&&s.textContent.trim()===name) row.remove();});
        const b=document.createElement('button');b.className='resident-row';b.onclick=()=>showResident(name);b.innerHTML=`<span>${name}</span><small>Profile available →</small>`;list.appendChild(b);
      });
    }
  };
  install();
})();
