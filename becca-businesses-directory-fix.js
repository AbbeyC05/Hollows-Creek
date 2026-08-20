(() => {
  function installBusinessDirectory(){
    const page=document.getElementById('businesses');
    if(!page) return;
    page.innerHTML=`
      <div class="section-hero">
        <div class="crumb">Hollow's Creek → Businesses</div>
        <h2>Businesses</h2>
        <p>Companies, brands, venues and creative ventures connected to the people of Hollow's Creek.</p>
      </div>
      <div class="wrap">
        <div class="biz-grid">
          <button class="biz-card" onclick="showPage('imperiumArchive')"><small>Hospitality • Est. 1994</small><strong>Beaumont Imperium Hotel</strong><p>Rebecca Beaumont's luxury Hollow's Creek hotel, dining, spa, wedding and events destination.</p></button>
          <button class="biz-card" onclick="showPage('rbmaArchive')"><small>Music Education</small><strong>Rebecca Beaumont Music Academy</strong><p>Accessible professional music tuition, scholarships, instruments, performance training and annual showcases.</p></button>
          <button class="biz-card" onclick="showPage('rbPublishingArchive')"><small>Publishing • Songwriting</small><strong>RB Music Publishing</strong><p>Songwriter development, publishing administration, catalogue management, sync and licensing.</p></button>
          <button class="biz-card" onclick="showPage('beaumontStudiosArchive')"><small>Recording • Production</small><strong>Beaumont Studios</strong><p>Professional recording, production, rehearsal and creative studios in Hollow's Creek.</p></button>
          <button class="biz-card" onclick="showPage('beccaStoreArchive')"><small>Rebecca Beaumont Music</small><strong>Rebecca Beaumont Official Store</strong><p>Official albums, apparel, tour merchandise, accessories, collectibles and fan merchandise.</p></button>
        </div>
        <button class="back" onclick="showPage('home')">← Back to Home</button>
      </div>`;
  }

  function linkBeccaProfile(){
    const ids=['rebeccaBeaumont','rebecca-beaumont','beccaProfile','rebeccaProfile'];
    let profile=ids.map(id=>document.getElementById(id)).find(Boolean);
    if(!profile){
      profile=[...document.querySelectorAll('.page')].find(el=>/Rebecca Rose Beaumont/i.test(el.textContent||'') && /profile/i.test(el.textContent||''));
    }
    if(!profile || profile.querySelector('[data-becca-businesses]')) return;
    const target=profile.querySelector('main,.profile-body,.profile-content,.wrap') || profile;
    const box=document.createElement('section');
    box.setAttribute('data-becca-businesses','true');
    box.style.margin='28px 0';
    box.innerHTML=`<h3 style="font:30px Georgia,serif;font-weight:400;margin:0 0 14px">Businesses</h3><div class="rb-archive-grid"><button class="rb-archive-card" onclick="showPage('imperiumArchive')"><small>Hospitality</small><strong>Beaumont Imperium Hotel</strong></button><button class="rb-archive-card" onclick="showPage('rbmaArchive')"><small>Music Education</small><strong>Rebecca Beaumont Music Academy</strong></button><button class="rb-archive-card" onclick="showPage('rbPublishingArchive')"><small>Publishing</small><strong>RB Music Publishing</strong></button><button class="rb-archive-card" onclick="showPage('beaumontStudiosArchive')"><small>Recording</small><strong>Beaumont Studios</strong></button><button class="rb-archive-card" onclick="showPage('beccaStoreArchive')"><small>Official Merchandise</small><strong>Rebecca Beaumont Official Store</strong></button></div>`;
    target.appendChild(box);
  }

  function run(){ installBusinessDirectory(); linkBeccaProfile(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(run,100),{once:true});
  else setTimeout(run,100);
  setTimeout(run,700);
})();