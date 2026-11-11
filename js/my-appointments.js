/* Optional interaction layer. One booking, in-memory state, no network or storage. */
(() => {
  'use strict';

  const get = id => document.getElementById(id);
  const collection = get('ap-collection');
  const result = get('ap-result');
  const journal = get('ap-journal');
  const empty = get('ap-empty');
  const filters = Array.from(document.querySelectorAll('input[name="appointment-filter"]'));
  const days = Array.from(document.querySelectorAll('[data-ap-day]'));
  const firstDay = Number(days[0].dataset.apDay);
  const filmTrack = get('ap-film-track');
  const filmPrevious = get('ap-film-prev');
  const filmNext = get('ap-film-next');
  const filmCurrent = get('ap-film-current');
  const stateContent = document.querySelectorAll('[data-ap-state]');
  const checklist = Array.from(document.querySelectorAll('[data-ap-check]'));
  const details = document.querySelectorAll('[data-ap-detail]');
  const notebook = get('ap-notebook');
  const notebookNext = get('ap-notebook-next');
  const notebookBack = get('ap-notebook-back');
  const imageLinks = document.querySelectorAll('[data-ap-image]');
  const photoPins = document.querySelectorAll('[data-ap-pin]');
  const largeImages = document.querySelectorAll('[data-ap-large-image]');
  const imageDialog = get('ap-image-dialog');
  const resetButton = get('ap-reset');
  const announcement = get('ap-announcement');
  const state = { status: 'pending', day: 24, filter: 'all' };
  let imageOpener = null;
  let filmDrag = null;
  let suppressFilmClick = false;
  const studio = createStudio();

  function bookingVisible() {
    return state.day === 24 && (state.filter === 'all' || state.filter === state.status);
  }

  function render() {
    const onBookingDay = state.day === 24;
    const visible = bookingVisible();
    get('ap-count-all').textContent = onBookingDay ? '1' : '0';
    get('ap-count-pending').textContent = onBookingDay && state.status === 'pending' ? '1' : '0';
    get('ap-count-booked').textContent = onBookingDay && state.status === 'booked' ? '1' : '0';
    get('ap-count-completed').textContent = '0';
    collection.dataset.apStatus = state.status;
    filters.forEach(input => { input.checked = input.value === state.filter; });
    const frame = state.day - firstDay;
    days.forEach((button, index) => {
      button.setAttribute('aria-pressed', String(index === frame));
      button.tabIndex = index === frame ? 0 : -1;
    });
    filmTrack.style?.setProperty('--ap-film-index', String(frame));
    filmPrevious.setAttribute('aria-disabled', String(frame === 0));
    filmNext.setAttribute('aria-disabled', String(frame === days.length - 1));
    const frameLabel = `Khung ${String(frame + 1).padStart(2, '0')} / ${String(days.length).padStart(2, '0')} · Ngày ${state.day}/10`;
    if (filmCurrent.textContent !== frameLabel) filmCurrent.textContent = frameLabel;
    stateContent.forEach(node => {
      node.hidden = node.dataset.apState !== state.status;
    });
    result.hidden = !visible;
    journal.hidden = !visible;
    empty.hidden = visible;
  }

  function updateProgress() {
    const count = checklist.filter(input => input.checked).length;
    get('ap-progress-count').textContent = String(count);
    get('ap-progress-meter').value = count;
  }

  function setNotebookPage(page, focusTarget) {
    notebook.dataset.apPage = page;
    notebook.dataset.apTurning = String(Boolean(focusTarget));
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  }

  function resetDemo() {
    clearFilmDrag();
    state.status = 'pending';
    state.day = 24;
    state.filter = 'all';
    checklist.forEach(input => { input.checked = false; });
    details.forEach(detail => { detail.open = false; });
    notebook.open = true;
    setNotebookPage('1');
    photoPins.forEach(pin => pin.setAttribute('aria-pressed', 'true'));
    studio.reset();
    if (imageDialog.open) imageDialog.close('reset');
    else imageDialog.returnValue = '';
    largeImages.forEach(figure => { figure.hidden = true; });
    render();
    updateProgress();
    announcement.textContent = 'Đã đặt lại demo: ngày 24, Tất cả, một booking Chờ cọc và 0/3 việc chuẩn bị.';
    resetButton.focus();
  }

  filters.forEach(input => input.addEventListener('change', () => {
    state.filter = input.value;
    render();
  }));

  function selectFilmFrame(index, focus = false) {
    clearFilmDrag();
    const button = days[Math.max(0, Math.min(days.length - 1, index))];
    const day = Number(button.dataset.apDay);
    if (state.day !== day) {
      state.day = day;
      render();
    }
    if (focus) button.focus({ preventScroll: true });
  }

  days.forEach((button, index) => button.addEventListener('click', () => selectFilmFrame(index)));
  filmPrevious.addEventListener('click', () => selectFilmFrame(state.day - firstDay - 1));
  filmNext.addEventListener('click', () => selectFilmFrame(state.day - firstDay + 1));

  filmTrack.addEventListener('keydown', event => {
    if (event.key === 'Escape' && filmDrag) {
      event.preventDefault();
      clearFilmDrag();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const index = state.day - firstDay;
    const targets = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: days.length - 1 };
    if (!Object.hasOwn(targets, event.key)) return;
    event.preventDefault();
    selectFilmFrame(targets[event.key], true);
  });

  function clearFilmDrag() {
    if (!filmDrag) return;
    const { id, active } = filmDrag;
    filmDrag = null;
    if (active) suppressFilmClick = true;
    filmTrack.dataset.apDragging = 'false';
    filmTrack.style.setProperty('--ap-film-drag', '0px');
    if (filmTrack.hasPointerCapture?.(id)) filmTrack.releasePointerCapture(id);
  }

  function filmOffset(x) {
    const { frame, width, startX, offset } = filmDrag;
    return Math.max(-frame * width, Math.min((days.length - 1 - frame) * width, x - startX + offset));
  }

  filmTrack.addEventListener('pointerdown', event => {
    if (filmDrag || event.button !== 0 || event.isPrimary === false) return;
    suppressFilmClick = false;
    const width = filmTrack.getBoundingClientRect().width / days.length;
    if (width === 0) return;
    filmDrag = { id: event.pointerId, startX: event.clientX, startY: event.clientY,
      frame: state.day - firstDay, width, offset: 0, active: false };
  });
  filmTrack.addEventListener('pointermove', event => {
    if (!filmDrag || filmDrag.id !== event.pointerId) return;
    const distance = Math.abs(event.clientX - filmDrag.startX);
    if (!filmDrag.active) {
      if (distance < 6 || distance <= Math.abs(event.clientY - filmDrag.startY)) return;
      if (typeof window.DOMMatrixReadOnly === 'function') {
        const transform = window.getComputedStyle(filmTrack, '::before').transform;
        if (transform !== 'none') filmDrag.offset = new window.DOMMatrixReadOnly(transform).m41 - filmDrag.frame * filmDrag.width;
      }
      filmDrag.active = true;
      filmTrack.dataset.apDragging = 'true';
      filmTrack.setPointerCapture?.(event.pointerId);
    }
    event.preventDefault();
    filmTrack.style.setProperty('--ap-film-drag', `${filmOffset(event.clientX)}px`);
  });
  filmTrack.addEventListener('pointerup', event => {
    if (!filmDrag || filmDrag.id !== event.pointerId) return;
    const { active, frame, width } = filmDrag;
    const target = Math.round(frame + filmOffset(event.clientX) / width);
    clearFilmDrag();
    if (!active) return;
    selectFilmFrame(target, days.includes(document.activeElement));
  });
  filmTrack.addEventListener('pointercancel', event => {
    if (filmDrag?.id === event.pointerId) clearFilmDrag();
  });
  filmTrack.addEventListener('lostpointercapture', event => {
    if (event.target === filmTrack && filmDrag?.id === event.pointerId) clearFilmDrag();
  });
  filmTrack.addEventListener('pointerleave', event => {
    if (filmDrag?.id === event.pointerId && !filmDrag.active) clearFilmDrag();
  });
  filmTrack.addEventListener('click', event => {
    if (!suppressFilmClick || event.detail === 0) return;
    suppressFilmClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  checklist.forEach(input => input.addEventListener('change', updateProgress));
  notebookNext.addEventListener('click', () => setNotebookPage('2', get('ap-studio-info')));
  notebookBack.addEventListener('click', () => setNotebookPage('1', notebookNext));
  photoPins.forEach(pin => {
    pin.addEventListener('click', () => {
      pin.setAttribute('aria-pressed', String(pin.getAttribute('aria-pressed') !== 'true'));
    });
    pin.hidden = false;
  });
  resetButton.addEventListener('click', resetDemo);
  get('ap-show-booking').addEventListener('click', () => {
    clearFilmDrag();
    state.day = 24;
    state.filter = 'all';
    render();
    get('ap-day-24').focus();
  });

  const supportsModal = dialog => typeof dialog.showModal === 'function' && typeof dialog.close === 'function';
  const dialogOpen = () => imageDialog.open;

  if (supportsModal(imageDialog)) {
    imageLinks.forEach(link => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.setAttribute('aria-controls', 'ap-image-dialog');
      link.addEventListener('click', event => {
        // Modified clicks retain the real local-file link.
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (dialogOpen()) return;
        largeImages.forEach(figure => {
          figure.hidden = figure.dataset.apLargeImage !== link.dataset.apImage;
        });
        imageOpener = link;
        imageDialog.returnValue = '';
        studio.pauseForDialog();
        imageDialog.showModal();
      });
    });
    imageDialog.addEventListener('close', () => {
      const outcome = imageDialog.returnValue;
      imageDialog.returnValue = '';
      studio.sync();
      if (outcome === 'reset') resetButton.focus();
      else if (imageOpener) imageOpener.focus();
    });
  }

  if (typeof window.print === 'function') {
    get('ap-print').addEventListener('click', () => { window.print(); });
    get('ap-print').hidden = false;
  }

  function createStudio() {
    const root = get('ap-studio'), stage = get('ap-studio-stage');
    const noop = { reset() {}, sync() {}, pauseForDialog() {} };
    if (!root || !stage || typeof stage.getBoundingClientRect !== 'function') return noop;
    const cards = Array.from(root.querySelectorAll('[data-ap-card]'));
    const objects = cards.map((card, i) => get('ap-studio-object-' + (i + 1)));
    const fronts = cards.map((card, i) => get('ap-photo-front-' + (i + 1)));
    const backs = cards.map((card, i) => get('ap-photo-back-' + (i + 1)));
    const clips = [1, 2, 3].map(i => get('ap-studio-clip-' + i));
    const camera = get('ap-studio-camera'), counter = get('ap-studio-count'), basket = get('ap-studio-basket');
    const status = get('ap-studio-status');
    const media = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    const blank = () => ({ created: false, placement: 'inactive', slot: null, x: 0, y: 0,
      angle: 0, vx: 0, vy: 0, spin: 0, face: 'front', tone: 'original', serial: 0, source: 0 });
    const photos = cards.map(blank), memories = [-1, -1, -1];
    const paintedPhotos = cards.map(() => ({})), paintedClips = clips.map(() => ({}));
    const names = ['Ngày nhận bằng', 'Cùng nhau lớn lên', 'Những ngày bên nhau'];
    const effects = new Set(), flips = new Map();
    let width = 1, height = 1, sizes = [], anchors = [], basketTop = 0;
    let paintedCount, paintedBusy;
    let visible = true, drag = null, canceledPointer = null, suppressedClick = null;
    let busy = false, printing = null, serial = 0, cameraEpoch = 0;
    let frame = null, motionEpoch = 0, motionStart = 0, lastFrame = 0, quietFrames = 0;
    const now = () => typeof performance !== 'undefined' ? performance.now() : Date.now();
    const dialogsOpen = () => imageDialog.open;
    const canMove = () => !media.matches && visible && !document.hidden && !dialogsOpen();
    const ready = i => photos[i].created && photos[i].placement !== 'printing';
    const owner = slot => photos.findIndex(p => p.created && p.placement === 'hung' && p.slot === slot);
    const free = () => photos.map((p, i) => i).filter(i => ready(i) && photos[i].placement === 'free');
    const gripTurning = () => drag?.active && Math.abs(photos[drag.i].angle - drag.hangingAngle) > 0.2;

    function measure() {
      const box = stage.getBoundingClientRect();
      const sceneWidth = stage.clientWidth || box.width;
      const clipAnchors = clips.map(clip => {
        const position = clip.getBoundingClientRect();
        return { x: position.left - box.left + position.width / 2, y: position.bottom - box.top - 4 };
      });
      return {
        width: sceneWidth, height: stage.clientHeight || box.height, anchors: clipAnchors,
        basketTop: basket.offsetTop,
        sizes: cards.map(card => ({ width: card.offsetWidth || sceneWidth * 0.28, height: card.offsetHeight || 110 }))
      };
    }
    function setGeometry(geometry) {
      ({ width, height, sizes, anchors, basketTop } = geometry);
    }
    function rect(i) {
      const p = photos[i], size = sizes[i];
      if (size.angle !== p.angle) {
        const a = p.angle * Math.PI / 180;
        const cos = Math.abs(Math.cos(a)), sin = Math.abs(Math.sin(a));
        size.rx = (cos * size.width + sin * size.height) / 2;
        size.ry = (sin * size.width + cos * size.height) / 2;
        size.angle = p.angle;
      }
      return { x: p.x + size.width / 2, y: p.y + size.height / 2, rx: size.rx, ry: size.ry };
    }
    function constrain(i, bounce = false) {
      const p = photos[i], r = rect(i), size = sizes[i];
      const x = Math.max(7 + r.rx, Math.min(width - 7 - r.rx, r.x));
      const y = Math.max(7 + r.ry, Math.min(height - 12 - r.ry, r.y));
      if (bounce && x !== r.x) p.vx *= -0.15;
      if (bounce && y < r.y) {
        p.vy = Math.abs(p.vy) > 120 ? -p.vy * 0.18 : 0;
        p.vx *= 0.91;
        p.spin *= 0.82;
      }
      p.x = x - size.width / 2;
      p.y = y - size.height / 2;
    }
    function home(i, slot) {
      const anchor = anchors[slot];
      return { x: anchor.x - sizes[i].width / 2, y: anchor.y, angle: [-2, 1, -1][slot] };
    }
    function closestFree(slot) {
      const remembered = memories[slot];
      if (remembered >= 0 && ready(remembered) && photos[remembered].placement === 'free') return remembered;
      const anchor = anchors[slot];
      let nearest = -1, distance = Infinity;
      photos.forEach((p, i) => {
        if (!p.created || p.placement !== 'free') return;
        const dx = p.x + sizes[i].width / 2 - anchor.x, dy = p.y - anchor.y;
        const squared = dx * dx + dy * dy;
        if (squared < distance) { distance = squared; nearest = i; }
      });
      return nearest;
    }
    function draw() {
      photos.forEach((p, i) => {
        const card = cards[i], previous = paintedPhotos[i];
        if (previous.created !== p.created) {
          card.hidden = !p.created;
          card.dataset.apCreated = String(p.created);
        }
        if (previous.placement !== p.placement) card.dataset.apPlacement = p.placement;
        if (previous.slot !== p.slot) card.dataset.apSlot = p.slot === null ? '' : String(p.slot + 1);
        if (previous.face !== p.face) {
          card.dataset.apFace = p.face;
          fronts[i].setAttribute('aria-hidden', String(p.face !== 'front'));
          backs[i].setAttribute('aria-hidden', String(p.face !== 'back'));
        }
        if (previous.tone !== p.tone) card.dataset.apTone = p.tone;
        if (previous.x !== p.x) card.style.left = p.x + 'px';
        if (previous.y !== p.y) card.style.top = p.y + 'px';
        if (previous.angle !== p.angle) card.style.setProperty('--ap-card-angle', p.angle + 'deg');
        const hung = p.placement === 'hung', disabled = busy || p.placement === 'printing';
        if (previous.serial !== p.serial || previous.hung !== hung) {
          const description = names[p.source] + ', ảnh minh họa ' + p.serial;
          objects[i].setAttribute('aria-label', (hung ? 'Thả ảnh ' : 'Lật ảnh ') + description);
        }
        if (previous.disabled !== disabled) objects[i].setAttribute('aria-disabled', String(disabled));
        Object.assign(previous, p, { hung, disabled });
      });
      clips.forEach((clip, slot) => {
        const i = owner(slot);
        if (i >= 0) memories[slot] = i;
        const candidate = i >= 0 ? i : closestFree(slot);
        const serial = photos[candidate]?.serial, disabled = busy || candidate < 0;
        const previous = paintedClips[slot];
        if (previous.disabled !== disabled) clip.disabled = disabled;
        if (previous.owner !== i) clip.dataset.apOccupied = i < 0 ? '' : String(i + 1);
        if (previous.owner !== i || previous.candidate !== candidate || previous.serial !== serial) {
          clip.setAttribute('aria-label', candidate < 0 ? 'Kẹp ' + (slot + 1) + ', chưa có ảnh để treo'
            : (i >= 0 ? 'Thả ảnh minh họa ' : 'Treo ảnh minh họa ') + serial + ' ở kẹp ' + (slot + 1));
          clip.setAttribute('aria-controls', candidate < 0 ? 'ap-studio-basket' : cards[candidate].id);
        }
        Object.assign(previous, { owner: i, candidate, serial, disabled });
      });
      const count = photos.filter(p => p.created).length + '/' + photos.length + ' ảnh · ' + photos.filter(p => p.placement === 'hung').length + '/' + clips.length + ' treo';
      if (paintedCount !== count) { counter.textContent = count; paintedCount = count; }
      if (paintedBusy !== busy) {
        root.dataset.apBusy = String(busy);
        camera.setAttribute('aria-busy', String(busy));
        camera.setAttribute('aria-disabled', String(busy));
        paintedBusy = busy;
      }
    }
    function cancelEffects() {
      effects.forEach(animation => animation.cancel()); effects.clear();
      flips.forEach(animation => animation.cancel()); flips.clear();
    }
    function animate(element, frames, options) {
      if (!canMove() || typeof element.animate !== 'function') return Promise.resolve();
      const animation = element.animate(frames, options);
      effects.add(animation);
      return animation.finished.catch(() => {}).then(() => effects.delete(animation));
    }
    function release(i, vx = 0, vy = 30) {
      const p = photos[i];
      p.placement = 'free'; p.slot = null; p.vx = vx; p.vy = vy; p.spin = vx * 0.03;
    }
    function pin(i, slot) {
      const p = photos[i];
      Object.assign(p, home(i, slot), { placement: 'hung', slot, vx: 0, vy: 0, spin: 0 });
      constrain(i);
    }
    function hang(i, slot, origin = photos[i].slot, displaced = owner(slot)) {
      if (!ready(i) || busy) return;
      const before = { ...photos[i] };
      if (displaced >= 0 && displaced !== i && ready(displaced)) {
        if (origin !== null && origin !== slot && (owner(origin) < 0 || owner(origin) === i)) pin(displaced, origin);
        else release(displaced, displaced % 2 ? 45 : -45, 60);
      }
      pin(i, slot);
      draw();
      animate(cards[i], [
        { transform: 'translate(' + (before.x - photos[i].x) + 'px,' + (before.y - photos[i].y) + 'px) rotate(' + before.angle + 'deg)' },
        { transform: 'translate(0,0) rotate(' + photos[i].angle + 'deg)' }
      ], { duration: 320, easing: 'ease-out' });
      wake();
      status.textContent = 'Đã treo ảnh minh họa ' + photos[i].serial + ' ở kẹp ' + (slot + 1) + '.';
    }

    function contacts(held = -1, pushing = false) {
      const gap = 1;
      for (let pass = 0; pass < 5; pass++) {
        let adjusted = false;
        for (let i = 0; i < photos.length; i++) for (let j = i + 1; j < photos.length; j++) {
          const a = photos[i], b = photos[j];
          if (!ready(i) || !ready(j) || (a.placement === 'hung' && b.placement === 'hung')) continue;
          const ar = rect(i), br = rect(j), dx = br.x - ar.x, dy = br.y - ar.y;
          const ox = ar.rx + br.rx + gap - Math.abs(dx), oy = ar.ry + br.ry + gap - Math.abs(dy);
          if (ox <= 0 || oy <= 0) continue;
          if (pushing && (held === i || held === j)) {
            if (a.placement === 'hung' && held !== i) release(i, photos[held].vx * 0.25, 30);
            if (b.placement === 'hung' && held !== j) release(j, photos[held].vx * 0.25, 30);
          }
          const ia = i === held || a.placement === 'hung' ? 0 : 1;
          const ib = j === held || b.placement === 'hung' ? 0 : 1;
          if (ia + ib === 0) continue;
          adjusted = true;
          const horizontal = ox < oy;
          const nx = horizontal ? (dx < 0 ? -1 : 1) : 0, ny = horizontal ? 0 : (dy < 0 ? -1 : 1);
          const penetration = (horizontal ? ox : oy) + 0.02;
          a.x -= nx * penetration * ia / (ia + ib); a.y -= ny * penetration * ia / (ia + ib);
          b.x += nx * penetration * ib / (ia + ib); b.y += ny * penetration * ib / (ia + ib);
          const velocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (velocity < 0) {
            const restitution = velocity < -80 ? 0.14 : 0;
            const impulse = -(1 + restitution) * velocity / (ia + ib);
            a.vx -= impulse * nx * ia; a.vy -= impulse * ny * ia;
            b.vx += impulse * nx * ib; b.vy += impulse * ny * ib;
            if (restitution) {
              const lever = horizontal ? nx * dy / (ar.ry + br.ry) : -ny * dx / (ar.rx + br.rx);
              const twist = impulse * lever * 0.24;
              a.spin += twist * ia; b.spin += twist * ib;
            }
          }
          if (ia) constrain(i); if (ib) constrain(j);
          if (held === i || held === j) {
            const nextA = rect(i), nextB = rect(j);
            const rx = nextA.rx + nextB.rx + gap - Math.abs(nextB.x - nextA.x);
            const ry = nextA.ry + nextB.ry + gap - Math.abs(nextB.y - nextA.y);
            if (rx > 0 && ry > 0) {
              const remainder = (horizontal ? rx : ry) + 0.02;
              const heldPhoto = photos[held], direction = held === i ? -1 : 1;
              heldPhoto.x += direction * nx * remainder;
              heldPhoto.y += direction * ny * remainder;
              constrain(held);
            }
          }
        }
        if (!adjusted) break;
      }
    }
    function step(dt) {
      const held = drag && drag.active ? drag.i : -1;
      photos.forEach((p, i) => {
        if (!ready(i) || p.placement !== 'free' || i === held) return;
        p.vy += 2100 * dt;
        p.vx *= Math.exp(-0.9 * dt);
        p.x += p.vx * dt; p.y += p.vy * dt;
        const lean = Math.max(0, Math.abs(p.angle) - 8) * Math.sign(p.angle);
        p.spin -= lean * 18 * dt;
        const angleLimit = Math.max(24, Math.abs(p.angle));
        p.angle = Math.max(-angleLimit, Math.min(angleLimit, p.angle + p.spin * dt));
        p.spin *= Math.exp(-2 * dt);
        constrain(i, true);
      });
      contacts(held, held >= 0);
    }
    function settleFree() {
      const columns = [0, 0, 0];
      const indices = free().sort((a, b) => photos[b].y - photos[a].y || photos[a].serial - photos[b].serial);
      if (!indices.length) return;
      const gap = 4;
      const usableWidth = width - 14;
      const widestCard = Math.max(...indices.map(i => sizes[i].width));
      const tallestCard = Math.max(...indices.map(i => sizes[i].height));
      // Keep enough horizontal room for three rotated cards in each row.
      const tiltRoom = (usableWidth - 2 * gap) / 3 - widestCard;
      const tiltLimit = Math.min(5, Math.max(0, tiltRoom / tallestCard * 180 / Math.PI));
      const angles = [-4, 3, -2, 5, -5, 1, -1, 4, -3];
      indices.forEach(i => {
        const angle = angles[(photos[i].serial - 1) % angles.length];
        photos[i].angle = Math.max(-tiltLimit, Math.min(tiltLimit, angle));
      });
      const footprints = indices.map(rect);
      const cellWidth = 2 * Math.max(...footprints.map(r => r.rx));
      const rowHeight = 2 * Math.max(...footprints.map(r => r.ry)) + gap;
      const play = Math.max(0, Math.min(2, (usableWidth - 3 * cellWidth - 2 * gap) / 6));
      const pitch = cellWidth + gap + 2 * play;
      indices.forEach((i, index) => {
        const p = photos[i];
        const offset = ((p.serial * 5 % 9) - 4) * play / 4;
        const target = column => (width - sizes[i].width) / 2 + (column - 1) * pitch + offset;
        const column = [0, 1, 2].sort((a, b) => (columns[a] - columns[b]) * width * 2
          + Math.abs(p.x - target(a)) - Math.abs(p.x - target(b)))[0];
        const r = footprints[index];
        p.x = target(column);
        p.y = height - 12 - r.ry - sizes[i].height / 2 - columns[column] * rowHeight;
        columns[column]++;
        p.vx = p.vy = p.spin = 0;
        constrain(i);
      });
      if (drag && drag.active) contacts(drag.i, true);
    }
    function needsRestLayout() {
      const loose = free().map(rect);
      return loose.some((a, i) => a.y - a.ry < basketTop || loose.slice(i + 1).some(b =>
        Math.abs(a.x - b.x) < a.rx + b.rx - 0.75 && Math.abs(a.y - b.y) < a.ry + b.ry - 0.75));
    }
    function stopMotion(settle = false) {
      motionEpoch++;
      if (frame !== null && typeof window.cancelAnimationFrame === 'function') window.cancelAnimationFrame(frame);
      frame = null;
      if (settle) settleFree();
      photos.forEach(p => { if (p.placement === 'free') p.vx = p.vy = p.spin = 0; });
      draw();
    }
    function wake() {
      if (!free().length && !gripTurning()) { if (frame !== null) stopMotion(); return; }
      if (!canMove() || typeof window.requestAnimationFrame !== 'function') { stopMotion(true); return; }
      motionStart = now(); quietFrames = 0;
      if (frame !== null) return;
      lastFrame = now(); const epoch = ++motionEpoch;
      const tick = time => {
        if (epoch !== motionEpoch) return;
        frame = null;
        if (!canMove()) { stopMotion(true); return; }
        const dt = Math.min(1 / 30, Math.max(1 / 240, (time - lastFrame) / 1000 || 1 / 60));
        lastFrame = time;
        const before = photos.map(p => ({ x: p.x, y: p.y, angle: p.angle }));
        if (gripTurning()) {
          const p = photos[drag.i];
          const rest = drag.hangingAngle;
          placeHeld(drag, rest + (p.angle - rest) * Math.exp(-dt / 0.045));
        }
        step(dt / 2); step(dt / 2); draw();
        const moving = free().some(i => Math.hypot(photos[i].x - before[i].x, photos[i].y - before[i].y) > 0.25
          || Math.abs(photos[i].angle - before[i].angle) > 0.15);
        quietFrames = moving ? 0 : quietFrames + 1;
        if (time - motionStart > 2400 || (quietFrames >= 8 && !gripTurning())) {
          stopMotion(!drag && needsRestLayout());
          return;
        }
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }

    function releasePointer(current) {
      const object = objects[current.i];
      if (typeof object.hasPointerCapture === 'function' && object.hasPointerCapture(current.id)) object.releasePointerCapture(current.id);
    }
    function cancelDrag(resume = true) {
      if (!drag) return;
      const current = drag; drag = null;
      canceledPointer = { i: current.i, id: current.id };
      suppressedClick = { i: current.i, until: now() + 350 };
      photos.forEach((p, i) => Object.assign(p, current.before[i]));
      releasePointer(current); draw();
      if (resume) wake();
    }
    function pushPhoto(i, x, y) {
      const p = photos[i], start = { x: p.x, y: p.y };
      const distance = Math.hypot(x - start.x, y - start.y);
      const count = Math.min(80, Math.max(1, Math.ceil(distance / Math.max(8, sizes[i].width / 5))));
      for (let n = 1; n <= count; n++) {
        const intendedX = start.x + (x - start.x) * n / count;
        const intendedY = start.y + (y - start.y) * n / count;
        p.x = intendedX;
        p.y = intendedY;
        constrain(i); contacts(i, true);
        if (Math.hypot(p.x - intendedX, p.y - intendedY) > Math.max(4, sizes[i].width / 10)) break;
      }
    }
    function placeHeld(current, angle) {
      const p = photos[current.i], original = current.before[current.i];
      const { x: gripX, y: gripY } = current.grip;
      p.angle = angle;
      // Offset the center so the same point on the paper stays under the pointer.
      const radians = (angle - original.angle) * Math.PI / 180;
      const cos = Math.cos(radians), sin = Math.sin(radians);
      current.intended = {
        x: original.x + current.lastX - current.x + gripX - (gripX * cos - gripY * sin),
        y: original.y + current.lastY - current.y + gripY - (gripX * sin + gripY * cos)
      };
      pushPhoto(current.i, current.intended.x, current.intended.y);
    }
    function flip(i) {
      if (!ready(i) || busy) return;
      const p = photos[i], back = p.face !== 'back';
      p.face = back ? 'back' : 'front';
      if (flips.has(i)) flips.get(i).cancel();
      draw();
      const element = get('ap-photo-flipper-' + (i + 1));
      if (canMove() && typeof element.animate === 'function') {
        const animation = element.animate([
          { transform: back ? 'rotateY(0deg)' : 'rotateY(180deg)' },
          { transform: back ? 'rotateY(180deg)' : 'rotateY(0deg)' }
        ], { duration: 300, easing: 'ease-in-out' });
        flips.set(i, animation);
        animation.finished.catch(() => {}).then(() => { if (flips.get(i) === animation) flips.delete(i); });
      }
      status.textContent = 'Ảnh minh họa ' + p.serial + (back ? ': GradStudio — góc lưu niệm.' : ': mặt trước.');
    }
    function finishCamera(gravity = true) {
      cameraEpoch++;
      const i = printing; printing = null; busy = false;
      cancelEffects();
      if (i !== null && photos[i].created && photos[i].placement === 'printing') {
        const p = photos[i], column = (p.serial - 1) % 3;
        const cardWidth = sizes[i].width;
        const drift = ((p.serial * 7 % 13) - 6) * 2;
        const pitch = Math.min(cardWidth + 10, (width - 24 - cardWidth) / 2);
        const landing = (width - cardWidth) / 2 + (column - 1) * pitch + drift;
        release(i, Math.max(-380, Math.min(160, (landing - p.x) / 0.5)), 35);
      }
      draw();
      if (gravity) wake(); else stopMotion(true);
    }
    function capture() {
      if (busy || dialogsOpen()) return;
      cancelDrag();
      const inactive = photos.findIndex(p => !p.created);
      const i = inactive >= 0 ? inactive : free().sort((a, b) => photos[a].serial - photos[b].serial)[0];
      if (i === undefined) return;
      const replaced = photos[i].created ? photos[i].serial : null;
      if (flips.has(i)) { flips.get(i).cancel(); flips.delete(i); }
      const number = ++serial, source = (number - 1) % 3;
      Object.assign(photos[i], blank(), { created: true, placement: 'printing', serial: number, source,
        tone: ['original', 'vintage', 'mono'][source], angle: 0 });
      get('ap-photo-image-' + (i + 1)).src = get('ap-photo-link-' + (source + 1)).getAttribute('href');
      cards[i].hidden = false;
      setGeometry(measure());
      const box = stage.getBoundingClientRect(), slot = get('ap-camera-slot').getBoundingClientRect();
      const p = photos[i];
      p.x = slot.left - box.left + slot.width / 2 - sizes[i].width / 2;
      const startY = slot.bottom - box.top - sizes[i].height;
      p.y = slot.bottom - box.top + 10;
      constrain(i);
      busy = true; printing = i; const epoch = ++cameraEpoch;
      draw();
      const announce = () => {
        status.textContent = 'Đã tạo ảnh minh họa ' + number + (replaced === null ? '.' : ', thay ảnh ' + replaced + ' cũ nhất trong khay.')
          + ' Ảnh đang treo được giữ nguyên.';
      };
      if (!canMove() || typeof cards[i].animate !== 'function') { finishCamera(); announce(); return; }
      animate(get('ap-camera-lens'), [{ transform: 'scale(1)' }, { transform: 'scale(.85)' }, { transform: 'scale(1)' }], { duration: 140 });
      animate(get('ap-camera-flash'), [{ opacity: 0.4 }, { opacity: 1 }, { opacity: 0.4 }], { duration: 140 });
      animate(get('ap-camera-shutter'), [{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }, { transform: 'translateY(0)' }], { duration: 140 });
      animate(cards[i], [
        { transform: 'translateY(' + (startY - p.y) + 'px)', clipPath: 'inset(75% 0 0 0)', opacity: 0.6 },
        { transform: 'translateY(0)', clipPath: 'inset(0)', opacity: 1 }
      ], { duration: 550, easing: 'cubic-bezier(.2,.65,.4,1)' }).then(() => {
        if (epoch !== cameraEpoch || !busy) return;
        finishCamera(); announce();
      });
    }
    function resetProps() {
      cancelDrag(false);
      cameraEpoch++; printing = null; busy = false;
      cancelEffects(); stopMotion();
      photos.forEach(p => Object.assign(p, blank()));
      memories.fill(-1); serial = 0; suppressedClick = null;
      draw();
      if (objects.includes(document.activeElement)) camera.focus();
      status.textContent = 'Đã sắp lại góc studio. Dây và khay chưa có ảnh.';
    }
    function layout() {
      const next = measure();
      if (next.width === width && next.height === height && next.basketTop === basketTop
        && next.anchors.every((point, i) => point.x === anchors[i]?.x && point.y === anchors[i]?.y)
        && next.sizes.every((size, i) => !photos[i].created || (size.width === sizes[i]?.width && size.height === sizes[i]?.height))) return;
      cancelDrag(false);
      if (busy) finishCamera(false);
      cancelEffects(); stopMotion();
      const old = { width, height, sizes };
      setGeometry(next);
      photos.forEach((p, i) => {
        if (!p.created) return;
        if (p.placement === 'hung') pin(i, p.slot);
        else if (old.sizes[i]) {
          p.x = (p.x + old.sizes[i].width / 2) / old.width * width - sizes[i].width / 2;
          p.y = (p.y + old.sizes[i].height / 2) / old.height * height - sizes[i].height / 2;
          constrain(i);
        }
      });
      settleFree(); draw();
    }
    function sync() {
      if (canMove()) return;
      cancelDrag(false);
      if (busy) finishCamera(false);
      cancelEffects(); stopMotion(true);
    }

    clips.forEach((clip, slot) => clip.addEventListener('click', () => {
      if (busy || dialogsOpen()) return;
      cancelDrag();
      const i = owner(slot);
      if (i >= 0) { release(i, i % 2 ? 35 : -35); draw(); wake(); }
      else { const candidate = closestFree(slot); if (candidate >= 0) hang(candidate, slot); }
    }));
    cards.forEach((card, i) => {
      const object = objects[i];
      object.addEventListener('click', event => {
        if (!ready(i) || busy || dialogsOpen()) return;
        if (event.detail !== 0 && suppressedClick && suppressedClick.i === i && now() < suppressedClick.until) {
          event.preventDefault(); return;
        }
        if (photos[i].placement === 'hung') { release(i); draw(); wake(); }
        else flip(i);
      });
      object.addEventListener('pointerdown', event => {
        if (!ready(i) || busy || dialogsOpen() || drag || event.button !== 0 || event.isPrimary === false) return;
        canceledPointer = null; suppressedClick = null;
        cancelEffects();
        const box = stage.getBoundingClientRect(), center = rect(i);
        const grip = { x: event.clientX - box.left - center.x, y: event.clientY - box.top - center.y };
        const radius = Math.hypot(sizes[i].width, sizes[i].height) / 2;
        const leverage = Math.max(0, Math.min(1, (Math.hypot(grip.x, grip.y) / radius - 0.12) / 0.68));
        // A corner grip hangs with the center of the photo below the finger.
        const gripDirection = Math.atan2(grip.y, grip.x) * 180 / Math.PI;
        const turn = (450 - gripDirection) % 360 - 180;
        const hangingAngle = Math.max(-76, Math.min(76, photos[i].angle + Math.max(-70, Math.min(70, turn)) * leverage));
        drag = { i, id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX,
          lastY: event.clientY, time: now(), active: false, grip, radius, hangingAngle,
          before: photos.map(p => ({ ...p })), intended: { x: photos[i].x, y: photos[i].y } };
        if (typeof object.setPointerCapture === 'function') object.setPointerCapture(event.pointerId);
      });
      const movePointer = event => {
        if (!drag || drag.i !== i || drag.id !== event.pointerId) return;
        if (event.clientX === drag.lastX && event.clientY === drag.lastY) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.active && Math.hypot(dx, dy) < 6) return;
        event.preventDefault(); drag.active = true;
        const elapsed = Math.max(1 / 60, (now() - drag.time) / 1000);
        const p = photos[i];
        p.vx = Math.max(-700, Math.min(700, (event.clientX - drag.lastX) / elapsed));
        p.vy = Math.max(-700, Math.min(700, (event.clientY - drag.lastY) / elapsed));
        const { x: gripX, y: gripY } = drag.grip;
        const torque = (gripX * p.vy - gripY * p.vx) / drag.radius;
        const sway = Math.max(-14, Math.min(14, torque * 0.024));
        const target = Math.max(-76, Math.min(76, drag.hangingAngle + sway));
        const angle = canMove() ? target + (p.angle - target) * Math.exp(-elapsed / 0.028) : drag.hangingAngle;
        drag.lastX = event.clientX; drag.lastY = event.clientY; drag.time = now();
        p.placement = 'dragging'; p.slot = null;
        placeHeld(drag, angle);
        draw(); wake();
      };
      object.addEventListener('pointermove', movePointer);
      object.addEventListener('pointerup', event => {
        if (!drag || drag.i !== i || drag.id !== event.pointerId) return;
        if (drag.active) movePointer(event);
        const current = drag; drag = null; releasePointer(current);
        if (!current.active) return;
        suppressedClick = { i, until: now() + 350 };
        const radians = photos[i].angle * Math.PI / 180, halfHeight = sizes[i].height / 2;
        const top = { x: current.intended.x + halfHeight * Math.sin(radians),
          y: current.intended.y + halfHeight * (1 - Math.cos(radians)) };
        const near = [0, 1, 2].map(slot => ({ slot, point: home(i, slot) }))
          .map(item => ({ slot: item.slot, distance: Math.hypot(top.x - item.point.x, top.y - item.point.y) }))
          .sort((a, b) => a.distance - b.distance)[0];
        if (near.distance < Math.min(48, width * 0.13)) {
          const original = current.before.findIndex(p => p.created && p.placement === 'hung' && p.slot === near.slot);
          hang(i, near.slot, current.before[i].slot, original >= 0 ? original : owner(near.slot));
        } else {
          const p = photos[i], momentum = Math.max(0, 1 - (now() - current.time) / 140);
          release(i, p.vx * 0.7 * momentum, Math.max(-320, Math.min(420, p.vy * 0.55 * momentum)));
          p.spin = (p.angle - current.before[i].angle) * 1.4 * momentum;
          draw(); wake();
        }
      });
      for (const type of ['pointercancel', 'lostpointercapture']) object.addEventListener(type, event => {
        if (drag && drag.i === i && drag.id === event.pointerId) cancelDrag();
      });
      object.addEventListener('dragstart', event => event.preventDefault());
      object.addEventListener('keydown', event => {
        if (!ready(i) || busy || dialogsOpen()) return;
        if (/^[123]$/.test(event.key)) { event.preventDefault(); cancelDrag(); hang(i, Number(event.key) - 1); return; }
        const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
        if (!directions[event.key]) return;
        event.preventDefault(); cancelDrag();
        const p = photos[i], direction = directions[event.key], distance = event.shiftKey ? 24 : 12;
        release(i); p.placement = 'dragging';
        pushPhoto(i, p.x + direction[0] * distance, p.y + direction[1] * distance);
        release(i); draw(); wake();
      });
    });
    camera.addEventListener('click', capture);
    get('ap-studio-reset').addEventListener('click', resetProps);
    document.addEventListener('pointerup', event => {
      if (canceledPointer && canceledPointer.id === event.pointerId) {
        suppressedClick = { i: canceledPointer.i, until: now() + 350 }; canceledPointer = null;
      }
    });
    document.addEventListener('pointercancel', event => {
      if (canceledPointer && canceledPointer.id === event.pointerId) canceledPointer = null;
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && drag) { event.preventDefault(); cancelDrag(); }
    });
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('resize', layout);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(layout).observe(stage);
    if (typeof IntersectionObserver !== 'undefined') new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting; sync();
    }).observe(root);
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(sync);
      observer.observe(imageDialog, { attributes: true, attributeFilter: ['open'] });
    }
    if (typeof media.addEventListener === 'function') media.addEventListener('change', sync);
    root.querySelectorAll('[data-ap-static-link], [data-ap-static-prop]').forEach(node => { node.hidden = true; });
    [...objects, ...clips, camera, get('ap-studio-reset'), counter].forEach(node => { node.hidden = false; });
    root.dataset.apEnhanced = 'true';
    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    return { reset: resetProps, sync, pauseForDialog() { cancelDrag(false); if (busy) finishCamera(false); cancelEffects(); stopMotion(true); } };
  }



  // Reload always starts this sample at day 24; native form restoration is cleared.
  checklist.forEach(input => { input.checked = false; });
  details.forEach(detail => { detail.open = false; });
  render();
  updateProgress();
  collection.dataset.apEnhanced = 'true';
  days.forEach(button => { button.hidden = false; });
  get('ap-static-dates').hidden = true;
  get('ap-interactive-dates').hidden = false;
  setNotebookPage('1');
  notebookNext.hidden = false;
  notebookBack.hidden = false;
  get('ap-progress').hidden = false;
  get('ap-show-booking').hidden = false;
  resetButton.hidden = false;
})();
