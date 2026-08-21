(()=>{
function buildSchools(){
 let p=document.getElementById('schools');
 if(!p){p=document.createElement('section');p.id='schools';document.body.appendChild(p)}
 p.className='page places-page';
 p.innerHTML=`<div class="pl-nav"><div class="pl-brand">SCHOOLS<small>HOLLOW'S CREEK ARCHIVE</small></div><button class="archive" onclick="showPage('home')">Hollow's Creek ↗</button></div><div class="pl-hero"><div class="pl-kicker">HOLLOW'S CREEK • EDUCATION</div><h1>Schools</h1><p>The schools, academies and educational institutions connected to student life in and around Hollow's Creek.</p></div><main class="pl-wrap"><div class="pl-kicker">PRIMARY SCHOOLS</div><h2 style="font:40px Georgia;font-weight:400;margin:9px 0">The younger years.</h2><div class="pl-grid"><article class="pl-card"><small>Northside • Primary School</small><h3>Beaumont Hall Primary</h3><p>A polished northside primary school focused on strong foundations, confidence, community and a calm start to school life.</p><button onclick="showPage('beaumontHallPrimary')">VISIT SCHOOL →</button></article><article class="pl-card"><small>Southside • Primary School</small><h3>Beaumont Early Academy</h3><p>A lively southside primary academy centred on nurturing younger learners through curiosity, creativity and active learning.</p><button onclick="showPage('beaumontEarlyAcademy')">VISIT SCHOOL →</button></article></div><div class="pl-kicker" style="margin-top:52px">SECONDARY & COLLEGE</div><h2 style="font:40px Georgia;font-weight:400;margin:9px 0">The next stage.</h2><div class="pl-grid"><article class="pl-card"><small>Northside • Ages 11–18</small><h3>L. Beaumont Preparatory</h3><p>A prestigious northside school with a strong academic, arts and sporting reputation. Elite in culture and expectations, but neither private nor boarding.</p><button onclick="showPage('lBeaumontPrep')">VISIT SCHOOL →</button></article><article class="pl-card"><small>Southside • Secondary School</small><h3>Creekside High</h3><p>A busy southside community school known for strong friendships, loud corridors, competitive sport and a more grounded school culture.</p><button onclick="showPage('creeksideHigh')">VISIT SCHOOL →</button></article><article class="pl-card"><small>Outside Hollow's Creek • College</small><h3>Red Water College</h3><p>A college beyond Hollow's Creek offering a more independent next stage of education and a wider student world outside the town.</p><button onclick="showPage('redWaterCollege')">VISIT COLLEGE →</button></article></div><div class="pl-kicker" style="margin-top:52px">UNIVERSITY</div><h2 style="font:40px Georgia;font-weight:400;margin:9px 0">Beyond college.</h2><div class="pl-grid"><article class="pl-card"><small>Just outside Hollow's Creek • University</small><h3>St. Aurelia University</h3><p>A prestigious university combining historic collegiate architecture, modern faculties, student residences and a large independent campus.</p><button onclick="showPage('stAureliaUniversity')">VISIT UNIVERSITY →</button></article></div></main>`;
}
function install(){
 buildSchools();
 const home=document.getElementById('home');
 if(home){
  const cards=[...home.querySelectorAll('.card,button')];
  const places=cards.find(x=>(x.querySelector('strong')?.textContent||'').trim()==='Places');
  if(places)places.onclick=null;
  const schools=cards.find(x=>(x.querySelector('strong')?.textContent||'').trim()==='Schools');
  if(schools)schools.onclick=()=>showPage('schools');
 }
 document.querySelectorAll('.lbp-nav .back,.csh-nav .back,.cr-nav .back,.ps-nav .back,.sau-nav .back').forEach(b=>{b.textContent='Schools ↗';b.onclick=()=>showPage('schools')});
}
install();setTimeout(install,100);setTimeout(install,600);
})();