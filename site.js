(function(){
  const DISCORD_INVITE = window.DISCORD_INVITE || "https://discord.gg/10000x";

  // Modal
  const bg = document.getElementById("modalBg");
  const openButtons = document.querySelectorAll("[data-open-discord='1']");
  const close = document.getElementById("closeModal");

  function showModal(){
    if(!bg) return;
    bg.style.display = "flex";
    bg.setAttribute("aria-hidden","false");
  }
  function hideModal(){
    if(!bg) return;
    bg.style.display = "none";
    bg.setAttribute("aria-hidden","true");
  }
  openButtons.forEach(b => b.addEventListener("click", showModal));
  close && close.addEventListener("click", hideModal);
  bg && bg.addEventListener("click", (e)=>{ if(e.target===bg) hideModal(); });
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") hideModal(); });

  // Toast (auto pop once per day)
  const toast = document.getElementById("discordToast");
  const toastClose = document.getElementById("toastClose");
  const toastJoin = document.getElementById("toastJoin");
  const ONE_DAY_MS = 24*60*60*1000;

  function getCookie(name){
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, value, ms){
    const d = new Date(Date.now()+ms);
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
  }

  function showToast(){
    if(!toast) return;
    toast.style.display = "block";
  }
  function hideToast(){
    if(!toast) return;
    toast.style.display = "none";
  }

  toastClose && toastClose.addEventListener("click", ()=>{
    setCookie("discord_toast_hide","1",ONE_DAY_MS);
    hideToast();
  });
  toastJoin && toastJoin.addEventListener("click", ()=>{
    setCookie("discord_toast_hide","1",ONE_DAY_MS);
    hideToast();
    showModal();
  });

  const hidden = getCookie("discord_toast_hide");
  if(!hidden){
    setTimeout(showToast, 450);
  }

  // Inject invite
  const modalLink = document.getElementById("discordInviteLink");
  const modalCode = document.getElementById("discordInviteCode");
  if(modalLink) modalLink.href = DISCORD_INVITE;
  if(modalCode) modalCode.textContent = DISCORD_INVITE;

  // Heatmap fullscreen
  const fsBtn = document.getElementById("fullscreenBtn");
  const hmWrap = document.getElementById("heatmapWrap");
  if(fsBtn && hmWrap){
    fsBtn.addEventListener("click", async ()=>{
      try{
        if(document.fullscreenElement){
          await document.exitFullscreen();
        }else{
          await hmWrap.requestFullscreen();
        }
      }catch(e){}
    });
  }
})();
