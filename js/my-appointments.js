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
  const stateContent = document.querySelectorAll('[data-ap-state]');
  const checklist = Array.from(document.querySelectorAll('[data-ap-check]'));
  const details = document.querySelectorAll('[data-ap-detail]');
  const imageLinks = document.querySelectorAll('[data-ap-image]');
  const largeImages = document.querySelectorAll('[data-ap-large-image]');
  const payDialog = get('ap-pay-dialog');
  const imageDialog = get('ap-image-dialog');
  const payButton = get('ap-pay-open');
  const resetButton = get('ap-reset');
  const announcement = get('ap-announcement');
  const state = { status: 'pending', day: 24, filter: 'all' };
  let imageOpener = null;
  const studio = createStudio();

  function bookingVisible() {
    return state.day === 24 && (state.filter === 'all' || state.filter === state.status);
  }

  function currentFilter() {
    return filters.find(input => input.value === state.filter);
  }

  function render() {
    const onBookingDay = state.day === 24;
    get('ap-count-all').textContent = onBookingDay ? '1' : '0';
    get('ap-count-pending').textContent = onBookingDay && state.status === 'pending' ? '1' : '0';
    get('ap-count-booked').textContent = onBookingDay && state.status === 'booked' ? '1' : '0';
    get('ap-count-completed').textContent = '0';
    collection.dataset.apStatus = state.status;
    filters.forEach(input => { input.checked = input.value === state.filter; });
    days.forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.apDay) === state.day));
    });
    stateContent.forEach(node => { node.hidden = node.dataset.apState !== state.status; });
    result.hidden = !bookingVisible();
    journal.hidden = !bookingVisible();
    empty.hidden = bookingVisible();
    payButton.disabled = state.status === 'booked';
  }

  function updateProgress() {
    const count = checklist.filter(input => input.checked).length;
    get('ap-progress-count').textContent = String(count);
    get('ap-progress-meter').value = count;
  }

  function resetDemo() {
    state.status = 'pending';
    state.day = 24;
    state.filter = 'all';
    checklist.forEach(input => { input.checked = false; });
    details.forEach(detail => { detail.open = false; });
    studio.reset();
    if (payDialog.open) payDialog.close('reset');
    else payDialog.returnValue = '';
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

  days.forEach(button => button.addEventListener('click', () => {
    state.day = Number(button.dataset.apDay);
    render();
  }));

  checklist.forEach(input => input.addEventListener('change', updateProgress));
  resetButton.addEventListener('click', resetDemo);
  get('ap-show-booking').addEventListener('click', () => {
    state.day = 24;
    state.filter = 'all';
    render();
    get('ap-day-24').focus();
  });

  const supportsModal = dialog => typeof dialog.showModal === 'function' && typeof dialog.close === 'function';
  const dialogOpen = () => payDialog.open || imageDialog.open;

  if (supportsModal(payDialog)) {
    payButton.addEventListener('click', () => {
      if (state.status !== 'pending' || !bookingVisible() || dialogOpen()) return;
      payDialog.returnValue = '';
      studio.pauseForDialog();
      payDialog.showModal();
    });
    payDialog.addEventListener('close', () => {
      const outcome = payDialog.returnValue;
      payDialog.returnValue = '';
      studio.sync();
      if (outcome === 'reset') {
        resetButton.focus();
        return;
      }
      if (outcome === 'paid' && state.status === 'pending') {
        state.status = 'booked';
        render();
        announcement.textContent = state.filter === 'pending'
          ? 'Đã cọc 540.000đ trong demo. GS-1024 đã đặt lịch. Chọn Đã đặt lịch để xem cuộc hẹn.'
          : 'Đã cọc 540.000đ trong demo. GS-1024 đã đặt lịch; makeup lúc 13:00.';
        if (result.hidden) currentFilter().focus();
        else get('ap-paid-confirm').focus();
      } else if (bookingVisible() && state.status === 'pending') {
        payButton.focus();
      } else {
        currentFilter().focus();
      }
    });
    get('ap-pay-fallback').open = false;
    get('ap-pay-fallback').hidden = true;
    payButton.hidden = false;
  }

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
    const clips = [1, 2, 3].map(i => get('ap-studio-clip-' + i));
    const camera = get('ap-studio-camera'), counter = get('ap-studio-count');
    const status = get('ap-studio-status');
    const media = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    const blank = () => ({ created: false, placement: 'inactive', slot: null, x: 0, y: 0,
      angle: 0, vx: 0, vy: 0, spin: 0, face: 'front', tone: 'original', serial: 0, source: 0 });
    const photos = cards.map(blank), memories = [-1, -1, -1];
    const names = ['Ngày nhận bằng', 'Cùng nhau lớn lên', 'Những ngày bên nhau'];
    const effects = new Set(), flips = new Map();
    let width = 1, height = 1, sizes = [], previousSize = null;
    let visible = true, drag = null, canceledPointer = null, suppressedClick = null;
    let busy = false, printing = null, serial = 0, cameraEpoch = 0;
    let frame = null, motionEpoch = 0, motionStart = 0, lastFrame = 0, quietFrames = 0;
    const now = () => typeof performance !== 'undefined' ? performance.now() : Date.now();
    const dialogsOpen = () => payDialog.open || imageDialog.open;
    const canMove = () => !media.matches && visible && !document.hidden && !dialogsOpen();
    const ready = i => photos[i].created && photos[i].placement !== 'printing';
    const owner = slot => photos.findIndex(p => p.created && p.placement === 'hung' && p.slot === slot);
    const free = () => photos.map((p, i) => i).filter(i => ready(i) && photos[i].placement === 'free');

    function measure() {
      const box = stage.getBoundingClientRect();
      width = stage.clientWidth || box.width;
      height = stage.clientHeight || box.height;
      sizes = cards.map(card => ({ width: card.offsetWidth || width * 0.26, height: card.offsetHeight || 110 }));
    }
    function rect(i) {
      const p = photos[i], size = sizes[i], a = p.angle * Math.PI / 180;
      return { x: p.x + size.width / 2, y: p.y + size.height / 2,
        rx: (Math.abs(Math.cos(a)) * size.width + Math.abs(Math.sin(a)) * size.height) / 2,
        ry: (Math.abs(Math.sin(a)) * size.width + Math.abs(Math.cos(a)) * size.height) / 2 };
    }
    function constrain(i, bounce = false) {
      const p = photos[i], r = rect(i), size = sizes[i];
      const x = Math.max(7 + r.rx, Math.min(width - 7 - r.rx, r.x));
      const y = Math.max(7 + r.ry, Math.min(height - 12 - r.ry, r.y));
      if (bounce && x !== r.x) p.vx *= -0.15;
      if (bounce && y < r.y) {
        p.vy = Math.abs(p.vy) > 120 ? -p.vy * 0.12 : 0;
        p.vx *= 0.75;
        p.spin *= 0.45;
      }
      p.x = x - size.width / 2;
      p.y = y - size.height / 2;
    }
    function home(i, slot) {
      const box = stage.getBoundingClientRect(), clip = clips[slot].getBoundingClientRect();
      return { x: clip.left - box.left + clip.width / 2 - sizes[i].width / 2,
        y: clip.bottom - box.top - 4, angle: [-2, 1, -1][slot] };
    }
    function closestFree(slot) {
      const remembered = memories[slot];
      if (remembered >= 0 && ready(remembered) && photos[remembered].placement === 'free') return remembered;
      return free().sort((a, b) => {
        const ha = home(a, slot), hb = home(b, slot);
        return Math.hypot(photos[a].x - ha.x, photos[a].y - ha.y) - Math.hypot(photos[b].x - hb.x, photos[b].y - hb.y);
      })[0] ?? -1;
    }
    function draw() {
      photos.forEach((p, i) => {
        const card = cards[i];
        card.hidden = !p.created;
        card.dataset.apCreated = String(p.created);
        card.dataset.apPlacement = p.placement;
        card.dataset.apSlot = p.slot === null ? '' : String(p.slot + 1);
        card.dataset.apFace = p.face;
        card.dataset.apTone = p.tone;
        card.style.left = p.x + 'px';
        card.style.top = p.y + 'px';
        card.style.setProperty('--ap-card-angle', p.angle + 'deg');
        const description = names[p.source] + ', ảnh minh họa ' + p.serial;
        objects[i].setAttribute('aria-label', (p.placement === 'hung' ? 'Thả ảnh ' : 'Lật ảnh ') + description);
        objects[i].setAttribute('aria-disabled', String(busy || p.placement === 'printing'));
        get('ap-photo-front-' + (i + 1)).setAttribute('aria-hidden', String(p.face !== 'front'));
        get('ap-photo-back-' + (i + 1)).setAttribute('aria-hidden', String(p.face !== 'back'));
      });
      clips.forEach((clip, slot) => {
        const i = owner(slot);
        if (i >= 0) memories[slot] = i;
        const candidate = i >= 0 ? i : closestFree(slot);
        clip.disabled = busy || candidate < 0;
        clip.dataset.apOccupied = i < 0 ? '' : String(i + 1);
        clip.setAttribute('aria-label', candidate < 0 ? 'Kẹp ' + (slot + 1) + ', chưa có ảnh để treo'
          : (i >= 0 ? 'Thả ảnh minh họa ' : 'Treo ảnh minh họa ') + photos[candidate].serial + ' ở kẹp ' + (slot + 1));
        clip.setAttribute('aria-controls', candidate < 0 ? 'ap-studio-basket' : cards[candidate].id);
      });
      counter.textContent = photos.filter(p => p.created).length + '/6 ảnh · ' + photos.filter(p => p.placement === 'hung').length + '/3 treo';
      root.dataset.apBusy = String(busy);
      camera.setAttribute('aria-busy', String(busy));
      camera.setAttribute('aria-disabled', String(busy));
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
      for (let pass = 0; pass < 5; pass++) {
        for (let i = 0; i < photos.length; i++) for (let j = i + 1; j < photos.length; j++) {
          const a = photos[i], b = photos[j];
          if (!ready(i) || !ready(j) || (a.placement === 'hung' && b.placement === 'hung')) continue;
          const ar = rect(i), br = rect(j), dx = br.x - ar.x, dy = br.y - ar.y;
          const ox = ar.rx + br.rx + 2 - Math.abs(dx), oy = ar.ry + br.ry + 2 - Math.abs(dy);
          if (ox <= 0 || oy <= 0) continue;
          if (pushing && (held === i || held === j)) {
            if (a.placement === 'hung' && held !== i) release(i, photos[held].vx * 0.25, 30);
            if (b.placement === 'hung' && held !== j) release(j, photos[held].vx * 0.25, 30);
          }
          const ia = i === held || a.placement === 'hung' ? 0 : 1;
          const ib = j === held || b.placement === 'hung' ? 0 : 1;
          if (ia + ib === 0) continue;
          const horizontal = ox < oy;
          const nx = horizontal ? (dx < 0 ? -1 : 1) : 0, ny = horizontal ? 0 : (dy < 0 ? -1 : 1);
          const penetration = (horizontal ? ox : oy) + 0.02;
          a.x -= nx * penetration * ia / (ia + ib); a.y -= ny * penetration * ia / (ia + ib);
          b.x += nx * penetration * ib / (ia + ib); b.y += ny * penetration * ib / (ia + ib);
          const velocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (velocity < 0) {
            const impulse = -(1.06 * velocity) / (ia + ib);
            a.vx -= impulse * nx * ia; a.vy -= impulse * ny * ia;
            b.vx += impulse * nx * ib; b.vy += impulse * ny * ib;
            a.spin -= impulse * ny * 0.015 * ia; b.spin += impulse * ny * 0.015 * ib;
          }
          if (ia) constrain(i); if (ib) constrain(j);
          if (held === i || held === j) {
            const nextA = rect(i), nextB = rect(j);
            const rx = nextA.rx + nextB.rx + 2 - Math.abs(nextB.x - nextA.x);
            const ry = nextA.ry + nextB.ry + 2 - Math.abs(nextB.y - nextA.y);
            if (rx > 0 && ry > 0) {
              const remainder = (horizontal ? rx : ry) + 0.02;
              const heldPhoto = photos[held], direction = held === i ? -1 : 1;
              heldPhoto.x += direction * nx * remainder;
              heldPhoto.y += direction * ny * remainder;
              constrain(held);
            }
          }
        }
      }
    }
    function step(dt) {
      const held = drag && drag.active ? drag.i : -1;
      photos.forEach((p, i) => {
        if (!ready(i) || p.placement !== 'free' || i === held) return;
        p.vy += 2100 * dt;
        p.vx *= Math.exp(-0.9 * dt);
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.angle = Math.max(-9, Math.min(9, p.angle + p.spin * dt));
        p.spin *= Math.exp(-2 * dt);
        constrain(i, true);
      });
      contacts(held, held >= 0);
    }
    function settleFree() {
      const columns = [0, 0, 0];
      const indices = free().sort((a, b) => photos[b].y - photos[a].y || photos[a].serial - photos[b].serial);
      const rowHeight = Math.max(0, ...indices.map(i => sizes[i].height + 12));
      indices.forEach(i => {
        const p = photos[i]; p.angle = [-3, 2, -1][p.serial % 3];
        const target = column => 12 + column * Math.max(0, width - 24 - sizes[i].width) / 2;
        const column = [0, 1, 2].sort((a, b) => (columns[a] - columns[b]) * width * 2
          + Math.abs(p.x - target(a)) - Math.abs(p.x - target(b)))[0];
        const r = rect(i);
        p.x = target(column);
        p.y = height - 12 - r.ry - sizes[i].height / 2 - columns[column] * rowHeight;
        columns[column]++;
        p.vx = p.vy = p.spin = 0;
        constrain(i);
      });
      if (drag && drag.active) contacts(drag.i, true);
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
      if (!free().length) { if (frame !== null) stopMotion(); return; }
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
        const before = photos.map(p => ({ x: p.x, y: p.y }));
        step(dt / 2); step(dt / 2); draw();
        const moving = free().some(i => Math.hypot(photos[i].vx, photos[i].vy) > 12
          || Math.hypot(photos[i].x - before[i].x, photos[i].y - before[i].y) > 0.25);
        quietFrames = moving ? 0 : quietFrames + 1;
        if (time - motionStart > 2400) { stopMotion(true); return; }
        if (quietFrames >= 8 && !drag) { stopMotion(); return; }
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
      draw(); wake();
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
        const landing = 12 + column * (width - 24 - sizes[i].width) / 2;
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
      measure();
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
      cancelDrag(false);
      if (busy) finishCamera(false);
      cancelEffects(); stopMotion();
      const old = previousSize;
      measure();
      photos.forEach((p, i) => {
        if (!p.created) return;
        if (p.placement === 'hung') pin(i, p.slot);
        else if (old) {
          p.x = (p.x + old.sizes[i].width / 2) / old.width * width - sizes[i].width / 2;
          p.y = (p.y + old.sizes[i].height / 2) / old.height * height - sizes[i].height / 2;
          constrain(i);
        }
      });
      previousSize = { width, height, sizes: sizes.map(size => ({ ...size })) };
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
        drag = { i, id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX,
          lastY: event.clientY, time: now(), active: false, before: photos.map(p => ({ ...p })), intended: { x: photos[i].x, y: photos[i].y } };
        if (typeof object.setPointerCapture === 'function') object.setPointerCapture(event.pointerId);
      });
      const movePointer = event => {
        if (!drag || drag.i !== i || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.active && Math.hypot(dx, dy) < 6) return;
        event.preventDefault(); drag.active = true;
        const elapsed = Math.max(1 / 60, (now() - drag.time) / 1000);
        const p = photos[i];
        p.vx = Math.max(-700, Math.min(700, (event.clientX - drag.lastX) / elapsed));
        p.vy = Math.max(-700, Math.min(700, (event.clientY - drag.lastY) / elapsed));
        drag.lastX = event.clientX; drag.lastY = event.clientY; drag.time = now();
        p.placement = 'dragging'; p.slot = null;
        drag.intended = { x: drag.before[i].x + dx, y: drag.before[i].y + dy };
        pushPhoto(i, drag.intended.x, drag.intended.y);
      };
      object.addEventListener('pointermove', movePointer);
      object.addEventListener('pointerup', event => {
        if (!drag || drag.i !== i || drag.id !== event.pointerId) return;
        if (drag.active) movePointer(event);
        const current = drag; drag = null; releasePointer(current);
        if (!current.active) return;
        suppressedClick = { i, until: now() + 350 };
        const near = [0, 1, 2].map(slot => ({ slot, point: home(i, slot) }))
          .map(item => ({ slot: item.slot, distance: Math.hypot(current.intended.x - item.point.x, current.intended.y - item.point.y) }))
          .sort((a, b) => a.distance - b.distance)[0];
        if (near.distance < Math.min(48, width * 0.13)) {
          const original = current.before.findIndex(p => p.created && p.placement === 'hung' && p.slot === near.slot);
          hang(i, near.slot, current.before[i].slot, original >= 0 ? original : owner(near.slot));
        } else {
          const p = photos[i]; release(i, p.vx * 0.6, Math.max(0, p.vy * 0.6)); draw(); wake();
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
      [payDialog, imageDialog].forEach(dialog => observer.observe(dialog, { attributes: true, attributeFilter: ['open'] }));
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
  get('ap-progress').hidden = false;
  get('ap-show-booking').hidden = false;
  resetButton.hidden = false;
})();
