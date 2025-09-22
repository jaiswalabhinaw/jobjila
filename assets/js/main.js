/* filepath: c:\Users\Abhinaw Jaiswal\Desktop\multireal\single-file-web-app\assets\js\main.js */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // simple header buttons (placeholders)
  const brokerBtn = document.getElementById("brokerLogin");
  const buyerBtn = document.getElementById("buyerLogin");
  const createBtn = document.getElementById("createProfile");
  const brokerBtnM = document.getElementById("brokerLoginMobile");
  const buyerBtnM = document.getElementById("buyerLoginMobile");
  const createBtnM = document.getElementById("createProfileMobile");

  function onBrokerLogin(){ alert("Broker login - implement flow"); }
  function onBuyerLogin(){ alert("Buyer login - implement flow"); }
  function onCreateProfile(){ alert("Create profile - implement flow"); }

  if(brokerBtn) brokerBtn.addEventListener("click", onBrokerLogin);
  if(buyerBtn) buyerBtn.addEventListener("click", onBuyerLogin);
  if(createBtn) createBtn.addEventListener("click", onCreateProfile);
  if(brokerBtnM) brokerBtnM.addEventListener("click", onBrokerLogin);
  if(buyerBtnM) buyerBtnM.addEventListener("click", onBuyerLogin);
  if(createBtnM) createBtnM.addEventListener("click", onCreateProfile);

  // menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if(menuToggle && mobileMenu){
    menuToggle.addEventListener("click", () => {
      const shown = mobileMenu.hidden === false;
      mobileMenu.hidden = shown ? true : false;
      menuToggle.setAttribute("aria-expanded", (!shown).toString());
    });
  }

  // tabs logic (search)
  const tabButtons = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");
  function activateTab(tabName){
    tabButtons.forEach(b => {
      const isActive = b.dataset.tab === tabName;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    panels.forEach(p => {
      const shouldShow = p.id === "tab-" + tabName;
      p.classList.toggle("hidden", !shouldShow);
      p.setAttribute("aria-hidden", (!shouldShow).toString());
    });
  }
  tabButtons.forEach(b => b.addEventListener("click", ()=> activateTab(b.dataset.tab)));

  // unified search form handlers (placeholders)
  const unifiedForm = document.getElementById("unifiedSearchForm");
  if(unifiedForm){
    unifiedForm.addEventListener("submit", e => {
      e.preventDefault();
      const active = document.querySelector(".tab-button.active")?.dataset.tab || "broker";
      alert("Search ("+active+") - implement API");
    });
  }

  // PREMIUM HERO: load from localStorage or seed sample
  const PREMIUM_KEY = "premiumBrokers";
  const premiumListEl = document.getElementById("premiumList");
  const brokerModal = document.getElementById("brokerModal");
  const brokerModalContent = document.getElementById("brokerModalContent");
  const closeBrokerModal = document.getElementById("closeBrokerModal");

  function seedIfEmpty(){
    try{
      const cur = JSON.parse(localStorage.getItem(PREMIUM_KEY) || "[]");
      if(Array.isArray(cur) && cur.length>0) return;
    }catch{}
    const sample = [
      {
        id: "ravi-1",
        name: "Ravi Verma",
        phone: "919987654321",
        city: "Ghaziabad",
        sector: "Indirapuram",
        photoUrl: "",
        bio: "Residential & commercial deals",
        rating: 4.5,
        verified: true,
        featured: []
      },
      {
        id: "sudha-2",
        name: "Sudha Sharma",
        phone: "919812345678",
        city: "Noida",
        sector: "Sector 62",
        photoUrl: "",
        bio: "Expert in rentals and investments",
        rating: 4.8,
        verified: false,
        featured: []
      }
    ];
    localStorage.setItem(PREMIUM_KEY, JSON.stringify(sample));
  }

  function escapeHTML(s=""){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function maskPhone(p=""){ if(!p) return "—"; return String(p).replace(/(\d{3})\d{4}(\d{2,})/,"$1****$2"); }

  function loadPremium(){ try{ const d = JSON.parse(localStorage.getItem(PREMIUM_KEY) || "[]"); return Array.isArray(d)?d:[] }catch{return []} }

  // PREMIUM SPOTLIGHT: show one broker at a time and rotate with fade
  const ROTATE_MS = 3500; // rotation interval
  function buildPremiumCardHTML(b){
    return `
      <article class="broker-card-hero">
        <div class="broker-photo-hero">${escapeHTML((b.name||"").split(" ").map(n=>n[0]||"").slice(0,2).join(""))}</div>
        <div class="broker-main">
          <div class="broker-row">
            <h3 class="broker-name-hero">${escapeHTML(b.name||"Unnamed")}</h3>
            <span class="broker-badge">Broker</span>
          </div>
          <div class="broker-rating">${escapeHTML((b.rating||0).toFixed(1))}</div>
          <div class="phone-pill">${b.verified ? escapeHTML(b.phone||"") : maskPhone(b.phone||"")}</div>
          <div class="broker-meta-hero">${escapeHTML(b.city||"")}${b.sector? "  "+escapeHTML(b.sector): ""}</div>
          <div class="broker-meta-hero">${escapeHTML(b.bio||"")}</div>
          <div class="featured-title">Featured properties</div>
          <div class="broker-actions-hero">
            <button class="btn btn-primary" data-id="${escapeHTML(b.id)}" data-action="view">View Profile</button>
            <button class="btn btn-ghost" data-id="${escapeHTML(b.id)}" data-action="whatsapp">WhatsApp</button>
          </div>
        </div>
      </article>
    `;
  }

  let rotateTimer = null;
  function showPremiumAt(index){
    if(!premiumListEl) return;
    const items = loadPremium();
    if(!items.length){
      premiumListEl.innerHTML = "<div class='premium-empty'>No premium brokers yet.</div>";
      return;
    }
    const i = ((index % items.length) + items.length) % items.length;
    // fade out, swap, fade in
    premiumListEl.style.transition = premiumListEl.style.transition || "opacity 400ms ease";
    premiumListEl.style.opacity = "0";
    setTimeout(() => {
      premiumListEl.innerHTML = buildPremiumCardHTML(items[i]);
      premiumListEl.style.opacity = "1";
    }, 200);
  }

  function startPremiumRotation(){
    if(!premiumListEl) return;
    let i = 0;
    showPremiumAt(i++);
    if(rotateTimer) clearInterval(rotateTimer);
    rotateTimer = setInterval(() => showPremiumAt(i++), ROTATE_MS);
  }

  // delegated actions (view / whatsapp)
  premiumListEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    const broker = loadPremium().find(x => String(x.id) === String(id));
    if(!broker) return;
    if(action === "view"){
      brokerModalContent.innerHTML = `
        <div style="display:flex;gap:14px;align-items:flex-start">
          <div style="flex:0 0 88px;border-radius:10px;background:#eef9f1;display:flex;align-items:center;justify-content:center;font-weight:800;padding:18px">${escapeHTML((broker.name||"").split(" ").map(n=>n[0]||"").slice(0,2).join(""))}</div>
          <div style="flex:1">
            <h3 style="margin:0 0 6px">${escapeHTML(broker.name||"Unnamed")}</h3>
            <div style="color:#6b7280">${escapeHTML(broker.city||"")}${broker.sector? "  "+escapeHTML(broker.sector): ""}</div>
            <div style="margin-top:8px">Phone: ${broker.verified?escapeHTML(broker.phone||""):maskPhone(broker.phone||"")}</div>
            <p style="margin-top:10px">${escapeHTML(broker.bio||"")}</p>
          </div>
        </div>
      `;
      brokerModal.hidden = false;
      brokerModal.setAttribute("aria-hidden", "false");
    } else if(action === "whatsapp"){
      const phone = broker.phone || "";
      // placeholder: open WA link if phone present
      if(!phone){ alert("Phone not available"); return; }
      const wa = "https://wa.me/" + encodeURIComponent(phone.replace(/\D/g,""));
      window.open(wa, "_blank");
    }
  });

  // close modal
  document.getElementById("closeBrokerModal")?.addEventListener("click", () => {
    brokerModal.hidden = true;
    brokerModal.setAttribute("aria-hidden", "true");
    brokerModalContent.innerHTML = "";
  });

  // seed sample data and start spotlight
  seedIfEmpty();
  startPremiumRotation();
});
