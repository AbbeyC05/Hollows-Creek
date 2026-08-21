(()=>{
const s=document.createElement('style');s.textContent=`
.csu-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin:28px 0}.csu-card{background:#f9fbf8;border:1px solid #c9d5cc;padding:16px}.csu-card img{width:100%;aspect-ratio:3/4;object-fit:contain;display:block;background:#eef1ed}.csu-card h3{margin:14px 0 5px;font:24px Georgia;color:#20362d}.csu-card p{font:13px/1.6 Arial;color:#626d65}.csu-title{margin-top:42px;font:32px Georgia;color:#20362d}@media(max-width:700px){.csu-grid{grid-template-columns:1fr}}
`;document.head.appendChild(s);
function go(){
  const school=document.getElementById('creeksideHigh');
  if(!school)return;
  const nav=school.querySelector('.cr-nav');
  if(nav&&!nav.querySelector('[data-csu]')){
    const b=document.createElement('button');
    b.dataset.csu='1';
    b.textContent='Uniform';
    b.onclick=()=>showPage('creeksideUniform');
    const back=nav.querySelector('.back');
    if(back)nav.insertBefore(b,back);else nav.appendChild(b);
  }
  if(document.getElementById('creeksideUniform'))return;
  const p=document.createElement('section');
  p.id='creeksideUniform';
  p.className='page creek';
  p.innerHTML=`<div class="cr-nav"><div class="cr-logo">CREEKSIDE HIGH<small>HOLLOW'S CREEK • SOUTHSIDE</small></div><button onclick="showPage('creeksideHigh')">Home</button><button onclick="showPage('creekAcademics')">Academics</button><button onclick="showPage('creekCampus')">Campus</button><button onclick="showPage('creekLife')">Student Life</button><button onclick="showPage('creekAdmissions')">Joining Creekside</button><button data-csu="1" onclick="showPage('creeksideUniform')">Uniform</button><button class="back" onclick="showPage('schools')">Schools ↗</button></div><div class="cr-head"><div class="cr-kicker">CREEKSIDE HIGH</div><h1>School & sports uniform</h1><p class="cr-lead">Creekside's navy and blue uniforms are practical, recognisable and very much part of southside school life.</p></div><section class="cr-section"><h2 class="csu-title">School uniform</h2><div class="csu-grid"><article class="csu-card"><img src="creekside-uniform-girls.svg"><h3>Skirt uniform</h3><p>Navy blazer with Creekside shark crest, white shirt, blue striped tie and navy pleated skirt.</p></article><article class="csu-card"><img src="creekside-uniform-boys.svg"><h3>Trouser uniform</h3><p>Navy blazer with Creekside shark crest, white shirt, blue striped tie and navy trousers.</p></article></div><h2 class="csu-title">Sports uniforms</h2><div class="csu-grid"><article class="csu-card"><img src="creekside-cheer.svg"><h3>Cheer uniform</h3><p>Creekside blue cheer top and pleated skirt with white shark branding.</p></article><article class="csu-card"><img src="creekside-pe.svg"><h3>PE kit</h3><p>Blue Creekside sports shirt and shorts for PE and general training.</p></article><article class="csu-card"><img src="creekside-football-kit.svg"><h3>Football kit</h3><p>Numbered blue match shirt, blue shorts and white socks.</p></article><article class="csu-card"><img src="creekside-varsity-front.svg"><h3>Football varsity jacket</h3><p>Navy and white varsity jacket with Creekside High and shark insignia.</p></article><article class="csu-card"><img src="creekside-varsity-back.svg"><h3>Varsity jacket — back</h3><p>Creekside Football lettering across the back.</p></article></div></section><div class="cr-footer"><span>CREEKSIDE HIGH • HOLLOW'S CREEK</span><span>SOUTHSIDE • COMMUNITY SCHOOL</span></div>`;
  document.body.appendChild(p);
}
go();setTimeout(go,500);setTimeout(go,1300);
})();