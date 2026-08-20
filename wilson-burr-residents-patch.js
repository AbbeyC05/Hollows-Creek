(() => {
  const people = {
    'John Wilson': {
      id:'johnWilsonProfile', img:'john-wilson-profile.png',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Education','Creekside High']],
      sections:[['Relationship',['David Jones — boyfriend']],['Family',['Jackson Wilson — brother']],['Friends',['Joseph Miller','Samuel Sinclair','Max Ford','Felix Brown','Clarke Hudson','Harry Porter']]]
    },
    'Jackson Wilson': {
      id:'jacksonWilsonProfile', img:'jackson-wilson-profile.png',
      facts:[['Born','1981'],['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Education','Creekside High']],
      sections:[['Relationship',['Henry Beaumont — boyfriend']],['Family',['John Wilson — brother']],['Friends',['Harper Beaumont','Sarah Miller','April Sinclair','Noah Evans']]]
    },
    'Aaron Burr': {
      id:'aaronBurrProfile', img:'aaron-burr-profile.png',
      facts:[['Born','1979'],['Species','Human'],['Job','Dancer']],
      sections:[['Relationship',['Riley Beaumont — girlfriend']]]
    }
  };

  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chips=items=>items.map(x=>`<span class="chip">${esc(x)}</span>`).join('');

  function makePage(name,p){
    if(document.getElementById(p.id)) return;
    const page=document.createElement('section'); page.id=p.id; page.className='page';
    page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${esc(name)}</div><div class="aka">Resident Profile</div><h2>${esc(name)}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${esc(name)}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${esc(title)}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('residents')">← Back to Residents</button></main>`;
    document.getElementById('beaumontFamily')?.before(page) || document.body.appendChild(page);
  }

  function install(){
    if(typeof window.showResident!=='function'||typeof window.showPage!=='function'||!document.getElementById('residents')) return setTimeout(install,80);
    Object.entries(people).forEach(([n,p])=>makePage(n,p));
    const old=window.showResident;
    window.showResident=function(name){ if(people[name]) return window.showPage(people[name].id); return old(name); };
    const wrap=document.querySelector('#residents .residents-wrap'); if(!wrap)return;
    let holding=wrap.querySelector('#wilson-burr-residents');
    if(!holding){holding=document.createElement('section');holding.id='wilson-burr-residents';holding.className='letter-group';holding.innerHTML='<div class="letter">?</div><div class="resident-list"></div>';wrap.appendChild(holding);}
    const list=holding.querySelector('.resident-list');
    Object.keys(people).forEach(name=>{
      [...wrap.querySelectorAll('.resident-row')].forEach(btn=>{if((btn.querySelector('span')?.textContent||'').trim()===name)btn.remove();});
      const b=document.createElement('button');b.className='resident-row';b.type='button';b.onclick=()=>window.showResident(name);b.innerHTML=`<span>${esc(name)}</span><small>Profile available →</small>`;list.appendChild(b);
    });
  }
  install();
})();