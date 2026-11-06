const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let LANG = localStorage.lang || 'fr', T = {};
const t = k => T[k] ?? k;

// Appel API : renvoie du JSON ; si la session a expiré (401) -> retour à la page de login
async function API(path, opt = {}) {
  const r = await fetch('api/' + path, opt);
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && !location.pathname.endsWith('login.html')) location = 'login.html';
  return j;
}
const post = (path, data) => API(path, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });

// Langues : fichiers lang/fr.json, en.json, ar.json (l'arabe passe la page en RTL)
async function setLang(l) {
  T = await fetch('lang/' + l + '.json').then(r => r.json());
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  applyI18n();
}
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll('[data-ph]').forEach(e => e.placeholder = t(e.dataset.ph));
}

// En-tête commun : logo | + (centre) | chat, compte, langue
async function header() {
  const me = await API('auth.php?action=me');
  if (!me.id) return;
  $('top').innerHTML = `
    <a class="logo" href="index.html">Vinty</a>
    <a class="plus" href="add-ad.html" title="+" aria-label="+">+</a>
    <div class="hr">
      <a class="chatbtn" href="messages.html">💬 <span data-i18n="messages"></span></a>
      <div class="profile">
        <button class="avatar" id="pbtn" title="${esc(me.name)}">${esc(me.name.trim().charAt(0).toUpperCase())}</button>
        <div id="pmenu" hidden>
          <div class="pname">${esc(me.name)}</div>
          <a href="index.html?view=favorites" data-i18n="favorites"></a>
          <a href="index.html?view=history" data-i18n="history"></a>
          <a href="#" id="out" data-i18n="logout"></a>
        </div>
      </div>
      <select id="lang"><option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option></select>
    </div>`;
  $('lang').value = LANG;
  $('lang').onchange = () => { localStorage.lang = $('lang').value; location.reload(); };
  $('pbtn').onclick = () => $('pmenu').hidden = !$('pmenu').hidden;
  document.addEventListener('click', e => { if (!e.target.closest('.profile')) $('pmenu').hidden = true; });
  $('out').onclick = async e => { e.preventDefault(); await API('auth.php?action=logout'); location = 'login.html'; };
}
async function boot() { await setLang(LANG); await header(); applyI18n(); }
