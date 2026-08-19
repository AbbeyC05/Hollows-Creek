(() => {
  const people = {
    'Laura Sinclair': {id:'lauraSinclairProfile', img:'laura-sinclair-profile.png', facts:[['Residence',"Hollow's Creek"],['Role','Mother'],['Relationship','Married'],['Job','Bank'],['Species','Human']], sections:[['Children','Samuel Sinclair • April Sinclair • Sadie Sinclair • Austin Sinclair']]},
    'Samuel Sinclair': {id:'samuelSinclairProfile', img:'samuel-sinclair-profile.png', aka:'Sam Sinclair', facts:[['Born','30 May 1980'],['Residence',"Hollow's Creek"],['School','Creekside High'],['Species','Human']], sections:[['Relationships','Molly Winter — ex'],['Friends','David Jones • Joseph Miller • John Wilson • Felix Brown • Harry Porter • Max Ford • Clarke Hudson']]},
    'Sam Sinclair': {alias:'Samuel Sinclair'},
    'April Sinclair': {id:'aprilSinclairProfile', img:'april-sinclair-profile.png', facts:[['Born','16 April 1981'],['Residence',"Hollow's Creek"],['School','Creekside High']], sections:[['Relationship','Joseph Miller — boyfriend'],['Friends','Harper Beaumont • Sarah Miller • Noah Evans • Jackson Wilson']]},
    'Sadie Sinclair': {id:'sadieSinclairProfile', img:'sadie-sinclair-profile.png', facts:[['Residence',"Hollow's Creek"],['School','Early Beaumont Academy']], sections:[['Sibling','Austin Sinclair — twin']]},
    'Austin Sinclair': {id:'austinSinclairProfile', img:'austin-sinclair-profile.png', facts:[['Residence',"Hollow's Creek"],['School','Early Beaumont Academy']], sections:[['Sibling','Sadie Sinclair — twin']]},
    'Caleb Whitmore': {id:'calebWhitmoreProfile', img:'caleb-whitmore-profile.png', facts:[['Residence','Unknown'],['Job','Businessman']], sections:[['Relationship','Hannah Whitmore — wife'],['Children','Tony Whitmore • Lorenzo Whitmore • Tate Whitmore • Lexie Whitmore'],['Enemy','Lukas Beaumont']]},
    'Hannah Whitmore': {id:'hannahWhitmoreProfile', img:'hannah-whitmore-profile.png', aka:'née White', facts:[['Residence',"Hollow's Creek"]], sections:[['Relationship','Caleb Whitmore — husband']]},
    'Tony Whitmore': {id:'tonyWhitmoreProfile', img:'tony-whitmore-profile.png', aka:'"Caleb Whitmore"', facts:[['Residence',"Hollow's Creek"],['School','L. Beaumont Preparatory']], sections:[['Known As','Tony lives under the identity “Caleb Whitmore” for the sake of his younger siblings.']]},
    'Lorenzo Whitmore': {id:'lorenzoWhitmoreProfile', img:'lorenzo-whitmore-profile.png', aka:'"Lorenzo Ryan Whitmore" — fake middle name given by Rebecca Beaumont', facts:[['Born','2 April 1980'],['School','L. Beaumont Preparatory']], sections:[['Relationships','Pansy Walker — girlfriend • Ellie Jackson — ex'],['Friends','Rebecca Beaumont • Mattheo Montague • Theodore Holt IV • Regulus White • Maya Hawthorne • Blake Hardly • Isabella Richardson • Milly Jackson • Evan Rowan • Lydia Rosetti • Cassius Ellington']]},
    'Tate Whitmore': {id:'tateWhitmoreProfile', img:'tate-whitmore-profile.png', facts:[['Residence',"Hollow's Creek"],['School','L. Beaumont Preparatory']], sections:[['Sibling','Lexie Whitmore — twin']]},
    'Lexie Whitmore': {id:'lexieWhitmoreProfile', img:'lexie-whitmore-profile.png', facts:[['Residence',"Hollow's Creek"],['School','L. Beaumont Preparatory']], sections:[['Sibling','Tate Whitmore — twin'],['Relationship','Sienna Power — girlfriend']]}
  };

  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  function makePage(name,p){
    if(document.getElementById(p.id)) return;
    const sec=document.createElement('section'); sec.id=p.id; sec.className='page';
    sec.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents</div>${p.aka?`<div class="aka">${esc(p.aka)}</div>`:''}<h2>${esc(name)}</h2></div><main class="becca-profile"><div class="profile-grid"><aside class="bio-panel"><img class="profile-photo" src="${p.img}" alt="${esc(name)}"><h3>Profile</h3>${p.facts.map(f=>`<div class="bio-fact"><small>${esc(f[0])}</small><strong>${esc(f[1])}</strong></div>`).join('')}</aside><article class="bio-panel"><h3>Overview</h3><p>${esc(name)} is a resident of Hollow's Creek.</p></article></div>${p.sections.map(s=>`<section class="profile-section"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></section>`).join('')}<button class="back" onclick="showPage('residents')">← Back to Residents</button></main>`;
    document.body.appendChild(sec);
  }
  Object.entries(people).forEach(([n,p])=>{if(!p.alias)makePage(n,p)});
  const old=window.showResident;
  window.showResident=function(name){const p=people[name]; if(p){const real=p.alias?people[p.alias]:p; return showPage(real.id)} return old?old(name):undefined;};

  function ensureResident(name){
    const page=document.getElementById('residents'); if(!page)return;
    const surname=(name.trim().split(/\s+/).pop()||name); const letter=surname[0].toUpperCase();
    let group=page.querySelector('#res-'+letter.toLowerCase()) || page.querySelector('#resident-letter-'+letter) || page.querySelector('#residents-letter-'+letter);
    if(!group){
      group=document.createElement('section'); group.className='letter-group'; group.id='res-'+letter.toLowerCase(); group.innerHTML=`<div class="letter">${letter}</div><div class="resident-list"></div>`;
      const wrap=page.querySelector('.residents-wrap')||page.querySelector('main')||page;
      const groups=[...wrap.querySelectorAll(':scope > .letter-group')]; const after=groups.find(g=>((g.querySelector('.letter')?.textContent||'Z').trim()>letter)); if(after)after.before(group); else wrap.appendChild(group);
    }
    const list=group.querySelector('.resident-list')||group;
    page.querySelectorAll('.resident-row').forEach(b=>{const n=(b.querySelector('span')?.textContent||'').trim(); if(n===name && b.parentElement!==list)b.remove();});
    if([...list.querySelectorAll('.resident-row')].some(b=>(b.querySelector('span')?.textContent||'').trim()===name))return;
    const b=document.createElement('button'); b.className='resident-row'; b.type='button'; b.onclick=()=>showResident(name); b.innerHTML=`<span>${esc(name)}</span><small>View profile →</small>`; list.appendChild(b);
  }
  function init(){const page=document.getElementById('residents'); if(!page)return setTimeout(init,100); ['Laura Sinclair','Samuel Sinclair','April Sinclair','Sadie Sinclair','Austin Sinclair','Caleb Whitmore','Hannah Whitmore','Tony Whitmore','Lorenzo Whitmore','Tate Whitmore','Lexie Whitmore'].forEach(ensureResident);}
  init();
})();