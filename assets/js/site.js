(function(){
  const DISCORD_INVITE = window.DISCORD_INVITE || "https://discord.gg/10000x";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  function getCookie(name){
    const m = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\\\/\\+^])/g, '\\$1') + '=([^;]*)')
    );
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, ms){
    const d = new Date(Date.now() + ms);
    document.cookie =
      name + "=" + encodeURIComponent(value) +
      "; expires=" + d.toUTCString() +
      "; path=/; SameSite=Lax";
  }

  // Modal elements
  const bg = document.getElementById("modalBg");
  const closeBtn = document.getElementById("closeModal");
  const openButtons = document.querySelectorAll("[data-open-discord='1']");

  function showModal(){
    if(!bg) return;
    bg.style.display = "flex";
    bg.setAttribute("aria-hidden", "false");
  }

  function hideModal(){
    if(!bg) return;
    bg.style.display = "none";
    bg.setAttribute("aria-hidden", "true");
  }

  // Bind modal open/close safely (no null errors)
  openButtons.forEach(btn => btn.addEventListener("click", showModal));
  if(closeBtn) closeBtn.addEventListener("click", hideModal);

  if(bg){
    bg.addEventListener("click", (e)=>{
      if(e.target === bg) hideModal();
    });
  }

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") hideModal();
  });

  // Inject invite URL into modal
  const modalLink = document.getElementById("discordInviteLink");
  const modalCode = document.getElementById("discordInviteCode");
  if(modalLink) modalLink.href = DISCORD_INVITE;
  if(modalCode) modalCode.textContent = DISCORD_INVITE;

  // Auto-open modal for new visitors (once per day)
  const seen = getCookie("discord_modal_seen");
  if(!seen){
    setTimeout(showModal, 500);
    setCookie("discord_modal_seen", "1", ONE_DAY_MS);
  }

  // Fullscreen support (only on heatmap.html if button exists)
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
