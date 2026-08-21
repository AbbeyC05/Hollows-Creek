(()=>{
function buildSchools(){
 let p=document.getElementById('schools');
 if(!p){p=document.createElement('section');p.id='schools';document.body.appendChild(p)}
 p.className='page places-page';
 p.innerHTML=`<div class="pl-nav"><div class="pl-brand">SCHOOLS<small>HOLLOW'S CREEK ARCHIVE</small></div><button class="archive" onclick="showPage('home')">Hollow's Creek ↗</button></div><div class="pl-hero"><div class="pl-kicker">HOLLOW'S CREEK • EDUCATION</div><h1>Schools</h1><p>The schools, academies and educational institutions that shape student life across Hollow's Creek.</p></div><main class="pl-wrap"><div class="pl-kicker">HOLLOW'S CREEK • AGES 11–18</div><h2 style="font:40px Georgia;font-weight:400;margin:9px 0">Explore the schools.</h2><div class="pl-grid"><article class="pl-card"><small>Northside • Ages 11–18</small><h3>L. Beaumont Preparatory</h3><p>A prestigious northside school with a strong academic, arts and sporting reputation. Elite in culture and expectations, but neither private nor boarding.</p><button onclick="showPage('lBeaumontPrep')">VISIT SCHOOL →</button></article><article class="pl-card"><small>Southside • Secondary School</small><h3>Creekside High</h3><p>A busy southside community school known for strong friendships, loud corridors, competitive sport and a more grounded school culture.</p><button onclick="showPage('creeksideHigh')">VISIT SCHOOL →</button></article></div></main>`;
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
 document.querySelectorAll('.lbp-nav .back,.csh-nav .back').forEach(b=>{b.textContent='Schools ↗';b.onclick=()=>showPage('schools')});
}
install();setTimeout(install,100);setTimeout(install,600);
})();