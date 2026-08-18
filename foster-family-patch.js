(() => {
  const family = {
    id: 'fosterFamily',
    title: 'The Foster Family',
    residence: "Southside, Hollow's Creek",
    overview: "The Foster family consists of mother Isabel and her three children, Crystal, Jacob and Jenny. Isabel is neglectful and rarely around, preferring alcohol to parenting. Because of this, the older siblings Crystal and Jacob take on much of the responsibility for looking after their younger sister Jenny and keeping the household running. The family live firmly on the Southside of Hollow's Creek.",
    members: ['Isabel Foster','Crystal Foster','Jacob Foster','Jenny Foster']
  };

  const people = {
    'Isabel Foster': {id:'isabelFosterProfile',img:'isabel-foster-profile.png',facts:[['Role','Mother'],['Species','Human'],['Residence',"Southside, Hollow's Creek"]],sections:[['Children',['Crystal Foster','Jacob Foster','Jenny Foster']],['Family history',['Isabel is neglectful and is rarely around. She prefers alcohol to parenting, leaving much of the responsibility for the home and Jenny to Crystal and Jacob.']]]},
    'Crystal Foster': {id:'crystalFosterProfile',img:'crystal-foster-profile.png',facts:[['Job','Stripper'],['Species','Human'],['Residence',"Southside, Hollow's Creek"]],sections:[['Family',['Isabel Foster — mother','Jacob Foster — brother','Jenny Foster — sister']],['Friends',['Rebecca Rose Beaumont','Vanity Edwards']],['Family role',['Crystal helps take care of Jenny and the household because their mother is often absent.']]]},
    'Jacob Foster': {id:'jacobFosterProfile',img:'jacob-foster-profile.png',facts:[['Born','1978'],['Job','Police Detective'],['Residence',"Southside, Hollow's Creek"]],sections:[['Family',['Isabel Foster — mother','Crystal Foster — sister','Jenny Foster — sister']],['Relationship',['Christie Dunn — girlfriend']],['Friends',['Christian Dunn — best friend','Dylan Logan Daniels','Parker Grant','Dennis Kennedy','Louis Graves','Charlie Steven Beaumont','Mattheo Thomas Marvolo Montague','Rebecca Rose Beaumont','Keira Mor Walker','Amy Graves','Ruby Bardot']],['Family role',['Jacob helps take care of Jenny and the household because their mother is often absent.']]]},
    'Jenny Foster': {id:'jennyFosterProfile',img:'jenny-foster-profile.png',facts:[['Education','Early Beaumont Academy'],['Species','Human'],['Residence',"Southside, Hollow's Creek"]],sections:[['Family',['Isabel Foster — mother','Crystal Foster — sister','Jacob Foster — brother']],['Family life',['Jenny is largely cared for by her older siblings Crystal and Jacob because their mother is rarely around.']]]}
  };

  const aliases = {
    'Rebecca Beaumont':'Rebecca Rose Beaumont','Dylan Daniels':'Dylan Logan Daniels','Charlie Beaumont':'Charlie Steven Beaumont','Mattheo Montague':'Mattheo Thomas Marvolo Montague','Keira Walker':'Keira Mor Walker'
  };
  const known = new Set([...Object.keys(people),'Rebecca Rose Beaumont','Vanity Edwards','Christie Dunn','Christian Dunn','Dylan Logan Daniels','Charlie Steven Beaumont','Mattheo Thomas Marvolo Montague','Keira Mor Walker','Ruby Bardot']);
  const esc = s => s.replace(/'/g,"\\'");
  const resolve = text => { const raw=text.split(' — ')[0].trim(); const name=aliases[raw]||raw; return known.has(name)?name:null; };
  const chips = items => items.map(item=>{const target=resolve(item);return target?`<span class="chip person-link" onclick="showResident('${esc(target)}')">${item}</span>`:`<span class="chip">${item}</span>`;}).join('');

  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) { setTimeout(install,50); return; }

    if (!window.__fosterRoutingInstalled) {
      const oldFamily=window.showFamily;
      window.showFamily=name=>name==='Foster'?window.showPage(family.id):oldFamily(name);
      const oldResident=window.showResident;
      window.showResident=name=>people[aliases[name]||name]?window.showPage(people[aliases[name]||name].id):oldResident(name);
      window.__fosterRoutingInstalled=true;
    }

    // Add Foster to Families under F.
    const familiesWrap=document.querySelector('#families .families-wrap');
    if (familiesWrap) {
      let fGroup=document.getElementById('letter-F');
      if(!fGroup){
        fGroup=document.createElement('section'); fGroup.className='letter-group'; fGroup.id='letter-F'; fGroup.innerHTML='<div class="letter">F</div><div class="family-list"></div>';
        const groups=Array.from(familiesWrap.querySelectorAll('.letter-group')); const next=groups.find(g=>(g.querySelector('.letter')?.textContent.trim()||'Z')>'F'); if(next) familiesWrap.insertBefore(fGroup,next); else familiesWrap.appendChild(fGroup);
        const az=familiesWrap.querySelector('.az'); if(az&&!az.querySelector('a[href="#letter-F"]')){const a=document.createElement('a');a.href='#letter-F';a.textContent='F';const links=Array.from(az.querySelectorAll('a'));const n=links.find(x=>x.textContent.trim()>'F');if(n)az.insertBefore(a,n);else az.appendChild(a);}
      }
      const list=fGroup.querySelector('.family-list');
      if(list&&!Array.from(list.querySelectorAll('.family-row')).some(b=>b.textContent.includes('Foster Family'))){const b=document.createElement('button');b.className='family-row';b.onclick=()=>window.showFamily('Foster');b.innerHTML='<span>The Foster Family</span><span>→</span>';list.appendChild(b);}
    }

    if(!document.getElementById(family.id)){
      const page=document.createElement('section');page.id=family.id;page.className='page';
      page.innerHTML=`<div class="family-title"><div class="crumb">Hollow's Creek → Families → Foster</div><div class="subtitle">Family Profile</div><h2>${family.title}</h2></div><main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${family.overview}</p></article><aside class="panel"><div class="fact"><small>Family</small><strong>Foster</strong></div><div class="fact"><small>Residence</small><strong>${family.residence}</strong></div><div class="fact"><small>Known members</small><strong>4</strong></div></aside></div><section class="members"><h3>Family Members</h3><div class="member-grid">${family.members.map(n=>`<button class="member-card" onclick="showResident('${esc(n)}')"><span>${n}</span><small>View profile →</small></button>`).join('')}</div></section><button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    Object.entries(people).forEach(([name,p])=>{
      if(document.getElementById(p.id)) return;
      const page=document.createElement('section');page.id=p.id;page.className='page';
      page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="aka">Resident Profile</div><h2>${name}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${name}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${title}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('${family.id}')">← Back to ${family.title}</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    });

    const wrap=document.querySelector('#residents .residents-wrap');
    if(wrap){
      let group=document.getElementById('res-f');
      if(!group){group=document.createElement('section');group.className='letter-group';group.id='res-f';group.innerHTML='<div class="letter">F</div><div class="resident-list"></div>';const groups=Array.from(wrap.querySelectorAll('.letter-group'));const next=groups.find(g=>(g.querySelector('.letter')?.textContent.trim()||'Z')>'F');if(next)wrap.insertBefore(group,next);else wrap.appendChild(group);const az=wrap.querySelector('.az');if(az&&!az.querySelector('a[href="#res-f"]')){const a=document.createElement('a');a.href='#res-f';a.textContent='F';const links=Array.from(az.querySelectorAll('a'));const n=links.find(x=>x.textContent.trim()>'F');if(n)az.insertBefore(a,n);else az.appendChild(a);}}
      const list=group.querySelector('.resident-list');
      Object.keys(people).forEach(name=>{wrap.querySelectorAll('.resident-row').forEach(btn=>{if(btn.querySelector('span')?.textContent.trim()===name)btn.remove();});const b=document.createElement('button');b.className='resident-row';b.onclick=()=>window.showResident(name);b.innerHTML=`<span>${name}</span><small>Profile available →</small>`;list.appendChild(b);});
      Array.from(list.children).sort((a,b)=>a.querySelector('span').textContent.localeCompare(b.querySelector('span').textContent)).forEach(el=>list.appendChild(el));
    }
  };
  install();
})();