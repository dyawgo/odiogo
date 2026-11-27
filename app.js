(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} },
    sget: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    sset: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- língua ---------- */
  var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
  var PT = String(langs[0] || '').toLowerCase().indexOf('pt') === 0;
  var L = PT ? 0 : 1;
  document.documentElement.lang = PT ? 'pt' : 'en';
  var T = {
    projects: ['Projetos', 'Projects'], contacts: ['Contactos', 'Contact'], contact: ['Contacto', 'Contact'],
    bio1: ['Trabalho em vídeo — edição, motion graphics e direção criativa — com marcas e instituições.', 'I work in video — editing, motion graphics and creative direction — with brands and institutions.'],
    bio2: ['Interessa-me perceber o que está por trás de cada projeto e encontrar a melhor resposta, da forma mais eficiente. Construo ferramentas à medida e integro IA no meu processo, ganhando rapidez sem comprometer o detalhe.', 'I care about understanding what lies behind each project and finding the best answer, as efficiently as possible. I build my own tools and bring AI into my process, gaining speed without compromising on detail.'],
    exp: ['Experiência Profissional', 'Work Experience'], present: ['presente', 'present'],
    job1: ['Direção criativa, vídeo, fotografia, edição e motion graphics. Lidero projetos de forma autónoma ou integro equipas, em qualquer fase: ideia, rodagem, edição ou entrega.', 'Creative direction, video, photography, editing and motion graphics. I lead projects on my own or join teams at any stage: idea, shoot, edit or delivery.'],
    cml: ['Câmara Municipal de Lisboa', 'Lisbon City Council'], job2: ['Edição vídeo e motion graphics', 'Video editing and motion graphics'],
    gov: ['Governo de Portugal', 'Portuguese Government'], job3: ['Videógrafo oficial do XIX, XX e XXI Governos', 'Official videographer for the 19th, 20th and 21st Governments'],
    job5: ['Edição vídeo', 'Video editing'], job6: ['Imagem, edição vídeo e régie', 'Camera, video editing and studio control'],
    all: ['Tudo', 'All'], edicao: ['Edição', 'Editing'], motion: ['Motion', 'Motion'], foto: ['Fotografia', 'Photography'], design: ['Design', 'Design'], index: ['Index', 'Index'],
    year: ['Ano', 'Year'], project: ['Projeto', 'Project'], type: ['Tipo', 'Type'], client: ['Cliente', 'Client'],
    video: ['Vídeo', 'Video'], close: ['Fechar', 'Close'], back: ['Voltar ao cartão', 'Back to card']
  };
  var CLIENT = { CML: ['Câmara Municipal de Lisboa', 'Lisbon City Council'], GOV: ['Governo de Portugal', 'Portuguese Government'], 'Pessoal': ['Pessoal', 'Personal'], 'Associação LOCALS': ['Associação LOCALS', 'LOCALS Association'] };
  var tr = function (k) { return T[k] ? T[k][L] : k; };
  Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function (el) { el.textContent = tr(el.getAttribute('data-t')); });

  /* ---------- cartão: cor, nome, data, número ---------- */
  var last = parseInt(store.get('odiogo-card-colour'), 10);
  var ci = Math.floor(Math.random() * 5);
  if (ci === last) ci = (ci + 1 + Math.floor(Math.random() * 4)) % 5;
  store.set('odiogo-card-colour', String(ci));
  var colourCls = 'c' + ci;
  $('flipper').classList.add(colourCls); $('cnote').classList.add(colourCls);

  var rnd = function (n) { var x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x) - 0.5; };
  var jitter = function (text, seed) {
    var k = seed;
    return text.split('').map(function (ch) {
      k++;
      if (ch === ' ') return '<span style="display:inline-block">&nbsp;</span>';
      var st = 'display:inline-block;transform:translateY(' + (rnd(k + 99) * 3).toFixed(1) + 'px) rotate(' + (rnd(k) * 3.2).toFixed(2) + 'deg);opacity:' + (0.82 + (rnd(k + 7) + 0.5) * 0.18).toFixed(2);
      return '<span style="' + st + '">' + ch + '</span>';
    }).join('');
  };
  $('name').innerHTML = '<div style="white-space:nowrap">' + jitter('DIOGO SEOANE', 0) + '</div><div style="white-space:nowrap">' + jitter('GOMES', 12) + '</div>';
  var now = new Date(), p2 = function (v) { return String(v).padStart(2, '0'); };
  $('dd').textContent = p2(now.getDate()); $('mm').textContent = p2(now.getMonth() + 1);
  $('nr').textContent = String(1034 + Math.floor(Math.random() * 8966)).padStart(6, '0');
  $('pvstamp').innerHTML = tr('projects').toUpperCase().split('').map(function (ch, i) {
    return '<span style="display:inline-block;transform:translateY(' + (rnd(i + 300) * 4).toFixed(1) + 'px) rotate(' + (rnd(i + 333) * 5).toFixed(2) + 'deg);opacity:' + (0.8 + (rnd(i + 377) + 0.5) * 0.2).toFixed(2) + '">' + ch + '</span>';
  }).join('');
  $('pvtitle').setAttribute('aria-label', tr('projects'));

  /* ---------- estado ---------- */
  var S = { view: 'card', turns: 0, x: 0, y: 0, s: 1, filter: 'all', detail: null, slide: 0, mobile: false };
  var isMobile = function () { try { return window.matchMedia('(max-width: 700px), (hover: none) and (pointer: coarse)').matches; } catch (e) { return false; } };

  /* ---------- cartão: posição, virar, arrastar ---------- */
  var wrap = $('cardwrap'), flipper = $('flipper');
  var applyCard = function (drag, tilt) {
    wrap.style.transition = drag ? 'none' : 'transform .25s ease-out';
    wrap.style.transform = 'translate(' + S.x + 'px,' + S.y + 'px) scale(' + S.s + ') rotate(' + (drag ? (tilt || 0) : 0) + 'deg)';
    wrap.style.cursor = drag ? 'grabbing' : 'pointer';
  };
  var applyFlip = function () {
    flipper.style.transform = 'rotateY(' + (S.turns * 180) + 'deg)';
    flipper.classList.toggle('isflip', S.turns % 2 === 1);
  };
  var flip = function () { S.turns++; applyFlip(); };
  var fit = function () {
    S.mobile = isMobile();
    if (S.view !== 'card') return;
    if (S.mobile) { S.s = 1; S.x = 0; S.y = 0; wrap.style.marginBottom = '0px'; applyCard(false); return; }
    var w = wrap.offsetWidth, h = wrap.offsetHeight || 1, pad = 48;
    var avail = window.innerHeight - pad;
    S.s = Math.max(0.4, Math.min(S.mobile ? 1 : 0.99, avail / h));
    S.x = (w - w * S.s) / 2; S.y = Math.max(0, (avail - h * S.s) / 2);
    wrap.style.marginBottom = (-(h - h * S.s) + S.y) + 'px';
    applyCard(false);
  };
  var D = null;
  var clamp = function (v, a, b) { var lo = Math.min(a, b), hi = Math.max(a, b); return Math.max(lo, Math.min(hi, v)); };
  var skip = function (t) { return t.closest && (t.closest('a') || t.closest('button')); };
  wrap.addEventListener('pointerdown', function (e) {
    if (S.mobile || skip(e.target)) return;
    if (wrap.setPointerCapture) wrap.setPointerCapture(e.pointerId);
    var r = wrap.getBoundingClientRect();
    D = { sx: e.clientX, sy: e.clientY, ox: S.x, oy: S.y, lx: e.clientX, moved: false, tilt: 0, r: r, bl: r.left - S.x, bt: r.top - S.y };
  });
  wrap.addEventListener('pointermove', function (e) {
    if (!D) return;
    var dx = e.clientX - D.sx, dy = e.clientY - D.sy;
    if (!D.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
    D.moved = true;
    var v = e.clientX - D.lx; D.lx = e.clientX;
    D.tilt = Math.max(-4, Math.min(4, D.tilt * 0.8 + v * 0.25));
    var vw = document.documentElement.clientWidth, vh = window.innerHeight, m = 8;
    S.x = clamp(D.ox + dx, m - D.bl, vw - m - D.r.width - D.bl);
    S.y = clamp(D.oy + dy, m - D.bt, vh - m - D.r.height - D.bt);
    applyCard(true, D.tilt);
  });
  var endDrag = function () {
    if (!D) return;
    var moved = D.moved; D = null;
    if (!moved) flip(); else applyCard(false);
  };
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', function () { D = null; applyCard(false); });
  wrap.addEventListener('click', function (e) { if (S.mobile && !skip(e.target)) flip(); });
  $('info').addEventListener('click', function (e) { e.stopPropagation(); flip(); });
  $('flipback').addEventListener('click', function (e) { e.stopPropagation(); flip(); });

  /* ---------- vistas ---------- */
  var remember = function (v) {
    store.sset('odiogo-view', v);
    try { history.replaceState(null, '', v === 'projects' ? '#projetos' : location.pathname + location.search); } catch (e) {}
  };
  var setView = function (v) {
    S.view = v;
    $('cardview').hidden = v !== 'card';
    $('projview').hidden = v !== 'projects';
    $('burger').hidden = false;
    remember(v);
    window.scrollTo(0, 0);
    if (v === 'card') setTimeout(fit, 30); else renderProjects();
    growCanvas();
  };
  $('projlink').addEventListener('click', function (e) { e.stopPropagation(); setView('projects'); });
  $('backfix').addEventListener('click', function () { setView('card'); });

  /* ---------- menu e contactos ---------- */
  var openMenu = function (o) { $('menu').hidden = !o; $('burger').hidden = o; };
  $('burger').addEventListener('click', function () { openMenu(true); });
  $('menuclose').addEventListener('click', function () { openMenu(false); });
  $('m-info').addEventListener('click', function () { openMenu(false); closeDetail(); setView('card'); if (S.turns % 2 === 0) setTimeout(flip, 120); });
  $('m-proj').addEventListener('click', function () { openMenu(false); setView('projects'); });
  $('m-contact').addEventListener('click', function () { openMenu(false); $('contact').hidden = false; });
  $('contact').addEventListener('click', function () { $('contact').hidden = true; });
  $('cnote').addEventListener('click', function (e) { e.stopPropagation(); });
  $('cclose').addEventListener('click', function () { $('contact').hidden = true; });

  /* ---------- projetos ---------- */
  var P = (window.PROJECTS || []).filter(function (p) { return p.media && p.media.length; });
  var COL = { all: [243, 238, 230], edicao: [229, 138, 110], motion: [127, 166, 211], foto: [232, 195, 90], design: [147, 179, 126], index: [201, 191, 176] };
  var rgba = function (c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; };
  var tagsOf = function (p) {
    var t = p.type[0].toLowerCase(), tags = [];
    if (t.indexOf('edição') >= 0 || t.indexOf('vídeo') >= 0 || t.indexOf('direção') >= 0) tags.push('edicao');
    if (t.indexOf('motion') >= 0) tags.push('motion');
    if (t.indexOf('fotografia') >= 0) tags.push('foto');
    if (t.indexOf('design') >= 0 || t.indexOf('poster') >= 0 || t.indexOf('style') >= 0) tags.push('design');
    return tags;
  };
  var kindOf = function (p) { var t = tagsOf(p); return t.indexOf('foto') >= 0 && t.indexOf('edicao') < 0 ? 'foto' : t.indexOf('design') >= 0 ? 'design' : t.indexOf('motion') >= 0 && t.indexOf('edicao') < 0 ? 'motion' : 'edicao'; };
  var hsh = function (s) { var h = 0; for (var q = 0; q < s.length; q++) h = (h * 31 + s.charCodeAt(q)) | 0; return Math.abs(h); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var titleOf = function (p) { return (!PT && p.titleEN) ? p.titleEN : p.title; };
  var clientOf = function (p) { return CLIENT[p.client] ? CLIENT[p.client][L] : p.client; };
  var noteOf = function (p) {
    if (p.note) return p.note[L];
    if (p.client === 'CML') return PT ? 'Edição para a Câmara Municipal de Lisboa.' : 'Editing for Lisbon City Council.';
    if (p.client === 'Pessoal') return PT ? 'Projeto pessoal.' : 'Personal project.';
    return '';
  };
  var coverOf = function (p) {
    if (p.cover) return p.cover;
    var m = p.media[0];
    if (m.yt) return 'https://i.ytimg.com/vi/' + m.yt + '/hqdefault.jpg';
    if (m.vimeo) return 'https://vumbnail.com/' + m.vimeo + '.jpg';
    if (m.img) return m.img;
    return '';
  };
  var countOf = function (p) {
    var n = p.media.length; if (n < 2) return '';
    var imgs = p.media.filter(function (m) { return m.img; }).length;
    var word = imgs === n ? (kindOf(p) === 'foto' ? (PT ? 'fotos' : 'photos') : (PT ? 'imagens' : 'images')) : (imgs ? (PT ? 'peças' : 'pieces') : (PT ? 'vídeos' : 'videos'));
    return n + ' ' + word;
  };
  var FL = ['all', 'edicao', 'motion', 'foto', 'design', 'index'];
  var renderTabs = function () {
    $('tabs').setAttribute('aria-label', PT ? 'Filtrar projetos' : 'Filter projects');
    $('tabs').innerHTML = FL.map(function (f) {
      var on = S.filter === f;
      return '<button class="tab' + (on ? ' on' : '') + '" data-f="' + f + '" aria-pressed="' + on + '" style="background-color:' + rgba(COL[f], on ? 1 : 0.5) + '">' + tr(f) + '</button>';
    }).join('');
  };
  $('tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-f]'); if (!b) return;
    S.filter = b.getAttribute('data-f'); store.sset('odiogo-filter', S.filter); renderProjects(); growCanvas();
  });
  var renderProjects = function () {
    renderTabs();
    var list = P.filter(function (p) { return S.filter === 'all' || S.filter === 'index' || tagsOf(p).indexOf(S.filter) >= 0; });
    var html;
    if (S.filter === 'index') {
      html = '<div class="plist"><div class="phead print"><span>' + tr('year') + '</span><span>' + tr('project') + '</span><span>' + tr('type') + '</span><span>' + tr('client') + '</span><span></span></div>' +
        list.map(function (p) {
          return '<div class="pitem"><button class="prow" data-p="' + p.id + '"><span class="stamp pyear">' + p.year + '</span><span class="print ptitle">' + esc(titleOf(p)) + (countOf(p) ? ' <span class="stamp pcnt">' + countOf(p) + '</span>' : '') + '</span><span class="print pmeta">' + esc(p.type[L]) + '</span><span class="print pmeta">' + esc(clientOf(p)) + '</span><span class="pdot" style="background-color:' + rgba(COL[kindOf(p)], 1) + '"></span></button></div>';
        }).join('') + '</div>';
    } else {
      html = '<div class="prints">' + list.map(function (p) {
        var h = hsh(p.id), rot = ((h % 70) / 10 - 3.5).toFixed(1), trot = (((h >> 3) % 120) / 10 - 6).toFixed(1), tx = ((h >> 5) % 40) - 20;
        var cnt = countOf(p);
        return '<button class="pcard' + (cnt ? ' stack' : '') + '" data-p="' + p.id + '" style="transform:rotate(' + rot + 'deg)">' +
          '<span class="ptape" aria-hidden="true" style="transform:translateX(' + tx + 'px) rotate(' + trot + 'deg);background-color:' + rgba(COL[kindOf(p)], 0.72) + '"></span>' +
          '<span class="pimg">' + (cnt ? '<span class="pst pst1" aria-hidden="true"></span><span class="pst pst2" aria-hidden="true"></span>' : '') + '<img src="' + esc(coverOf(p)) + '" alt="" loading="lazy" draggable="false" onerror="this.className=\'fail\'">' + (cnt ? '<span class="stamp pbadge">' + cnt + '</span>' : '') + '</span>' +
          '<span class="pcapt"><span class="stamp pcy">' + p.year + '</span><span class="pct">' + esc(titleOf(p)) + '</span><span class="pcm">' + esc(p.type[L]) + '</span></span></button>';
      }).join('') + '</div>';
    }
    $('projlist').innerHTML = html;
  };
  $('projlist').addEventListener('click', function (e) {
    var b = e.target.closest('[data-p]'); if (!b) return;
    openDetail(b.getAttribute('data-p'));
  });

  /* ---------- detalhe ---------- */
  var openDetail = function (id) {
    var p = P.filter(function (q) { return q.id === id; })[0]; if (!p) return;
    S.detail = p; S.slide = 0;
    $('dyear').textContent = p.year; $('dtitle').textContent = titleOf(p);
    $('dmeta').innerHTML = '<span>' + esc(p.type[L]) + '</span><span>·</span><span>' + esc(clientOf(p)) + '</span>';
    $('dnote').textContent = noteOf(p);
    $('detail').setAttribute('aria-label', titleOf(p));
    $('detail').hidden = false; document.body.style.overflow = 'hidden';
    renderSlide();
  };
  var closeDetail = function () { if (!S.detail) return; S.detail = null; $('dframe').innerHTML = ''; $('detail').hidden = true; document.body.style.overflow = ''; };
  var renderSlide = function () {
    var p = S.detail, n = p.media.length, i = ((S.slide % n) + n) % n, m = p.media[i], f;
    if (m.yt) f = '<iframe src="https://www.youtube-nocookie.com/embed/' + m.yt + '?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1" title="' + esc(m.t) + '" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    else if (m.vimeo) f = '<iframe src="https://player.vimeo.com/video/' + m.vimeo + '?autoplay=1&muted=1&title=0&byline=0&portrait=0" title="' + esc(m.t) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    else if (m.file) f = '<video src="' + m.file + '"' + (m.poster ? ' poster="' + m.poster + '"' : '') + ' controls playsinline autoplay muted loop preload="auto"></video>';
    else if (m.img) f = '<img src="' + m.img + '" alt="' + esc(m.t || titleOf(p)) + '">';
    $('dframe').innerHTML = f || '';
    $('dcap').textContent = m.t || '';
    $('dnav').hidden = n < 2;
    $('dcount').textContent = (i + 1) + ' / ' + n;
  };
  $('dprev').addEventListener('click', function (e) { e.stopPropagation(); S.slide--; renderSlide(); });
  $('dnext').addEventListener('click', function (e) { e.stopPropagation(); S.slide++; renderSlide(); });
  $('dclose').addEventListener('click', function (e) { e.stopPropagation(); closeDetail(); });
  $('detail').addEventListener('click', closeDetail);
  $('dinner').addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDetail(); openMenu(false); $('contact').hidden = true; }
    if (S.detail && S.detail.media.length > 1) { if (e.key === 'ArrowRight') { S.slide++; renderSlide(); } if (e.key === 'ArrowLeft') { S.slide--; renderSlide(); } }
  });

  /* ---------- lápis de carvão ---------- */
  var cv = $('sketch'), page = $('page'), cur = $('pcur'), stroke = null;
  var growCanvas = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), cw = cv._cw || 0, ch = cv._ch || 0;
    var W = Math.max(cw, page.clientWidth), H = Math.max(ch, page.scrollHeight);
    if (W === cw && H === ch && cv._dpr === dpr) return;
    var old = null;
    if (cw && ch) { old = document.createElement('canvas'); old.width = cv.width; old.height = cv.height; old.getContext('2d').drawImage(cv, 0, 0); }
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    if (old) cv.getContext('2d').drawImage(old, 0, 0);
    cv._cw = W; cv._ch = H; cv._dpr = dpr;
  };
  var charcoal = function (x0, y0, x1, y1, pr, speed) {
    var ctx = cv.getContext('2d'), d = cv._dpr || 1, dx = x1 - x0, dy = y1 - y0, dist = Math.hypot(dx, dy);
    var ux = dist ? dx / dist : 1, uy = dist ? dy / dist : 0, steps = Math.max(1, Math.ceil(dist / 0.7));
    var width = (4.2 + pr * 5) * Math.max(0.7, 1 - speed * 0.02);
    ctx.fillStyle = '#1E1712'; ctx.strokeStyle = '#1E1712';
    for (var i = 0; i < steps; i++) {
      var t = i / steps, x = x0 + dx * t, y = y0 + dy * t;
      for (var k = 0; k < 9; k++) {
        var off = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5 * width;
        var px = x - uy * off + (Math.random() - 0.5) * 1.2, py = y + ux * off + (Math.random() - 0.5) * 1.2, sz = (0.4 + Math.random() * 1.3) * d;
        ctx.globalAlpha = (0.07 + Math.random() * 0.3) * (1 - Math.abs(off) / (width * 1.6));
        ctx.fillRect(px * d, py * d, sz, sz);
      }
      if (Math.random() < 0.35) {
        var o2 = (Math.random() - 0.5) * width * 1.4, len = 1.5 + Math.random() * 4;
        ctx.globalAlpha = 0.05 + Math.random() * 0.12; ctx.lineWidth = (0.6 + Math.random()) * d;
        ctx.beginPath(); ctx.moveTo((x - uy * o2) * d, (y + ux * o2) * d); ctx.lineTo((x - uy * o2 + ux * len) * d, (y + ux * o2 + uy * len) * d); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  };
  var local = function (e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  cv.addEventListener('pointerdown', function (e) {
    growCanvas();
    if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId);
    var p = local(e); stroke = p; charcoal(p.x, p.y, p.x + 0.5, p.y + 0.5, 0.5, 0);
    e.preventDefault();
  });
  cv.addEventListener('pointermove', function (e) {
    if (!stroke) return;
    var p = local(e), pr = e.pressure && e.pointerType === 'pen' ? e.pressure : 0.5;
    charcoal(stroke.x, stroke.y, p.x, p.y, pr, Math.hypot(p.x - stroke.x, p.y - stroke.y)); stroke = p;
  });
  var up = function () { stroke = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  page.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    cur.style.display = e.target === cv ? 'block' : 'none';
    cur.style.transform = 'translate(' + (e.clientX - 1.5) + 'px,' + (e.clientY - 23) + 'px)';
  });
  page.addEventListener('pointerleave', function () { cur.style.display = 'none'; });

  /* ---------- arranque ---------- */
  var sf = store.sget('odiogo-filter'); if (sf && FL.indexOf(sf) >= 0) S.filter = sf;
  var startView = (location.hash === '#projetos' || location.hash === '#projects' || store.sget('odiogo-view') === 'projects') ? 'projects' : 'card';
  applyFlip();
  S.mobile = isMobile();
  setView(startView);
  window.addEventListener('resize', function () { S.x = 0; S.y = 0; fit(); growCanvas(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); growCanvas(); });
  setTimeout(function () { fit(); growCanvas(); }, 400);
})();
