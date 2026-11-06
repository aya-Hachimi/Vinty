let cat = '', mp = '', names = {}, view = new URLSearchParams(location.search).get('view') || '';
boot().then(init);

async function init() {
  const [cats, cities, trend] = await Promise.all([API('data.php'), API('data.php?what=cities'), API('data.php?what=trending')]);
  cats.forEach(c => { names[c.id] = c.name; c.subs.forEach(s => names[s.id] = s.name); });

  $('city').innerHTML = `<option value="">${esc(t('all_cities'))}</option>` + cities.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
  $('tree').innerHTML = cats.map(c => `<div><button class="mcb">${esc(c.name)} ▾</button><div class="subs" hidden>
      <a href="#" data-cat="${c.id}">${esc(t('all'))} — ${esc(c.name)}</a>
      ${c.subs.map(s => `<a href="#" data-cat="${s.id}">${esc(s.name)}</a>`).join('')}</div></div>`).join('');
  $('trend').innerHTML = trend.map(c => `<button class="tile" data-cat="${c.id}">${esc(c.name)}</button>`).join('');

  $('catBtn').onclick = () => $('side').hidden = false;
  $('sideclose').onclick = () => $('side').hidden = true;
  $('tree').onclick = e => {
    const b = e.target.closest('.mcb');                                  // clic sur une catégorie principale : montre ses sous-catégories
    if (b) { b.nextElementSibling.hidden = !b.nextElementSibling.hidden; return; }
    const a = e.target.closest('[data-cat]');
    if (a) { e.preventDefault(); setCat(a.dataset.cat); $('side').hidden = true; view = ''; load(); }
  };
  $('trend').onclick = e => { const b = e.target.closest('[data-cat]'); if (b) { setCat(b.dataset.cat); view = ''; load(); } };
  $('go').onclick = () => { mp = ''; view = ''; load(); };
  $('q').onkeydown = e => { if (e.key === 'Enter') $('go').click(); };
  $('grid').onclick = async e => {
    const h = e.target.closest('.heart'); if (!h) return;
    const r = await post('ads.php?action=fav', { ad_id: h.dataset.id });
    h.classList.toggle('on', r.fav == 1);
  };
  initBot();
  applyI18n();
  load();
}

function setCat(id) { cat = id || ''; $('catBtn').textContent = cat ? (names[cat] || t('categories')) : t('categories'); }

const card = a => `<div class="card"><a href="ad.html?id=${a.id}">
  ${a.image ? `<img src="${esc(a.image)}" alt="">` : '<div class="noimg">📦</div>'}
  <div class="info"><b>${Number(a.price).toLocaleString()} MAD</b><p>${esc(a.title)}</p><small>${esc(a.city)}</small></div></a>
  <button class="heart ${a.fav == 1 ? 'on' : ''}" data-id="${a.id}" aria-label="${esc(t('save'))}">♥</button></div>`;

async function load() {
  let url = 'ads.php?action=list&' + new URLSearchParams({ q: $('q').value, category: cat, city: $('city').value, max_price: mp });
  if (view === 'favorites' || view === 'history') url = 'ads.php?action=' + view;
  $('title').textContent = (view === 'favorites' || view === 'history') ? t(view) : t('latest');
  const ads = await API(url);
  $('grid').innerHTML = Array.isArray(ads) && ads.length ? ads.map(card).join('') : `<p>${esc(t('no_results'))}</p>`;
}

// Appelée par le chatbot : remplit les filtres et lance la recherche
window.applyFilters = f => {
  $('q').value = f.q || '';
  setCat(f.category);
  $('city').value = f.city || '';
  mp = f.max_price || ''; view = '';
  load();
};
