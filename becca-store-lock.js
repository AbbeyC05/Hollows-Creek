(function(){
  var storeIds=['beccaStoreWebsite','storeMusic'];
  var reloading=false;
  function loadOverride(){
    if(reloading) return;
    reloading=true;
    var s=document.createElement('script');
    s.src='becca-store-force-override.js?v=4-'+Date.now();
    s.onload=function(){reloading=false;attach();};
    s.onerror=function(){reloading=false;};
    document.body.appendChild(s);
  }
  function attach(){
    storeIds.forEach(function(id){
      var el=document.getElementById(id);
      if(!el || el.dataset.storeLockAttached==='1') return;
      el.dataset.storeLockAttached='1';
      new MutationObserver(function(){
        if(!el.classList.contains('becca-real-store')) loadOverride();
      }).observe(el,{attributes:true,attributeFilter:['class']});
    });
  }
  attach();
  setTimeout(function(){
    var home=document.getElementById('beccaStoreWebsite');
    if(home && !home.classList.contains('becca-real-store')) loadOverride();
    else loadOverride();
  },1400);
  setTimeout(function(){
    var home=document.getElementById('beccaStoreWebsite');
    if(home && !home.classList.contains('becca-real-store')) loadOverride();
  },2600);
})();