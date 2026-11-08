const UI = {
  title:{es:'Laboratorio de preparación',en:'Prep lab'},
  panel:{es:'Panel',en:'Dashboard'}, teoria:{es:'Teoría',en:'Theory'}, flashcards:{es:'Flashcards',en:'Flashcards'},
  practica:{es:'Práctica',en:'Practice'}, simulacro:{es:'Simulacro',en:'Mock exam'}, fallos:{es:'Fallos',en:'Mistakes'},
  all:{es:'Todos',en:'All'},
  readiness:{es:'Preparación estimada',en:'Estimated readiness'},
  readinessNote:{es:'Media de tus aciertos ponderada por el peso de cada dominio, en la escala del examen. La línea marca el aprobado (700).',en:'Your accuracy weighted by each domain’s exam weight, on the exam scale. The line marks the pass mark (700).'},
  noData:{es:'Aún no has respondido preguntas. Empieza por la teoría o lanza una práctica.',en:'You have not answered any questions yet. Start with the theory or launch a practice round.'},
  answered:{es:'Preguntas vistas',en:'Questions seen'}, accuracy:{es:'Acierto global',en:'Overall accuracy'},
  cardsKnown:{es:'Flashcards dominadas',en:'Flashcards mastered'}, pending:{es:'Fallos pendientes',en:'Pending mistakes'},
  bestSim:{es:'Mejor simulacro',en:'Best mock exam'},
  byTopic:{es:'Acierto por tema',en:'Accuracy by topic'}, topic:{es:'Tema',en:'Topic'}, seen:{es:'Vistas',en:'Seen'},
  sims:{es:'Últimos simulacros',en:'Recent mock exams'}, noSims:{es:'Todavía no has hecho ningún simulacro.',en:'No mock exams yet.'},
  startPractice:{es:'Practicar',en:'Practise'}, startSim:{es:'Empezar simulacro',en:'Start mock exam'},
  theoryLede:{es:'Resumen de cada punto del temario oficial (skills measured del 15 de abril de 2026), con el código que piden saber leer.',en:'Summary of every point in the official outline (skills measured as of 15 April 2026), with the code you are expected to read.'},
  fcLede:{es:'Pulsa la tarjeta para girarla. Marca las que ya dominas y repasa el resto.',en:'Tap the card to flip it. Mark the ones you know and review the rest.'},
  flipHint:{es:'pulsa para girar',en:'tap to flip'},
  know:{es:'La sé',en:'I know it'}, review:{es:'Repasar',en:'Review again'}, prev:{es:'Anterior',en:'Previous'}, next:{es:'Siguiente',en:'Next'},
  shuffle:{es:'Barajar',en:'Shuffle'}, onlyPending:{es:'Solo no dominadas',en:'Only not mastered'},
  allKnown:{es:'Has marcado todas las tarjetas de este filtro como dominadas.',en:'You have marked every card in this filter as mastered.'},
  resetCards:{es:'Reiniciar tarjetas',en:'Reset cards'},
  practiceLede:{es:'Una pregunta cada vez, con la explicación al responder. Filtra por tema para reforzar tus puntos débiles.',en:'One question at a time, with the explanation after you answer. Filter by topic to work on weak spots.'},
  check:{es:'Comprobar',en:'Check'}, correct:{es:'Correcto',en:'Correct'}, wrong:{es:'Incorrecto',en:'Incorrect'},
  chooseTwo:{es:'ELIGE DOS',en:'CHOOSE TWO'}, question:{es:'Pregunta',en:'Question'}, of:{es:'de',en:'of'},
  roundDone:{es:'Ronda terminada',en:'Round complete'}, again:{es:'Otra ronda',en:'Another round'},
  simLede:{es:'Formato del examen real: preguntas mezcladas de los dos dominios con su peso, 45 minutos y nota sobre 1000.',en:'Real exam format: mixed questions from both domains by weight, 45 minutes, score out of 1000.'},
  questions:{es:'preguntas',en:'questions'}, minutes:{es:'minutos',en:'minutes'}, toPass:{es:'para aprobar',en:'to pass'},
  simNote:{es:'Microsoft usa una puntuación escalada, no un porcentaje directo. Aquí la nota es proporcional a tus aciertos: tómala como referencia.',en:'Microsoft uses a scaled score, not a straight percentage. Here the score is proportional to your correct answers: treat it as a guide.'},
  flag:{es:'Marcar para revisar',en:'Flag for review'}, unflag:{es:'Quitar marca',en:'Remove flag'},
  finish:{es:'Terminar y corregir',en:'Finish and grade'}, confirmFinish:{es:'¿Seguro? Quedan preguntas sin responder.',en:'Sure? Some questions are unanswered.'},
  yesFinish:{es:'Sí, terminar',en:'Yes, finish'}, cancel:{es:'Seguir',en:'Keep going'},
  pass:{es:'APROBADO',en:'PASS'}, fail:{es:'SUSPENSO',en:'FAIL'},
  reviewAnswers:{es:'Revisa tus respuestas',en:'Review your answers'}, newSim:{es:'Nuevo simulacro',en:'New mock exam'},
  byDomain:{es:'Por dominio',en:'By domain'},
  wrongLede:{es:'Preguntas cuya última respuesta fue incorrecta. Desaparecen de aquí cuando las aciertas.',en:'Questions whose last answer was wrong. They leave this list once you get them right.'},
  noWrong:{es:'No tienes fallos pendientes. Haz una práctica o un simulacro para encontrar puntos débiles.',en:'No pending mistakes. Do a practice round or mock exam to find weak spots.'},
  practiceWrong:{es:'Practicar mis fallos',en:'Practise my mistakes'}, timesWrong:{es:'fallos',en:'misses'},
  resetAll:{es:'Borrar todo el progreso',en:'Erase all progress'}, resetConfirm:{es:'Se borrarán respuestas, tarjetas y simulacros.',en:'Answers, cards and mock exams will be erased.'},
  storageNote:{es:'El progreso se guarda en este navegador.',en:'Progress is saved in this browser.'},
  domain:{es:'Dominio',en:'Domain'}, erase:{es:'Sí, borrar',en:'Yes, erase'}, timeUp:{es:'Tiempo agotado',en:'Time is up'}
};

let lang = 'es';
const T = k => UI[k][lang];
const L = x => (x == null ? '' : typeof x === 'string' ? x : x[lang]);
const topic = id => TOPICS.find(t => t.id === id);
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* barajar opciones una vez por sesión para que la posición de la respuesta no dé pistas */
QS.forEach(q => { const perm = shuffle(q.o.map((_, i) => i)); q.o = perm.map(i => q.o[i]); q.a = q.a.map(i => perm.indexOf(i)); });

/* ---------- persistence ---------- */
const KEY = 'ai901-prep-v1';
let S = {prog:{}, known:{}, sims:[], lang:'es'};
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(e) {}
lang = S.lang || 'es';
function save(){ S.lang = lang; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} }
function record(q, ok){
  const p = S.prog[q.id] || {n:0, c:0, w:0, last:null};
  p.n++; if (ok) p.c++; else p.w++; p.last = ok;
  S.prog[q.id] = p; save(); updateBadge();
}

/* ---------- helpers ---------- */
function topicStats(tid){
  const qs = QS.filter(q => !tid || q.t === tid);
  let n = 0, c = 0, seen = 0;
  qs.forEach(q => { const p = S.prog[q.id]; if (p) { seen++; n += p.n; c += p.c; } });
  return {total: qs.length, seen, acc: n ? c / n : null};
}
function domainAcc(d){
  let n = 0, c = 0;
  QS.forEach(q => { if (topic(q.t).d === d) { const p = S.prog[q.id]; if (p) { n += p.n; c += p.c; } } });
  return n ? c / n : null;
}
function readiness(){
  const a1 = domainAcc(1), a2 = domainAcc(2);
  if (a1 == null && a2 == null) return null;
  if (a1 == null) return Math.round(a2 * 1000);
  if (a2 == null) return Math.round(a1 * 1000);
  return Math.round((a1 * 0.43 + a2 * 0.57) * 1000);
}
const wrongList = () => QS.filter(q => S.prog[q.id] && S.prog[q.id].last === false);
function updateBadge(){ const n = wrongList().length; const b = $('#wrong-n'); if (b) { b.textContent = n; b.hidden = !n; } }
function accColor(a){ return a == null ? 'var(--line)' : a >= .8 ? 'var(--good)' : a >= .6 ? 'var(--warn)' : 'var(--bad)'; }
function hl(code){
  return esc(code).replace(/(#[^\n]*)|("[^"\n]*")|\b(from|import|while|for|in|if|True|print)\b/g,
    (m, c, s, k) => c ? `<span class="c">${c}</span>` : s ? `<span class="s">${s}</span>` : `<span class="k">${k}</span>`);
}
function check(q, sel){ const a = q.a.slice().sort().join(), s = sel.slice().sort().join(); return a === s; }

/* ---------- routing ---------- */
const VIEWS = ['panel','teoria','flashcards','practica','simulacro','fallos'];
let view = 'panel';
function route(){
  const h = location.hash.slice(1);
  view = VIEWS.includes(h) ? h : 'panel';
  render();
}
function go(v){ if (location.hash.slice(1) === v) route(); else location.hash = v; }

const ICON = {
  panel:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  teoria:'<path d="M4 19V6a2 2 0 0 1 2-2h13v14H6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h13"/><path d="M8 8h7M8 11h5"/>',
  flashcards:'<rect x="3" y="7" width="13" height="14" rx="2.5"/><path d="M8 3h10.5A2.5 2.5 0 0 1 21 5.5V17"/>',
  practica:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  simulacro:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  fallos:'<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17h.01"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  spark:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'
};
const ic = (n, cls) => `<svg class="i ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;
Object.assign(UI, {
  greet:{es:'¡Hola, Agustín!',en:'Hi, Agustín!'},
  greetSub:{es:'Así va tu preparación para el AI-901',en:'Here is how your AI-901 prep is going'},
  heroTitle:{es:'Tu simulacro del AI-901 te espera',en:'Your AI-901 mock exam is waiting'},
  heroText:{es:'Preguntas de los dos dominios con su peso real, cronómetro y nota sobre 1000, como el día del examen.',en:'Questions from both domains at their real weight, a timer and a score out of 1000, just like exam day.'},
  lastSim:{es:'Último simulacro',en:'Last mock exam'},
  over:{es:'Por encima de 700',en:'Above 700'}, under:{es:'Aún por debajo de 700',en:'Still below 700'}, nodata:{es:'Sin datos todavía',en:'No data yet'},
  total:{es:'Total',en:'All'}, study:{es:'Estudiar',en:'Study'}, reviewNow:{es:'Repasar',en:'Review'},
  cellsNote:{es:'Cada celda son 100 puntos. La discontinua marca el aprobado.',en:'Each cell is 100 points. The dashed one marks the pass line.'},
  seenOf:{es:'preguntas vistas',en:'questions seen'}, ofSims:{es:'simulacros hechos',en:'mock exams taken'}
});
let readyMode = 't';

function renderChrome(){
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === lang));
  $('#rail-nav').innerHTML = VIEWS.map(v => `<a class="nv" href="#${v}" aria-label="${T(v)}" ${v === view ? 'aria-current="page"' : ''}>${ic(v)}${v === 'fallos' ? '<span class="dot" id="wrong-n" hidden></span>' : ''}<span class="tip">${T(v)}</span></a>`).join('');
  $('#tb-title').textContent = view === 'panel' ? T('greet') : 'AI-901 Prep Lab';
  $('#tb-sub').textContent = view === 'panel' ? T('greetSub') : 'Microsoft Azure AI Fundamentals';
  $('#tb-sim span').textContent = T('simulacro');
  updateBadge();
}
function render(){
  renderChrome();
  const m = $('#main');
  m.className = view === 'panel' ? '' : 'view-narrow';
  ({panel:vPanel, teoria:vTheory, flashcards:vCards, practica:vPractice, simulacro:vSim, fallos:vWrong})[view](m);
  window.scrollTo(0, 0);
}

/* ---------- PANEL ---------- */
function vPanel(m){
  const all = topicStats();
  const knownN = CARDS.filter(c => S.known[c.f]).length;
  const best = S.sims.length ? Math.max(...S.sims.map(s => s.score)) : null;
  const last = S.sims.length ? S.sims[S.sims.length - 1] : null;
  const wN = wrongList().length;
  const rv = readyMode === 't' ? readiness() : (a => a == null ? null : Math.round(a * 1000))(domainAcc(+readyMode));
  const cells = Array.from({length:10}, (_, k) => {
    const f = rv == null ? 0 : Math.max(0, Math.min(1, (rv - k * 100) / 100));
    return `<i class="${k === 6 ? 'pass' : ''}"><b style="height:${Math.round(f * 100)}%"></b></i>`;
  }).join('');
  const topicRow = t => { const s = topicStats(t.id); return `<div class="tt"><button data-th="${t.id}">${L(t)}</button>
      <div class="bar"><i style="width:${s.acc == null ? 0 : Math.round(s.acc * 100)}%;background:${accColor(s.acc)}"></i></div>
      <div class="pct">${s.acc == null ? '—' : Math.round(s.acc * 100) + '%'} <span>${s.seen}/${s.total}</span></div></div>`; };
  const dcol = d => { const a = domainAcc(d); return `<div class="dcol"><h4>D${d} · ${L(DOMAINS[d])}<span>${DOMAINS[d].w} · ${a == null ? '—' : Math.round(a * 100) + '%'}</span></h4>${TOPICS.filter(t => t.d === d).map(topicRow).join('')}</div>`; };
  const sims = S.sims.slice(-10);
  m.innerHTML = `<div class="bento">
    <section class="b-hero">
      <span class="ghost" aria-hidden="true">AI-901</span>
      <h2>${T('heroTitle')}</h2>
      <p>${T('heroText')}</p>
      <div class="tags"><span>${EXAM_N} ${T('questions')}</span><span>${EXAM_MIN} ${T('minutes')}</span><span>700 ${T('toPass')}</span></div>
      <div class="hero-foot">
        <div class="hero-last">${T('lastSim')}<b>${last ? last.score + ' / 1000' : '—'}</b></div>
        <button class="go-btn" data-go="simulacro">${T('startSim')} <i>${ic('arrow')}</i></button>
      </div>
    </section>
    <section class="b-ready">
      <div class="head"><div><h3>${T('readiness')}</h3><p class="sm">${T('cellsNote')}</p></div></div>
      <div class="cells" role="img" aria-label="${T('readiness')}: ${rv == null ? '—' : rv} / 1000">${cells}</div>
      <div class="ready-foot">
        <div style="display:flex;flex-direction:column;gap:10px">
          <span class="badge ${rv != null && rv >= 700 ? '' : 'off'}">${rv == null ? T('nodata') : rv >= 700 ? '✓ ' + T('over') : T('under')}</span>
          <div class="seg" role="group" aria-label="${T('byDomain')}">${[['t', T('total').slice(0, 3)], ['1', 'D1'], ['2', 'D2']].map(([k, l]) => `<button data-rm="${k}" aria-pressed="${readyMode === k}">${l}</button>`).join('')}</div>
        </div>
        <div class="ready-num">${rv == null ? '—' : rv}<small>/ 1000</small></div>
      </div>
    </section>

    <section class="tile">
      <div class="th"><span><i class="ic">${ic('practica')}</i>${T('accuracy')}</span></div>
      <div class="minibars" aria-hidden="true">${TOPICS.map(t => { const s = topicStats(t.id); return `<i title="${L(t)}" style="height:${s.acc == null ? 6 : Math.max(8, Math.round(s.acc * 100))}%;background:${accColor(s.acc)}"></i>`; }).join('')}</div>
      <div class="val">${all.acc == null ? '—' : Math.round(all.acc * 100)}<small>%</small></div>
      <div class="cap">${all.seen}/${all.total} ${T('seenOf')}</div>
    </section>
    <section class="tile">
      <div class="th"><span><i class="ic">${ic('flashcards')}</i>${T('flashcards')}</span><button class="link" data-go="flashcards">${T('study')}</button></div>
      <div class="val">${knownN}<small>/ ${CARDS.length}</small></div>
      <div class="prog"><i style="width:${Math.round(knownN / CARDS.length * 100)}%"></i></div>
      <div class="cap">${T('cardsKnown')}</div>
    </section>
    <section class="tile">
      <div class="th"><span><i class="ic" style="${wN ? 'background:var(--bad-soft);color:var(--bad)' : ''}">${ic('fallos')}</i>${T('fallos')}</span>${wN ? `<button class="link" id="go-wrong">${T('reviewNow')}</button>` : ''}</div>
      <div class="val" style="${wN ? 'color:var(--bad)' : ''}">${wN}</div>
      <div class="cap">${T('pending')}</div>
    </section>
    <section class="tile">
      <div class="th"><span><i class="ic">${ic('spark')}</i>${T('bestSim')}</span></div>
      <div class="minibars" aria-hidden="true">${sims.length ? sims.map(s => `<i title="${s.score}" style="height:${Math.max(8, s.score / 10)}%;background:${s.score >= 700 ? 'var(--good)' : 'var(--bad)'}"></i>`).join('') : Array.from({length:10}, () => '<i></i>').join('')}</div>
      <div class="val">${best == null ? '—' : best}<small>/ 1000</small></div>
      <div class="cap">${S.sims.length} ${T('ofSims')}</div>
    </section>

    <section class="card b-topics">
      <h3>${T('byTopic')}</h3>
      <div class="topic-grid">${dcol(1)}${dcol(2)}</div>
    </section>
    <div class="foot-row">
      <span class="note">${r0(all)}</span>
      <span class="row" id="reset-zone"><button class="btn" id="reset">${T('resetAll')}</button></span>
    </div>
  </div>`;
  function r0(a){ return a.seen ? T('storageNote') : T('noData') + ' ' + T('storageNote'); }
  m.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  m.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { readyMode = b.dataset.rm; vPanel(m); });
  m.querySelectorAll('[data-th]').forEach(b => b.onclick = () => { theoryTopic = b.dataset.th; go('teoria'); });
  const gw = $('#go-wrong'); if (gw) gw.onclick = () => { practiceFilter = 'wrong'; newPractice(); go('practica'); };
  $('#reset').onclick = () => {
    $('#reset-zone').innerHTML = `<span class="note">${T('resetConfirm')}</span><button class="btn" id="r-no">${T('cancel')}</button><button class="btn danger" id="r-yes">${T('erase')}</button>`;
    $('#r-no').onclick = () => vPanel(m);
    $('#r-yes').onclick = () => { S.prog = {}; S.known = {}; S.sims = []; save(); vPanel(m); updateBadge(); };
  };
}

/* ---------- THEORY ---------- */
let theoryTopic = 'rai';
function vTheory(m){
  const secs = THEORY[theoryTopic];
  m.innerHTML = `<h2 class="v">${T('teoria')}</h2><p class="lede">${T('theoryLede')}</p>
  <div class="chips">${TOPICS.map(t => `<button class="chip" data-t="${t.id}" aria-pressed="${t.id === theoryTopic}"><span class="d">D${t.d}</span>${L(t)}</button>`).join('')}</div>
  <div class="dom-tag">${T('domain')} ${topic(theoryTopic).d} · ${L(DOMAINS[topic(theoryTopic).d])} · ${DOMAINS[topic(theoryTopic).d].w}</div>
  ${secs.map(s => `<section class="theory-sec"><h3>${L(s.h)}</h3>
     ${s.code ? `<pre class="code">${hl(s.code)}</pre>` : ''}
     <ul>${s.b.map(b => `<li>${L(b)}</li>`).join('')}</ul>
     ${s.code2 ? `<pre class="code" style="margin:14px 0 0">${hl(s.code2)}</pre>` : ''}</section>`).join('')}
  <div class="row"><button class="btn primary" id="th-practice">${T('startPractice')}: ${L(topic(theoryTopic))}</button></div>`;
  m.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { theoryTopic = b.dataset.t; vTheory(m); });
  $('#th-practice').onclick = () => { practice = null; practiceFilter = theoryTopic; go('practica'); };
}

/* ---------- FLASHCARDS ---------- */
let fc = {filter:'all', pendingOnly:false, order:null, i:0, flip:false};
function vCards(m){
  let pool = CARDS.filter(c => fc.filter === 'all' || c.t === fc.filter);
  if (fc.pendingOnly) pool = pool.filter(c => !S.known[c.f]);
  if (!fc.order || fc.order.some(c => !pool.includes(c)) || fc.order.length !== pool.length) { fc.order = pool; fc.i = 0; }
  const card = fc.order[fc.i];
  const knownN = CARDS.filter(c => (fc.filter === 'all' || c.t === fc.filter) && S.known[c.f]).length;
  const totalN = CARDS.filter(c => fc.filter === 'all' || c.t === fc.filter).length;
  m.innerHTML = `<h2 class="v">${T('flashcards')}</h2><p class="lede">${T('fcLede')}</p>
  <div class="chips"><button class="chip" data-f="all" aria-pressed="${fc.filter === 'all'}">${T('all')}</button>${TOPICS.map(t => `<button class="chip" data-f="${t.id}" aria-pressed="${t.id === fc.filter}"><span class="d">D${t.d}</span>${L(t)}</button>`).join('')}</div>
  <div class="row" style="margin-bottom:18px;justify-content:space-between">
    <label class="check"><input type="checkbox" id="fc-pend" ${fc.pendingOnly ? 'checked' : ''}> ${T('onlyPending')}</label>
    <span class="fc-count">${T('cardsKnown')}: ${knownN}/${totalN}</span>
  </div>
  ${card ? `<div class="fc-stage">
    <button class="fc ${fc.flip ? 'flip' : ''}" id="fc-card" aria-label="${T('flipHint')}">
      <div class="fc-in">
        <div class="fc-face fc-front"><span class="eyebrow">${L(topic(card.t))}${S.known[card.f] ? ' · ✓' : ''}</span><div class="term">${esc(card.f)}</div><span class="fc-hint">${T('flipHint')}</span></div>
        <div class="fc-face fc-back"><span class="eyebrow">${esc(card.f)}</span><div>${L(card.b)}</div></div>
      </div>
    </button>
    <div class="fc-count">${fc.i + 1} / ${fc.order.length}</div>
    <div class="row" style="justify-content:center">
      <button class="btn" id="fc-prev" ${fc.i === 0 ? 'disabled' : ''}>← ${T('prev')}</button>
      <button class="btn" id="fc-rev">${T('review')}</button>
      <button class="btn primary" id="fc-know">✓ ${T('know')}</button>
      <button class="btn" id="fc-next" ${fc.i >= fc.order.length - 1 ? 'disabled' : ''}>${T('next')} →</button>
    </div>
    <div class="row" style="justify-content:center"><button class="btn" id="fc-shuf">${T('shuffle')}</button><button class="btn" id="fc-reset">${T('resetCards')}</button></div>
  </div>` : `<div class="empty">${T('allKnown')}<div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="fc-reset">${T('resetCards')}</button></div></div>`}`;
  m.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { fc.filter = b.dataset.f; fc.order = null; fc.flip = false; vCards(m); });
  $('#fc-pend').onchange = e => { fc.pendingOnly = e.target.checked; fc.order = null; fc.flip = false; vCards(m); };
  $('#fc-reset').onclick = () => { CARDS.forEach(c => { if (fc.filter === 'all' || c.t === fc.filter) delete S.known[c.f]; }); save(); fc.order = null; vCards(m); };
  if (!card) return;
  const step = d => { fc.i = Math.max(0, Math.min(fc.order.length - 1, fc.i + d)); fc.flip = false; vCards(m); };
  $('#fc-card').onclick = () => { fc.flip = !fc.flip; $('#fc-card').classList.toggle('flip', fc.flip); };
  $('#fc-prev').onclick = () => step(-1);
  $('#fc-next').onclick = () => step(1);
  $('#fc-shuf').onclick = () => { fc.order = shuffle(fc.order); fc.i = 0; fc.flip = false; vCards(m); };
  $('#fc-know').onclick = () => {
    S.known[card.f] = true; save();
    if (fc.pendingOnly) { fc.order = fc.order.filter(c => c !== card); fc.i = Math.min(fc.i, Math.max(0, fc.order.length - 1)); fc.flip = false; vCards(m); }
    else if (fc.i < fc.order.length - 1) step(1); else vCards(m);
  };
  $('#fc-rev').onclick = () => { delete S.known[card.f]; save(); if (fc.i < fc.order.length - 1) step(1); else vCards(m); };
}

/* ---------- question rendering (shared) ---------- */
function qHTML(q, sel, graded, idx, total, extraMeta){
  const multi = q.a.length > 1;
  const letters = 'ABCDEF';
  return `<div class="qmeta"><span class="eyebrow">${T('question')} ${idx + 1} ${T('of')} ${total}</span><span class="eyebrow">D${topic(q.t).d} · ${L(topic(q.t))}${extraMeta || ''}</span></div>
   <p class="qtext">${esc(L(q.q))}</p>${multi ? `<div class="qmulti">${T('chooseTwo')}</div>` : ''}
   <div class="opts">${q.o.map((o, i) => {
     let cls = '';
     if (graded) { if (q.a.includes(i)) cls = 'ok'; else if (sel.includes(i)) cls = 'ko'; }
     return `<button class="opt ${cls}" data-i="${i}" aria-pressed="${!graded && sel.includes(i)}" ${graded ? 'disabled' : ''}><span class="k">${letters[i]}</span><span>${esc(L(o))}</span></button>`;
   }).join('')}</div>
   ${graded ? `<div class="expl ${check(q, sel) ? '' : 'bad'}"><b>${check(q, sel) ? T('correct') : T('wrong')}</b>${esc(L(q.e))}</div>` : ''}`;
}
function bindOpts(root, q, sel, onChange){
  root.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    if (q.a.length > 1) { const k = sel.indexOf(i); if (k >= 0) sel.splice(k, 1); else { if (sel.length >= q.a.length) sel.shift(); sel.push(i); } }
    else { sel.length = 0; sel.push(i); }
    onChange();
  });
}

/* ---------- PRACTICE ---------- */
let practiceFilter = 'all';
let practice = null; // {pool, i, sel, graded, ok}
function newPractice(){
  const pool = practiceFilter === 'wrong' ? wrongList() : QS.filter(q => practiceFilter === 'all' || q.t === practiceFilter);
  // priorizar no vistas y falladas
  const score = q => { const p = S.prog[q.id]; return !p ? 0 : p.last === false ? 1 : 2; };
  const sorted = shuffle(pool).sort((a, b) => score(a) - score(b));
  practice = {pool: sorted, i:0, sel:[], graded:false, ok:0, done:0, filter: practiceFilter};
}
function vPractice(m){
  if (!practice || practice.filter !== practiceFilter) newPractice();
  const P = practice;
  const chips = `<div class="chips"><button class="chip" data-p="all" aria-pressed="${practiceFilter === 'all'}">${T('all')}</button>${TOPICS.map(t => `<button class="chip" data-p="${t.id}" aria-pressed="${t.id === practiceFilter}"><span class="d">D${t.d}</span>${L(t)}</button>`).join('')}<button class="chip" data-p="wrong" aria-pressed="${practiceFilter === 'wrong'}">${T('fallos')}</button></div>`;
  let body;
  if (!P.pool.length) body = `<div class="empty">${T('noWrong')}</div>`;
  else if (P.i >= P.pool.length) body = `<div class="qcard"><h3>${T('roundDone')}</h3><div class="big">${P.ok}<small> / ${P.done}</small></div><div class="row" style="margin-top:16px"><button class="btn primary" id="p-again">${T('again')}</button><button class="btn" data-go="panel">${T('panel')}</button></div></div>`;
  else {
    const q = P.pool[P.i];
    body = `<div class="qcard" id="qc">${qHTML(q, P.sel, P.graded, P.i, P.pool.length)}
      <div class="row">${P.graded ? `<button class="btn primary" id="p-next">${T('next')} →</button>` : `<button class="btn primary" id="p-check" ${P.sel.length !== q.a.length ? 'disabled' : ''}>${T('check')}</button>`}
      <span class="score-pill">✓ ${P.ok} / ${P.done}</span></div></div>`;
  }
  m.innerHTML = `<h2 class="v">${T('practica')}</h2><p class="lede">${T('practiceLede')}</p>${chips}${body}`;
  m.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { practiceFilter = b.dataset.p; newPractice(); vPractice(m); });
  m.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  const again = $('#p-again'); if (again) again.onclick = () => { newPractice(); vPractice(m); };
  if (!P.pool.length || P.i >= P.pool.length) return;
  const q = P.pool[P.i];
  if (!P.graded) {
    bindOpts($('#qc'), q, P.sel, () => vPractice(m));
    $('#p-check').onclick = () => { P.graded = true; const ok = check(q, P.sel); P.done++; if (ok) P.ok++; record(q, ok); vPractice(m); };
  } else {
    $('#p-next').onclick = () => { P.i++; P.sel = []; P.graded = false; vPractice(m); };
  }
}

/* ---------- MOCK EXAM ---------- */
const EXAM_N = 40, EXAM_MIN = 45;
let exam = null; // {qs, ans:[], flags:[], i, end, done, score}
let timerId = null;
function startExam(){
  const d1 = shuffle(QS.filter(q => topic(q.t).d === 1)), d2 = shuffle(QS.filter(q => topic(q.t).d === 2));
  const n1 = Math.round(EXAM_N * 0.43);
  const qs = shuffle(d1.slice(0, n1).concat(d2.slice(0, EXAM_N - n1)));
  exam = {qs, ans: qs.map(() => []), flags: qs.map(() => false), i:0, end: Date.now() + EXAM_MIN * 60000, done:false, confirm:false};
}
function finishExam(){
  clearInterval(timerId); timerId = null;
  let ok = 0; const dom = {1:{c:0,n:0}, 2:{c:0,n:0}};
  exam.qs.forEach((q, k) => { const r = check(q, exam.ans[k]); const d = topic(q.t).d; dom[d].n++; if (r) { ok++; dom[d].c++; } record(q, r); });
  exam.done = true; exam.ok = ok; exam.dom = dom; exam.score = Math.round(ok / exam.qs.length * 1000);
  S.sims.push({score: exam.score, date: new Date().toISOString().slice(0, 10)}); save();
}
const fmt = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
function vSim(m){
  if (!exam) {
    m.innerHTML = `<h2 class="v">${T('simulacro')}</h2><p class="lede">${T('simLede')}</p>
    <div class="start-grid"><div><b>${EXAM_N}</b>${T('questions')}</div><div><b>${EXAM_MIN}</b>${T('minutes')}</div><div><b>700</b>${T('toPass')} / 1000</div></div>
    <p class="note">D1 ${DOMAINS[1].w} · D2 ${DOMAINS[2].w}. ${T('simNote')}</p>
    <div class="row" style="margin-top:18px"><button class="btn primary" id="s-start">${T('startSim')}</button></div>`;
    $('#s-start').onclick = () => { startExam(); vSim(m); };
    return;
  }
  const E = exam;
  if (E.done) {
    m.innerHTML = `<h2 class="v">${T('simulacro')}</h2>
    <div class="res-grid">
      <div class="card res-main"><div class="row" style="justify-content:space-between;align-items:flex-start"><div class="big">${E.score}<small> / 1000</small></div><span class="verdict ${E.score >= 700 ? 'pass' : 'fail'}">${E.score >= 700 ? T('pass') : T('fail')}</span></div>
        <div class="scale"><div class="fill" style="width:${E.score / 10}%;background:${E.score >= 700 ? 'var(--good)' : 'var(--bad)'}"></div><div class="pass"></div></div>
        <p class="note">${E.ok} / ${E.qs.length} ✓${E.timeUp ? ' · ' + T('timeUp') : ''}. ${T('simNote')}</p>
        <div class="row" style="margin-top:14px"><button class="btn primary" id="s-new">${T('newSim')}</button><button class="btn" data-go="fallos">${T('fallos')}</button></div></div>
      <div class="card res-side"><h3>${T('byDomain')}</h3>
        <div class="stat-list">${[1,2].map(d => `<span>D${d} · ${L(DOMAINS[d])}</span><b>${E.dom[d].c}/${E.dom[d].n}</b>`).join('')}</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">${[1,2].map(d => `<div class="prog"><i style="width:${Math.round(E.dom[d].c / Math.max(1, E.dom[d].n) * 100)}%"></i></div>`).join('')}</div></div>
    </div>
    <h3>${T('reviewAnswers')}</h3>
    <div class="qcard" id="qc">${qHTML(E.qs[E.i], E.ans[E.i], true, E.i, E.qs.length)}
      <div class="row"><button class="btn" id="s-prev" ${E.i === 0 ? 'disabled' : ''}>← ${T('prev')}</button><button class="btn" id="s-next" ${E.i >= E.qs.length - 1 ? 'disabled' : ''}>${T('next')} →</button></div>
      <div class="qnav">${E.qs.map((q, k) => `<button data-k="${k}" class="${check(q, E.ans[k]) ? 'okk' : 'koo'} ${k === E.i ? 'cur' : ''}">${k + 1}</button>`).join('')}</div></div>`;
    $('#s-new').onclick = () => { exam = null; vSim(m); };
    m.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    $('#s-prev').onclick = () => { E.i--; vSim(m); };
    $('#s-next').onclick = () => { E.i++; vSim(m); };
    m.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { E.i = +b.dataset.k; vSim(m); });
    return;
  }
  const q = E.qs[E.i];
  const unanswered = E.ans.filter((a, k) => a.length !== E.qs[k].a.length).length;
  m.innerHTML = `<div class="exam-bar"><h2 class="v" style="margin:0">${T('simulacro')}</h2><span class="timer" id="timer">${fmt(E.end - Date.now())}</span></div>
  <div class="qcard" id="qc">${qHTML(q, E.ans[E.i], false, E.i, E.qs.length, E.flags[E.i] ? ' · ⚑' : '')}
    <div class="row">
      <button class="btn" id="s-prev" ${E.i === 0 ? 'disabled' : ''}>← ${T('prev')}</button>
      <button class="btn" id="s-flag">⚑ ${E.flags[E.i] ? T('unflag') : T('flag')}</button>
      <button class="btn" id="s-next" ${E.i >= E.qs.length - 1 ? 'disabled' : ''}>${T('next')} →</button>
      <span style="margin-left:auto" class="row" id="fin-zone">${E.confirm ? `<span class="note">${T('confirmFinish')} (${unanswered})</span><button class="btn" id="s-cancel">${T('cancel')}</button><button class="btn primary" id="s-yes">${T('yesFinish')}</button>` : `<button class="btn primary" id="s-finish">${T('finish')}</button>`}</span>
    </div>
    <div class="qnav">${E.qs.map((qq, k) => `<button data-k="${k}" class="${E.ans[k].length ? 'ans' : ''} ${E.flags[k] ? 'flag' : ''} ${k === E.i ? 'cur' : ''}" aria-label="${T('question')} ${k + 1}">${k + 1}</button>`).join('')}</div>
  </div>`;
  bindOpts($('#qc'), q, E.ans[E.i], () => vSim(m));
  $('#s-prev').onclick = () => { E.i--; vSim(m); };
  $('#s-next').onclick = () => { E.i++; vSim(m); };
  $('#s-flag').onclick = () => { E.flags[E.i] = !E.flags[E.i]; vSim(m); };
  m.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { E.i = +b.dataset.k; vSim(m); });
  const fin = () => { finishExam(); E.i = 0; vSim(m); };
  if ($('#s-finish')) $('#s-finish').onclick = () => { if (unanswered) { E.confirm = true; vSim(m); } else fin(); };
  if ($('#s-cancel')) $('#s-cancel').onclick = () => { E.confirm = false; vSim(m); };
  if ($('#s-yes')) $('#s-yes').onclick = fin;
  if (!timerId) timerId = setInterval(() => {
    if (!exam || exam.done) { clearInterval(timerId); timerId = null; return; }
    const left = exam.end - Date.now();
    const t = document.getElementById('timer');
    if (t) { t.textContent = fmt(left); t.classList.toggle('low', left < 5 * 60000); }
    if (left <= 0) { exam.timeUp = true; finishExam(); exam.i = 0; if (view === 'simulacro') vSim($('#main')); }
  }, 1000);
}

/* ---------- MISTAKES ---------- */
function vWrong(m){
  const w = wrongList();
  m.innerHTML = `<h2 class="v">${T('fallos')}</h2><p class="lede">${T('wrongLede')}</p>
  ${w.length ? `<div class="row" style="margin-bottom:16px"><button class="btn primary" id="w-go">${T('practiceWrong')} (${w.length})</button></div>
    <div class="card">${w.map(q => `<div class="wrong-item"><div style="min-width:0"><div class="eyebrow">D${topic(q.t).d} · ${L(topic(q.t))}</div><p>${esc(L(q.q))}</p></div><span class="cnt">${S.prog[q.id].w} ${T('timesWrong')}</span></div>`).join('')}</div>`
  : `<div class="empty">${T('noWrong')}</div>`}`;
  const b = $('#w-go'); if (b) b.onclick = () => { practiceFilter = 'wrong'; newPractice(); go('practica'); };
}

/* ---------- boot ---------- */
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => { lang = b.dataset.l; save(); render(); });
window.addEventListener('hashchange', route);
route();
