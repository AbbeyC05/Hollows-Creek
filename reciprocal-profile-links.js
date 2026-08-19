(() => {
  const manualAliases = {
    'Rebecca Beaumont':'Rebecca Rose Beaumont','Becca Beaumont':'Rebecca Rose Beaumont',
    'Lukas Beaumont':'Lukas Henry Beaumont','Lukas Beaumont Jr':'Lukas Henry Beaumont Jr',
    'Charlie Beaumont':'Charlie Steven Beaumont','Libby Beaumont':'Libby Christine Beaumont',
    'Bethany Beaumont':'Bethany Alana Beaumont','Reece Beaumont':'Reece Ethan Beaumont',
    'Leon Beaumont':'Leon Alex Beaumont','Bradley Beaumont':'Bradley Marcus Beaumont',
    'Harper Beaumont':'Harper Victoria Beaumont','Melissa Beaumont':'Melissa Mary Beaumont',
    'Celia Beaumont':'Celia Isabella Beaumont','Henry Beaumont':'Henry Luke Beaumont','Riley Beaumont':'Riley Faith Beaumont',
    'Mattheo Montague':'Mattheo Thomas Marvolo Montague','Alex Montague':'Alexandria Jade Montague',
    'Alexandria Montague':'Alexandria Jade Montague','Thomas Montague III':'Thomas Marvolo Montague III',
    'Thomas Montague II':'Thomas Marvolo Montague II','Theodore Holt IV':'Theodore Alexander Holt IV',
    'Theo Holt':'Theodore Alexander Holt IV','Theodore Holt':'Theodore Alexander Holt IV',
    'Theodore Holt III':'Theodore Alexander Holt III','Dylan Daniels':'Dylan Logan Daniels',
    'Keira Walker':'Keira Mor Walker','Pansy Walker':'Pansy Hannah Walker','Sam Sinclair':'Samuel Sinclair',
    'Noel Walker':'Nora Walker','Nora Walker':'Nora Walker'
  };

  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const norm = s => clean(s).toLowerCase();

  function residentPages(){
    const map = new Map();
    document.querySelectorAll('.page').forEach(page => {
      if (['residents','families','familyProfile','residentPlaceholder'].includes(page.id)) return;
      const h = page.querySelector('.profile-head h2, .family-title h2');
      if (!h) return;
      const name = clean(h.textContent);
      if (!name) return;
      const familySubtitle = norm(page.querySelector('.family-title .subtitle')?.textContent);
      if (page.querySelector('.family-title') && familySubtitle && !familySubtitle.includes('resident')) return;
      map.set(name,page);
    });
    return map;
  }

  function surnameParts(full){
    let parts=full.replace(/\([^)]*\)/g,'').trim().split(/\s+/).filter(Boolean);
    const suffixes=new Set(['jr','sr','ii','iii','iv','v']);
    if(parts.length>1 && suffixes.has(parts[parts.length-1].toLowerCase().replace(/\./g,''))) parts.pop();
    return {first:parts[0]||'',last:parts[parts.length-1]||''};
  }

  function aliasMap(pages){
    const map=new Map();
    [...pages.keys()].forEach(full=>{
      map.set(full,full);
      const {first,last}=surnameParts(full);
      if(first&&last) map.set(`${first} ${last}`,full);
    });
    Object.entries(manualAliases).forEach(([a,t])=>{if(pages.has(t))map.set(a,t)});
    return map;
  }

  function detectTarget(text,aliases,source){
    const t=clean(text);
    let best=null;
    aliases.forEach((target,alias)=>{
      if(target===source) return;
      const re=new RegExp(`(^|[^A-Za-z])${alias.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(?=$|[^A-Za-z])`,'i');
      if(re.test(t) && (!best || alias.length>best.alias.length)) best={alias,target};
    });
    return best?.target || null;
  }

  function categoryFromLabel(label){
    const x=norm(label);
    if(/friend/.test(x)) return {key:'friends',title:'Friends'};
    if(/enem/.test(x)) return {key:'enemies',title:'Enemies'};
    if(/relationship|boyfriend|girlfriend|husband|wife|partner|fianc|ex\b/.test(x)) return {key:'relationships',title:'Relationships'};
    if(/sibling|brother|sister|twin/.test(x)) return {key:'siblings',title:'Siblings'};
    if(/parent|mother|father/.test(x)) return {key:'parents',title:'Parents'};
    if(/children|child|son|daughter/.test(x)) return {key:'children',title:'Children'};
    if(/cousin|aunt|uncle|niece|nephew|family/.test(x)) return {key:'family',title:'Family'};
    return null;
  }

  function reverseCategory(cat){
    if(cat.key==='parents') return {key:'children',title:'Children'};
    if(cat.key==='children') return {key:'parents',title:'Parents'};
    return cat;
  }

  function getMain(page){return page.querySelector('.becca-profile, .profile-card, main') || page;}

  function findSection(page,cat){
    return [...page.querySelectorAll('.profile-section')].find(s=>{
      const h=s.querySelector('h2,h3');
      return h && categoryFromLabel(h.textContent)?.key===cat.key;
    });
  }

  function ensureSection(page,cat){
    let sec=findSection(page,cat);
    if(sec) return sec;
    sec=document.createElement('section');
    sec.className='profile-section reciprocal-section';
    sec.innerHTML=`<h3>${cat.title}</h3><div class="chips"></div>`;
    const main=getMain(page);
    const back=[...main.querySelectorAll('button.back,.back')].pop();
    if(back) back.before(sec); else main.appendChild(sec);
    return sec;
  }

  function sectionHasPerson(sec,name,aliases){
    const text=clean(sec.textContent);
    if(text.includes(name)) return true;
    for(const [alias,target] of aliases){if(target===name && text.includes(alias))return true;}
    return false;
  }

  function addReverse(targetPage,sourceName,cat,aliases){
    const sec=ensureSection(targetPage,reverseCategory(cat));
    if(sectionHasPerson(sec,sourceName,aliases)) return;
    let chips=sec.querySelector('.chips');
    if(!chips){chips=document.createElement('div');chips.className='chips';sec.appendChild(chips);}
    const chip=document.createElement('span');
    chip.className='chip reciprocal-chip';
    chip.textContent=sourceName;
    chips.appendChild(chip);
  }

  function scanSection(sourceName,sec,pages,aliases){
    const heading=sec.querySelector('h2,h3');
    const cat=categoryFromLabel(heading?.textContent);
    if(!cat) return;
    const candidates=sec.querySelectorAll('.chip,p,strong,li,button.inline-person-link');
    candidates.forEach(el=>{
      const target=detectTarget(el.textContent,aliases,sourceName);
      if(target && pages.has(target)) addReverse(pages.get(target),sourceName,cat,aliases);
    });
  }

  function scanFacts(sourceName,page,pages,aliases){
    page.querySelectorAll('.bio-fact,.fact').forEach(f=>{
      const label=f.querySelector('small,label')?.textContent || '';
      const cat=categoryFromLabel(label);
      if(!cat) return;
      const value=f.querySelector('strong')?.textContent || f.textContent;
      const target=detectTarget(value,aliases,sourceName);
      if(target && pages.has(target)) addReverse(pages.get(target),sourceName,cat,aliases);
    });
  }

  function run(){
    const pages=residentPages();
    if(!pages.size) return setTimeout(run,150);
    const aliases=aliasMap(pages);
    pages.forEach((page,name)=>{
      page.querySelectorAll('.profile-section').forEach(sec=>scanSection(name,sec,pages,aliases));
      scanFacts(name,page,pages,aliases);
    });
    document.dispatchEvent(new Event('reciprocalProfilesUpdated'));
  }

  setTimeout(run,2100);
  let timer;
  const observer=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(run,250);
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();