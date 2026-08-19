(() => {
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const q = s => String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");

  const manualAliases = {
    'Rebecca Beaumont':'Rebecca Rose Beaumont', 'Becca Beaumont':'Rebecca Rose Beaumont',
    'Lukas Beaumont':'Lukas Henry Beaumont', 'Lukas Beaumont Jr':'Lukas Henry Beaumont Jr',
    'Charlie Beaumont':'Charlie Steven Beaumont', 'Libby Beaumont':'Libby Christine Beaumont',
    'Bethany Beaumont':'Bethany Alana Beaumont', 'Reece Beaumont':'Reece Ethan Beaumont',
    'Leon Beaumont':'Leon Alex Beaumont', 'Bradley Beaumont':'Bradley Marcus Beaumont',
    'Harper Beaumont':'Harper Victoria Beaumont', 'Melissa Beaumont':'Melissa Mary Beaumont',
    'Celia Beaumont':'Celia Isabella Beaumont', 'Henry Beaumont':'Henry Luke Beaumont', 'Riley Beaumont':'Riley Faith Beaumont',
    'Mattheo Montague':'Mattheo Thomas Marvolo Montague', 'Alex Montague':'Alexandria Jade Montague',
    'Alexandria Montague':'Alexandria Jade Montague', 'Thomas Montague III':'Thomas Marvolo Montague III',
    'Thomas Montague II':'Thomas Marvolo Montague II',
    'Theodore Holt IV':'Theodore Alexander Holt IV', 'Theo Holt':'Theodore Alexander Holt IV',
    'Theodore Holt':'Theodore Alexander Holt IV', 'Theodore Holt III':'Theodore Alexander Holt III',
    'Dylan Daniels':'Dylan Logan Daniels', 'Keira Walker':'Keira Mor Walker', 'Pansy Walker':'Pansy Hannah Walker',
    'Sam Sinclair':'Samuel Sinclair', 'Nora Walker':'Nora Walker', 'Noel Walker':'Nora Walker'
  };

  function collectProfiles(){
    const names = new Set();
    document.querySelectorAll('.page').forEach(page => {
      if (['residents','families','familyProfile','residentPlaceholder'].includes(page.id)) return;
      const residentMarker = page.querySelector('.profile-head, .family-title .subtitle');
      if (!residentMarker) return;
      const subtitle = page.querySelector('.family-title .subtitle')?.textContent.trim().toLowerCase();
      if (page.querySelector('.family-title') && subtitle && !subtitle.includes('resident')) return;
      const h = page.querySelector('.profile-head h2, .family-title h2');
      if (h && h.textContent.trim()) names.add(h.textContent.trim());
    });
    return [...names];
  }

  function surnameParts(full){
    let parts = full.replace(/\([^)]*\)/g,'').trim().split(/\s+/).filter(Boolean);
    const suffixes = new Set(['jr','sr','ii','iii','iv','v']);
    let suffix = '';
    if (parts.length > 1 && suffixes.has(parts[parts.length-1].toLowerCase().replace(/\./g,''))) suffix = parts.pop();
    return {first:parts[0]||'', last:parts[parts.length-1]||'', suffix};
  }

  function makeAliasMap(){
    const map = new Map();
    const profiles = collectProfiles();
    profiles.forEach(full => {
      map.set(full, full);
      const {first,last,suffix} = surnameParts(full);
      if (first && last) {
        map.set(`${first} ${last}`, full);
        if (suffix) map.set(`${first} ${last} ${suffix}`, full);
      }
    });
    Object.entries(manualAliases).forEach(([alias,target]) => {
      if (profiles.includes(target)) map.set(alias,target);
    });
    return map;
  }

  function bestTarget(text, aliases){
    const clean = text.trim();
    let best = null;
    aliases.forEach((target,alias) => {
      const re = new RegExp(`(^|[^A-Za-z])${alias.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(?=$|[^A-Za-z])`,'i');
      if (re.test(clean) && (!best || alias.length > best.alias.length)) best = {alias,target};
    });
    return best;
  }

  function linkChip(chip, aliases){
    if (chip.classList.contains('person-link') || chip.closest('button,a')) return;
    const hit = bestTarget(chip.textContent, aliases);
    if (!hit) return;
    chip.classList.add('person-link');
    chip.setAttribute('role','button');
    chip.tabIndex = 0;
    chip.onclick = () => window.showResident(hit.target);
    chip.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.showResident(hit.target); } };
  }

  function linkTextContainer(el, aliases){
    if (el.closest('button,a,.person-link') || el.dataset.autoLinked === '1') return;
    const text = el.textContent;
    const candidates = [...aliases.entries()].filter(([alias]) => text.includes(alias)).sort((a,b)=>b[0].length-a[0].length);
    if (!candidates.length) return;
    let html = esc(text);
    let changed = false;
    candidates.forEach(([alias,target]) => {
      const safeAlias = esc(alias);
      if (html.includes(safeAlias)) {
        html = html.split(safeAlias).join(`<button type="button" class="inline-person-link" onclick="showResident('${q(target)}')">${safeAlias}</button>`);
        changed = true;
      }
    });
    if (changed) { el.innerHTML = html; el.dataset.autoLinked = '1'; }
  }

  function run(){
    if (typeof window.showResident !== 'function') return setTimeout(run,100);
    const aliases = makeAliasMap();
    document.querySelectorAll('.profile-section .chip, .chips .chip').forEach(el => linkChip(el, aliases));
    document.querySelectorAll('.bio-fact strong, .fact strong, .profile-section p, .bio-panel p').forEach(el => linkTextContainer(el, aliases));
    if (!document.getElementById('auto-profile-link-style')) {
      const style=document.createElement('style'); style.id='auto-profile-link-style';
      style.textContent='.inline-person-link{border:0;background:transparent;padding:0;margin:0;color:#74562f;font:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px;cursor:pointer}.inline-person-link:hover{color:#9b7747}.chip.person-link{cursor:pointer}.chip.person-link:hover{border-color:#b99053;background:#fff7ea}';
      document.head.appendChild(style);
    }
  }

  setTimeout(run,1600);
  const observer = new MutationObserver(() => { clearTimeout(window.__profileLinkTimer); window.__profileLinkTimer=setTimeout(run,120); });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();