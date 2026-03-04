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

// Show modal for new visitors (once per day)
const ONE_DAY = 24 * 60 * 60 * 1000;

function getCookie(name){
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\\\/\\+^])/g, '\\$1') + '=([^;]*)')
  );
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name,value,ms){
  const d = new Date(Date.now()+ms);
  document.cookie = name + "=" + encodeURIComponent(value) +
    "; expires=" + d.toUTCString() +
    "; path=/; SameSite=Lax";
}

const visited = getCookie("discord_modal_seen");

if(!visited){
  setTimeout(()=>{
    showModal();
  },500);

  setCookie("discord_modal_seen","1",ONE_DAY);
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
