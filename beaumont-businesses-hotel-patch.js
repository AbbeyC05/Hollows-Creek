(() => {
  const style = document.createElement('style');
  style.textContent = `
    .biz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px}
    .biz-card{background:#fffaf2;border:1px solid #dfd1bd;padding:24px;text-align:left;cursor:pointer;transition:.2s;min-height:180px;display:flex;flex-direction:column;justify-content:flex-end}
    .biz-card:hover{transform:translateY(-4px);border-color:#b99053}.biz-card small{font:10px Arial;text-transform:uppercase;letter-spacing:.14em;color:#9b7747}.biz-card strong{font:23px Georgia;font-weight:500;margin:7px 0}.biz-card p{font:13px/1.55 Arial;color:#6c635a;margin:0}
    .biz-owner-card{margin-top:18px;background:#17232d;color:#fff;border:1px solid #b99053;padding:25px}.biz-owner-card small{font:10px Arial;text-transform:uppercase;letter-spacing:.16em;color:#cfb58e}.biz-owner-card h3{font-size:30px;font-weight:500;margin:8px 0}.biz-owner-card p{font:14px/1.65 Arial;color:#ddd3c5}.biz-owner-card button{margin-top:12px;border:1px solid #b99053;background:transparent;color:#fff;padding:10px 14px;cursor:pointer;font:700 11px Arial;letter-spacing:.1em;text-transform:uppercase}
    .imperium-archive{max-width:1050px;margin:auto;padding:44px 26px 90px}.imperium-archive .facts{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:25px 0}.imperium-archive .factbox{background:#fffaf2;border:1px solid #dfd1bd;padding:18px}.imperium-archive .factbox small{display:block;font:10px Arial;text-transform:uppercase;letter-spacing:.14em;color:#9b7747}.imperium-archive .factbox strong{display:block;margin-top:6px;font-size:17px;font-weight:500}.visit-site{background:#17232d;color:white;border:1px solid #b99053;padding:15px 20px;cursor:pointer;font:700 12px Arial;text-transform:uppercase;letter-spacing:.14em}
    .imperium-site{background:#f7efe9;color:#402c2e;min-height:100vh;font-family:Arial,sans-serif}.imperium-nav{position:sticky;top:0;z-index:30;background:rgba(66,35,39,.96);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:18px 5vw;border-bottom:1px solid rgba(210,173,105,.55)}.imperium-logo{font:italic 26px Georgia}.imperium-logo b{font-style:normal;font-weight:400;color:#e8caa0}.imperium-navlinks{display:flex;gap:20px;font:11px Arial;letter-spacing:.12em;text-transform:uppercase}.imperium-nav button{border:1px solid #e8caa0;background:transparent;color:#fff;padding:9px 12px;cursor:pointer}
    .imperium-hero{min-height:70vh;display:grid;place-items:center;text-align:center;padding:70px 25px;background:radial-gradient(circle at 70% 20%,rgba(236,184,178,.65),transparent 28%),linear-gradient(135deg,#6e3f46,#3f272d 55%,#8c5a60);color:#fff}.imperium-hero .crest{width:74px;height:74px;margin:auto;border:1px solid #e8caa0;border-radius:50%;display:grid;place-items:center;font:34px Georgia;color:#f5dfbd}.imperium-hero h1{font:italic clamp(54px,8vw,104px) Georgia;margin:20px 0 10px;line-height:.9}.imperium-hero p{max-width:700px;margin:0 auto 25px;color:#f3e6e0;font:16px/1.7 Arial}.imperium-cta{border:1px solid #e8caa0;background:#f1d7c9;color:#4b2d33;padding:13px 20px;font:700 11px Arial;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
    .imperium-section{max-width:1120px;margin:auto;padding:70px 28px}.imperium-section .eyebrow{font:10px Arial;letter-spacing:.2em;text-transform:uppercase;color:#9a6d63}.imperium-section h2{font:italic 46px Georgia;font-weight:500;margin:9px 0 15px;color:#4c3035}.imperium-section>p{max-width:760px;font:15px/1.75 Arial;color:#725c58}.imperium-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:30px}.imperium-tile{min-height:250px;border:1px solid #d8b7aa;background:linear-gradient(165deg,#f6e2d8,#e7c6bc);padding:25px;display:flex;flex-direction:column;justify-content:flex-end}.imperium-tile:nth-child(2){background:linear-gradient(165deg,#efe3d6,#d9b79f)}.imperium-tile:nth-child(3){background:linear-gradient(165deg,#e8d2ce,#cda7a4)}.imperium-tile small{font:10px Arial;letter-spacing:.15em;text-transform:uppercase;color:#895f5b}.imperium-tile h3{font:30px Georgia;font-weight:500;margin:8px 0}.imperium-tile p{font:13px/1.55 Arial;color:#6b5653;margin:0}.imperium-band{background:#4a2d33;color:#fff;padding:55px 6vw;text-align:center}.imperium-band h2{font:italic 42px Georgia;margin:0 0 10px}.imperium-band p{font:14px/1.65 Arial;color:#ecdeda;max-width:700px;margin:0 auto 18px}.imperium-footer{padding:35px 6vw;background:#2f1f23;color:#d8c6c0;display:flex;justify-content:space-between;gap:20px;font:11px/1.6 Arial}.imperium-footer strong{font:20px Georgia;color:white;font-weight:500}
    @media(max-width:800px){.biz-grid,.imperium-tiles{grid-template-columns:1fr}.imperium-archive .facts{grid-template-columns:1fr 1fr}.imperium-navlinks{display:none}.imperium-footer{flex-direction:column}}
  `;
  document.head.appendChild(style);

  function addPages(){
    if(!document.getElementById('businesses')){
      const p=document.createElement('section');p.id='businesses';p.className='page';p.innerHTML=`
        <div class="section-hero"><div class="crumb">Hollow's Creek → Businesses</div><h2>Businesses</h2><p>Companies, brands, venues and ventures connected to the people of Hollow's Creek.</p></div>
        <div class="wrap"><div class="biz-grid">
          <button class="biz-card" onclick="showPage('imperiumArchive')"><small>Hospitality • Open since 1994</small><strong>Beaumont Imperium Hotel</strong><p>Luxury hospitality in Hollow's Creek, owned by Rebecca Beaumont.</p></button>
          <button class="biz-card" disabled><small>Coming next</small><strong>RB Music Academy</strong><p>Rebecca Beaumont's music academy.</p></button>
          <button class="biz-card" disabled><small>Coming next</small><strong>RB Music Publishing</strong><p>Songwriting and publishing venture.</p></button>
          <button class="biz-card" disabled><small>Coming next</small><strong>Beaumont Studios</strong><p>Recording, rehearsal and creative studios.</p></button>
        </div><button class="back" onclick="showPage('home')">← Back</button></div>`;
      document.body.appendChild(p);
    }
    if(!document.getElementById('imperiumArchive')){
      const p=document.createElement('section');p.id='imperiumArchive';p.className='page';p.innerHTML=`
        <div class="profile-head"><div class="crumb">Businesses → Hospitality</div><div class="aka">Business Archive</div><h2>Beaumont Imperium Hotel</h2></div>
        <main class="imperium-archive"><p style="font:16px/1.75 Arial;color:#625d56">A luxury Hollow's Creek hotel owned by Rebecca Beaumont. The hotel has been operating since 1994 and forms part of Rebecca's growing business portfolio alongside her music ventures.</p>
        <div class="facts"><div class="factbox"><small>Owner</small><strong>Rebecca Beaumont</strong></div><div class="factbox"><small>Opened</small><strong>1994</strong></div><div class="factbox"><small>Location</small><strong>Hollow's Creek</strong></div><div class="factbox"><small>Industry</small><strong>Luxury Hospitality</strong></div></div>
        <section class="profile-section"><h3>Brand</h3><p>The Imperium presents itself as polished, romantic and high-end, using soft rose, cream, deep wine and warm gold accents. Its public image balances Beaumont prestige with a more intimate boutique-hotel atmosphere.</p></section>
        <button class="visit-site" onclick="showPage('imperiumWebsite')">Visit Hotel Website →</button> <button class="back" onclick="showPage('businesses')">← Back to Businesses</button></main>`;
      document.body.appendChild(p);
    }
    if(!document.getElementById('imperiumWebsite')){
      const p=document.createElement('section');p.id='imperiumWebsite';p.className='page imperium-site';p.innerHTML=`
        <div class="imperium-nav"><div class="imperium-logo">Beaumont <b>Imperium</b></div><div class="imperium-navlinks"><span>Stay</span><span>Dine</span><span>Events</span><span>Gallery</span><span>Our Story</span></div><button onclick="showPage('imperiumArchive')">Archive ↗</button></div>
        <section class="imperium-hero"><div><div class="crest">BI</div><div style="font:11px Arial;letter-spacing:.25em;text-transform:uppercase;color:#e8caa0;margin-top:18px">Hollow's Creek • Est. 1994</div><h1>Imperium</h1><p>A Beaumont hotel created for elegant stays, unforgettable celebrations and the kind of evenings you never quite want to end.</p><button class="imperium-cta">Explore Your Stay</button></div></section>
        <section class="imperium-section"><div class="eyebrow">Welcome to the Imperium</div><h2>Luxury, the Beaumont way.</h2><p>Set in Hollow's Creek, the Beaumont Imperium combines classic glamour with warm, personal hospitality. From private stays to grand celebrations, every part of the hotel is designed to feel polished without ever feeling cold.</p><div class="imperium-tiles"><div class="imperium-tile"><small>Stay</small><h3>Rooms & Suites</h3><p>Elegant rooms, statement suites and quiet spaces designed for long weekends and special occasions.</p></div><div class="imperium-tile"><small>Dine</small><h3>The Rose Dining Room</h3><p>Refined dining in a romantic setting, with private tables and evening service.</p></div><div class="imperium-tile"><small>Celebrate</small><h3>Weddings & Events</h3><p>From intimate dinners to full-scale Beaumont celebrations, with dedicated event spaces and planning.</p></div></div></section>
        <section class="imperium-band"><h2>Make Hollow's Creek your escape.</h2><p>Stay for the night, celebrate something important, or simply disappear into a little luxury for the weekend.</p><button class="imperium-cta">Enquire</button></section>
        <footer class="imperium-footer"><div><strong>Beaumont Imperium</strong><br>Hollow's Creek<br>Established 1994</div><div>Owned by Rebecca Beaumont<br>Luxury Hotel • Dining • Events</div><div>© 1995 Beaumont Imperium Hotel</div></footer>`;
      document.body.appendChild(p);
    }
  }

  function addNavigation(){
    const dir=document.querySelector('.directory');
    if(dir && !dir.querySelector('[data-business-card]')){
      const b=document.createElement('button');b.className='card';b.dataset.businessCard='1';b.onclick=()=>showPage('businesses');b.innerHTML='<strong>Businesses</strong><small>Companies, brands & venues</small>';dir.appendChild(b);
    }
    const top=document.querySelector('.topbar');
    if(top && !top.querySelector('[data-business-nav]')){
      const b=document.createElement('button');b.dataset.businessNav='1';b.textContent='Businesses';b.onclick=()=>showPage('businesses');top.appendChild(b);
    }
  }

  function addBeccaBusinessLink(){
    const page=document.getElementById('beccaProfile');if(!page||page.querySelector('[data-becca-businesses]'))return;
    const main=page.querySelector('.becca-profile')||page.querySelector('main')||page;
    const sec=document.createElement('section');sec.className='profile-section';sec.dataset.beccaBusinesses='1';sec.innerHTML=`<h3>Businesses & Ventures</h3><div class="biz-grid"><button class="biz-card" onclick="showPage('imperiumArchive')"><small>Hospitality • 1994</small><strong>Beaumont Imperium Hotel</strong><p>Owner</p></button><button class="biz-card" onclick="showPage('businesses')"><small>Music</small><strong>View all businesses</strong><p>Academy, publishing, studios and more.</p></button></div>`;
    const back=main.querySelector('button.back');back?back.before(sec):main.appendChild(sec);
  }

  function init(){if(typeof window.showPage!=='function')return setTimeout(init,100);addPages();addNavigation();addBeccaBusinessLink();}
  init();
})();