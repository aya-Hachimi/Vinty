// Chatbot : panneau toujours visible dans la colonne de droite (#botpanel), appelé par home.js
function initBot() {
  const hist = [];
  $('botpanel').innerHTML = `
    <div class="bh" data-i18n="bot_title"></div>
    <div id="botmsgs"></div>
    <div class="bf"><input id="botin" data-ph="bot_ph" autocomplete="off">
      <button id="botsend" aria-label="${esc(t('send'))}">↑</button></div>`;

  const add = (txt, cls) => {
    const d = document.createElement('div'); d.className = 'b ' + cls; d.textContent = txt;
    $('botmsgs').appendChild(d); $('botmsgs').scrollTop = 1e9; return d;
  };
  add(t('bot_hi'), 'a');

  async function send() {
    const v = $('botin').value.trim(); if (!v) return;
    $('botin').value = ''; add(v, 'u'); hist.push({ role: 'user', content: v });
    const wait = add('…', 'a');
    try {
      const j = await post('chatbot.php', { history: hist });
      wait.textContent = j.reply || '...';
      hist.push({ role: 'assistant', content: JSON.stringify({ reply: j.reply, filters: j.filters || {} }) });
      const f = j.filters || {};
      if (window.applyFilters && (f.q || f.category || f.city || f.max_price)) window.applyFilters(f);
    } catch (e) { wait.textContent = t('error'); hist.pop(); }
  }
  $('botsend').onclick = send;
  $('botin').onkeydown = e => { if (e.key === 'Enter') send(); };
}
