(() => {
  const people = {
    'Harry Porter': {
      id:'harryPorterProfile',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Education','Creekside High'],['Species','Human']],
      sections:[['Relationship',['Georgia Carter — girlfriend']],['Family',['Unnamed younger brother']],['Friends',['Samuel Sinclair','David Jones','John Wilson','Joseph Miller','Max Ford','Felix Brown','Clarke Hudson','Poppy Carter']]]
    },
    'Max Ford': {
      id:'maxFordProfile',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Education','Creekside High'],['Species','Human']],
      sections:[['Relationship',['Piper Ellwood — girlfriend']],['Siblings',['Kasey Ford — sister']],['Friends',['Samuel Sinclair','David Jones','John Wilson','Joseph Miller','Harry Porter','Felix Brown','Clarke Hudson']]]
    },
    'Clarke Hudson': {
      id:'clarkeHudsonProfile',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Education','Creekside High'],['Species','Human']],
      sections:[['Relationship',['Kasey Ford — girlfriend']],['Friends',['Samuel Sinclair','David Jones','John Wilson','Joseph Miller','Max Ford','Felix Brown','Harry Porter']]]
    },
    'Molly Winter': {
      id:'mollyWinterProfile',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Education','Creekside High'],['Species','Human']],
      sections:[['Relationships',['Samuel Sinclair — ex']]]
    },
    'Piper Ellwood': {
      id:'piperEllwoodProfile',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Education','Creekside High'],['Species','Human']],
      sections:[['Relationship',['Max Ford — boyfriend']],['Friends',['Poppy Carter','Georgia Carter','Kasey Ford']]]
    },
    'Kasey Ford': {
      id:'kaseyFordProfile',
      facts:[['Born','1981'],['Residence',"Southside, Hollow's Creek"],['Education','Creekside High'],['Species','Human']],
      sections:[['Relationship',['Clarke Hudson — boyfriend']],['Siblings',['Max Ford — brother']],['Friends',['Poppy Carter','Georgia Carter','Piper Ellwood']]]
    }
  };

  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chips=items=>items.map(item=>`<span class="chip">${esc(item)}</span>`).join('');

  function makePage(name,p){
    if(document.getElementById(p.id)) return;
    const page=document.createElement('section');
    page.id=p.id;
    page.className='page';
    page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${esc(name)}</div><div class="aka">Resident Profile</div><h2>${esc(name)}</h2></div><main class="becca-profile"><div class="profile-grid"><aside class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</aside><article class="bio-panel"><h3>Overview</h3><p>${esc(name)} is a resident of Hollow's Creek.</p></article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${esc(title)}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('residents')">← Back to Residents</button></main>`;
    document.getElementById('beaumontFamily')?.before(page) || document.body.appendChild(page);
  }

  function install(){
    if(typeof window.showResident!=='function'||typeof window.showPage!=='function'||!document.getElementById('residents')) return setTimeout(install,80);
    Object.entries(people).forEach(([name,p])=>makePage(name,p));

    const old=window.showResident;
    if(!window.__creeksideResidents2Routing){
      window.showResident=function(name){
        if(people[name]) return window.showPage(people[name].id);
        return old(name);
      };
      window.__creeksideResidents2Routing=true;
    }

    const wrap=document.querySelector('#residents .residents-wrap');
    if(!wrap) return;
    let holding=wrap.querySelector('#creekside-residents-2');
    if(!holding){
      holding=document.createElement('section');
      holding.id='creekside-residents-2';
      holding.className='letter-group';
      holding.innerHTML='<div class="letter">?</div><div class="resident-list"></div>';
      wrap.appendChild(holding);
    }
    const list=holding.querySelector('.resident-list');
    Object.keys(people).forEach(name=>{
      [...wrap.querySelectorAll('.resident-row')].forEach(btn=>{
        if((btn.querySelector('span')?.textContent||'').trim()===name) btn.remove();
      });
      const b=document.createElement('button');
      b.className='resident-row';
      b.type='button';
      b.onclick=()=>window.showResident(name);
      b.innerHTML=`<span>${esc(name)}</span><small>Profile available →</small>`;
      list.appendChild(b);
    });
  }
  install();
})();