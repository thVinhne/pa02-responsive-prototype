/* GradStudio services interactions run locally in the browser. */
(() => {
  'use strict';
  const video = document.getElementById('services-hero-video');
  const toggle = document.querySelector('[data-services-video-toggle]');
  if (!video || !toggle || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const overlays = Array.from(document.querySelectorAll('dialog'));
  let inView = false;
  let userPaused = false;
  let failed = false;

  function updateLabel() {
    toggle.textContent = video.paused ? 'Phát video nền' : 'Tạm dừng video nền';
  }

  function updatePlayback() {
    const enabled = !reducedMotion.matches && !failed;
    toggle.hidden = !enabled;
    if (!enabled || userPaused || !inView || document.hidden || overlays.some(overlay => overlay.open)) {
      video.pause();
      if (!enabled && video.hasAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
      return;
    }

    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    video.play().catch(updateLabel);
  }

  toggle.addEventListener('click', () => {
    userPaused = !video.paused;
    updatePlayback();
  });
  video.addEventListener('play', updateLabel);
  video.addEventListener('pause', updateLabel);
  video.addEventListener('error', () => {
    failed = true;
    updatePlayback();
  });
  reducedMotion.addEventListener('change', updatePlayback);
  document.addEventListener('visibilitychange', updatePlayback);

  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.intersectionRatio >= 0.1;
    updatePlayback();
  }, { threshold: 0.1 });
  visibility.observe(video);

  const overlayObserver = new MutationObserver(updatePlayback);
  overlays.forEach(overlay => {
    overlayObserver.observe(overlay, { attributes: true, attributeFilter: ['open'] });
  });
})();

(() => {
  'use strict';
  const album = document.querySelector('[data-services-album]');
  if (!album) return;

  const slides = Array.from(album.querySelectorAll('[data-services-slide]'));
  const companions = Array.from(album.querySelectorAll('[data-services-companion]'));
  const picks = Array.from(album.querySelectorAll('[data-services-pick]'));
  const player = album.querySelector('[data-services-album-player]');
  const previous = album.querySelector('[data-services-previous]');
  const next = album.querySelector('[data-services-next]');
  const status = album.querySelector('[data-services-album-status]');
  const card = album.querySelector('[data-services-companion-card]');
  const front = album.querySelector('[data-services-front]');
  const back = album.querySelector('[data-services-back]');
  const flip = album.querySelector('[data-services-flip]');
  const unflip = album.querySelector('[data-services-unflip]');
  const noteTheme = album.querySelector('[data-services-note-theme]');
  const noteCopy = album.querySelector('[data-services-note-copy]');
  const noteConsult = album.querySelector('[data-services-note-consult]');
  const required = [
    player, previous, next, status, card, front, back, flip, unflip,
    noteTheme, noteCopy, noteConsult
  ];
  const paired = companions.length === slides.length && picks.length === slides.length;
  if (slides.length < 2 || !paired || required.some(element => !element)) return;

  let current = 0;

  function showNote(open) {
    front.hidden = open;
    back.hidden = !open;
    card.toggleAttribute('data-flipped', open);
  }

  function showSlide(index) {
    const selected = (index + slides.length) % slides.length;
    if (selected === current) return;

    slides[current].hidden = true;
    companions[current].hidden = true;
    picks[current].setAttribute('aria-pressed', 'false');
    slides[selected].hidden = false;
    companions[selected].hidden = false;
    picks[selected].setAttribute('aria-pressed', 'true');
    current = selected;

    const { theme, note, package: packageName } = slides[current].dataset;
    noteTheme.textContent = theme;
    noteCopy.textContent = note;
    noteConsult.dataset.package = packageName;
    showNote(false);

    status.textContent = slides[current].querySelector('figcaption').textContent;
  }

  previous.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));
  picks.forEach((pick, index) => pick.addEventListener('click', () => showSlide(index)));
  player.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1));
  });

  flip.addEventListener('click', () => {
    showNote(true);
    unflip.focus({ preventScroll: true });
  });
  unflip.addEventListener('click', () => {
    showNote(false);
    flip.focus({ preventScroll: true });
  });
  card.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || back.hidden) return;
    event.preventDefault();
    showNote(false);
    flip.focus({ preventScroll: true });
  });

  album.dataset.servicesReady = '';
  player.hidden = false;
  flip.hidden = false;
})();

(() => {
  'use strict';
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const covers = Array.from(gallery.querySelectorAll('[data-services-gallery-cover]'));
  const books = Array.from(gallery.querySelectorAll('[data-services-gallery-theme]'), section => ({
    section,
    theme: section.dataset.servicesGalleryTheme,
    cover: covers.find(link => link.hash === '#' + section.id),
    spreads: Array.from(section.querySelectorAll('[data-services-gallery-spread]')),
    controls: section.querySelector('[data-services-gallery-controls]'),
    previous: section.querySelector('[data-services-gallery-previous]'),
    next: section.querySelector('[data-services-gallery-next]'),
    status: section.querySelector('[data-services-gallery-status]'),
    close: section.querySelector('[data-services-gallery-close]'),
    index: 0
  }));
  if (!books.length || books.some(book =>
    !book.spreads.length || !book.cover || !book.controls || !book.previous ||
    !book.next || !book.status || !book.close
  )) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const albumMotions = new Set();

  function cancelAlbumMotion() {
    albumMotions.forEach(motion => motion.cancel());
    albumMotions.clear();
  }

  function animateAlbumPart(element, keyframes, duration, easing = 'ease-out') {
    if (reducedMotion.matches || typeof element?.animate !== 'function') return null;

    const motion = element.animate(keyframes, { duration, easing });
    albumMotions.add(motion);
    return motion;
  }

  async function waitForAlbumMotion(motion) {
    try {
      await motion.finished;
    } catch {
      return false;
    }
    return albumMotions.has(motion);
  }

  function isPlainClick(event) {
    return event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
  }

  function showSpread(book, index) {
    if (index < 0 || index >= book.spreads.length) return;

    const focused = document.activeElement;
    book.index = index;
    book.spreads.forEach((spread, position) => { spread.hidden = position !== index; });
    const firstPage = index * 2 + 1;
    book.status.textContent = `Trang ${firstPage}–${firstPage + 1} / ${book.spreads.length * 2}`;
    book.previous.disabled = index === 0;
    book.next.disabled = index === book.spreads.length - 1;

    if (focused === book.next && book.next.disabled) book.previous.focus({ preventScroll: true });
    if (focused === book.previous && book.previous.disabled) book.next.focus({ preventScroll: true });
  }

  async function rotateLeaf(spread, from, front, back, revealed = null) {
    const outgoing = spread.children[from];
    const [first, second] = spread.children;
    const stacked = first.offsetLeft === second.offsetLeft;
    const gap = stacked
      ? second.offsetTop - first.offsetTop - first.offsetHeight
      : second.offsetLeft - first.offsetLeft - first.offsetWidth;
    const hinge = from === 0 ? `calc(100% + ${gap / 2}px)` : `${-gap / 2}px`;
    const rotate = stacked ? 'rotateX' : 'rotateY';
    // A page should lift toward the viewer on either side of the spine.
    const angle = (from === 0 ? 1 : -1) * (stacked ? -180 : 180);

    const layer = document.createElement('div');
    layer.className = 'services-gallery-turn-layer';
    layer.inert = true;
    layer.setAttribute('aria-hidden', 'true');

    const leaf = document.createElement('div');
    leaf.className = 'services-gallery-turn-leaf';
    leaf.style.transformOrigin = stacked ? `center ${hinge}` : `${hinge} center`;
    back.style.transform = `${rotate}(180deg)`;
    leaf.append(front, back);

    const bounds = {
      left: `${outgoing.offsetLeft}px`,
      top: `${outgoing.offsetTop}px`,
      width: `${outgoing.offsetWidth}px`,
      height: `${outgoing.offsetHeight}px`
    };
    if (revealed) {
      revealed.classList.add('services-gallery-turn-reveal');
      Object.assign(revealed.style, bounds);
      layer.append(revealed);
    }
    Object.assign(leaf.style, bounds);
    layer.append(leaf);
    layer.querySelectorAll('img[loading="lazy"]').forEach(image => { image.loading = 'eager'; });
    spread.append(layer);

    const motion = animateAlbumPart(leaf, [
      { transform: `${rotate}(0deg)` },
      { transform: `${rotate}(${angle}deg)` }
    ], 540, 'ease-in-out');
    try {
      return !motion || await waitForAlbumMotion(motion);
    } finally {
      layer.remove();
      albumMotions.delete(motion);
    }
  }

  async function turnSpread(book, direction) {
    const target = book.index + direction;
    if (book.section.hidden || target < 0 || target >= book.spreads.length) return;

    cancelAlbumMotion();
    const current = book.spreads[book.index];
    if (reducedMotion.matches || typeof current.animate !== 'function') {
      showSpread(book, target);
      return;
    }

    const from = direction > 0 ? 1 : 0;
    const next = book.spreads[target];
    const finished = await rotateLeaf(
      current, from, current.children[from].cloneNode(true),
      next.children[1 - from].cloneNode(true), next.children[from].cloneNode(true)
    );
    if (finished) showSpread(book, target);
  }

  async function openCover(book) {
    const spread = book.spreads[0];
    const picture = book.cover.querySelector('img');
    const title = book.cover.querySelector('.services-gallery-cover-title');
    if (!picture || !title || reducedMotion.matches || typeof spread.animate !== 'function') return;

    const front = document.createElement('div');
    front.className = 'services-gallery-page services-gallery-opening-cover';
    front.append(picture.cloneNode(true), title.cloneNode(true));
    const inside = spread.firstElementChild.cloneNode(true);
    spread.classList.add('services-gallery-spread--opening');
    spread.inert = true;
    try {
      await rotateLeaf(spread, 1, front, inside);
    } finally {
      spread.inert = false;
      spread.classList.remove('services-gallery-spread--opening');
    }
  }

  function openBook(selected, unfold = false) {
    if (selected?.cover.hidden) return;

    const focusWasOnCover = selected?.cover === document.activeElement;
    cancelAlbumMotion();
    books.forEach(book => {
      const expanded = book === selected;
      book.section.hidden = !expanded;
      book.cover.hidden = expanded;
    });
    if (!selected) return;

    showSpread(selected, 0);
    if (focusWasOnCover) selected.close.focus({ preventScroll: true });
    if (unfold) openCover(selected);
  }

  async function pickBook(book) {
    cancelAlbumMotion();
    const lift = animateAlbumPart(book.cover, [
      { transform: 'translateY(0) rotate(0deg) scale(1)' },
      { transform: 'translateY(-12px) rotate(-2deg) scale(1.025)', offset: 0.7 },
      { transform: 'translateY(-7px) rotate(-1deg) scale(1.012)' }
    ], 180);
    if (lift && !(await waitForAlbumMotion(lift))) return;

    openBook(book, true);
    if (location.hash !== book.cover.hash) {
      // Keep the deep link without triggering native fragment scrolling.
      history.pushState(history.state, '', book.cover.hash);
    }
  }

  books.forEach(book => {
    book.cover.setAttribute('aria-controls', book.section.id);
    book.cover.addEventListener('click', event => {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      if (!book.cover.hidden) pickBook(book);
    });
    book.previous.addEventListener('click', () => turnSpread(book, -1));
    book.next.addEventListener('click', () => turnSpread(book, 1));
    book.close.addEventListener('click', () => {
      openBook(null);
      book.cover.focus();
    });
    book.controls.hidden = false;
    book.close.hidden = false;
  });

  const viewCollection = document.querySelector('[data-services-view-collection]');
  viewCollection?.addEventListener('click', event => {
    if (!isPlainClick(event)) return;
    const activeSlide = document.querySelector('[data-services-slide]:not([hidden])');
    const book = books.find(item => item.theme === activeSlide?.dataset.servicesCollection);
    if (book) openBook(book, true);
  });

  function bookFromHash() {
    return books.find(book => '#' + book.section.id === location.hash);
  }

  window.addEventListener('hashchange', () => {
    const book = bookFromHash();
    if (book?.section.hidden) openBook(book);
  });

  const dialog = gallery.querySelector('[data-services-gallery-dialog]');
  const enlarged = dialog?.querySelector('[data-services-gallery-enlarged]');
  const caption = dialog?.querySelector('#services-gallery-image-title');
  if (typeof dialog?.showModal === 'function' && enlarged && caption) {
    let opener;
    gallery.addEventListener('click', event => {
      const link = event.target.closest('[data-services-gallery-photo]');
      if (!link || !isPlainClick(event)) return;

      const image = link.querySelector('img');
      const label = link.closest('figure')?.querySelector('figcaption');
      if (!image || !label) return;
      event.preventDefault();
      opener = link;
      enlarged.src = link.href;
      enlarged.alt = image.alt;
      caption.textContent = label.textContent;
      dialog.showModal();
    });
    dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  }

  openBook(bookFromHash());
})();

(() => {
  'use strict';
  const packageName = document.getElementById('selected-package');
  const chat = document.getElementById('studio-chat');
  const toggle = document.getElementById('chat-toggle');
  if (!packageName || !chat || !toggle) return;

  document.querySelectorAll('a[href="#chat"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (link.dataset.package) packageName.textContent = link.dataset.package;
      chat.open = true;
      toggle.focus({ preventScroll: true });
    });
  });

  if (location.hash === '#chat') chat.open = true;

  chat.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !chat.open) return;
    event.preventDefault();
    chat.open = false;
    toggle.focus({ preventScroll: true });
  });
})();
