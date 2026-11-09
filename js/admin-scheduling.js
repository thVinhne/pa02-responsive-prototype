// Local demo only. Data is seeded from the HTML; no network or storage.
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const names = { unanswered: 'Chưa trả lời', advising: 'Đang tư vấn', confirmed: 'Đã xác nhận', completed: 'Hoàn thành' };
  const search = $('admin-search'), filter = $('admin-filter'), status = $('admin-status');
  const date = $('admin-date'), time = $('admin-time'), form = $('admin-booking-form');
  const messages = document.querySelector('.admin-messages');
  const chatScroll = document.querySelector('.admin-chat-body');
  const feedback = $('admin-feedback');
  const initialDate = document.querySelector('.admin-date-line').textContent;
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLocaleLowerCase('vi').trim();
  const clock = () => new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
  const historyItem = (text, sender, stamp, studio = false) => {
    const item = document.createElement('li');
    item.className = 'admin-message' + (studio ? ' admin-message--studio' : '');
    const content = document.createElement('p');
    content.textContent = text;
    const label = document.createElement('span');
    label.className = 'admin-muted';
    label.textContent = `${sender} · ${stamp}`;
    item.append(content, label);
    return item;
  };
  const conversations = [...document.querySelectorAll('.admin-customer')].map(row => {
    const name = row.querySelector('strong').textContent;
    const id = row.dataset.customer;
    const preview = row.querySelector('.admin-preview');
    const stamp = row.querySelector('time');
    return { id, row, name, preview, stamp, button: row.querySelector('button'), status: row.dataset.status,
      history: id === 'linh' ? [...messages.children] : [historyItem(preview.textContent, name, stamp.textContent)],
      draft: '', scroll: 0 };
  });
  let active = conversations[0];
  let bookingState = 'agreed';
  let proposal = '';
  const fingerprint = () => `${date.value}|${time.value}`;
  const available = () => date.value === '2026-10-24' && ['14:00', '15:00'].includes(time.value);
  const hour = value => `${String(value).padStart(2, '0')}:00`;
  const times = () => {
    const start = Number(time.value.slice(0, 2));
    return { start, makeup: `${hour(start - 1)}–${hour(start)}`, shoot: `${hour(start)}–${hour(start + 2)}` };
  };
  function describe(conversation) {
    conversation.button.title = `${conversation.name} · ${names[conversation.status]}\n${conversation.preview.textContent}`;
    conversation.button.setAttribute('aria-label', `${conversation.name}. ${names[conversation.status]}. ${conversation.preview.textContent}`);
    conversation.row.querySelector('strong').title = conversation.name;
    conversation.preview.title = conversation.preview.textContent;
  }
  function applyFilters() {
    let shown = 0;
    conversations.forEach(item => {
      item.row.hidden = !(normalize(item.name).includes(normalize(search.value)) && (filter.value === 'all' || item.status === filter.value));
      if (!item.row.hidden) shown++;
    });
    [...filter.options].forEach(option => {
      const count = option.value === 'all' ? conversations.length : conversations.filter(item => item.status === option.value).length;
      option.textContent = `${option.value === 'all' ? 'Tất cả' : names[option.value]} · ${count}`;
    });
    $('admin-empty').hidden = shown !== 0;
    $('admin-count').textContent = `${shown}/${conversations.length} hội thoại`;
  }
  function setStatus(value) {
    active.status = value;
    active.row.dataset.status = value;
    status.value = value;
    describe(active);
    applyFilters();
  }
  function addMessage(text, studio = true) {
    const stamp = clock();
    const item = historyItem(text, studio ? 'Studio' : active.name, `${stamp} · mô phỏng`, studio);
    active.history.push(item);
    messages.append(item);
    active.preview.textContent = text;
    active.stamp.textContent = stamp;
    active.stamp.dateTime = new Date().toISOString();
    describe(active);
    chatScroll.scrollTop = chatScroll.scrollHeight;
  }
  function renderCalendar() {
    const value = times();
    const valid = available();
    const pending = bookingState === 'created';
    const makeup = $('admin-calendar-makeup');
    const shoot = $('admin-calendar-shoot');
    // Pending deposits remain distinct from confirmed bookings.
    [makeup, shoot].forEach(cell => {
      cell.textContent = pending ? 'Chờ cọc · GS-1024' : 'Chưa có booking';
      cell.className = pending ? 'admin-status--waiting' : '';
    });
    if (valid) {
      makeup.previousElementSibling.textContent = value.makeup;
      shoot.previousElementSibling.textContent = value.shoot;
      makeup.parentElement.previousElementSibling.firstElementChild.textContent = `12:00–${hour(value.start - 1)}`;
      shoot.parentElement.nextElementSibling.firstElementChild.textContent = `${hour(value.start + 2)}–18:00`;
    }
    $('admin-calendar-note').textContent = pending ? 'GS-1024 mới chờ cọc, chưa giữ lịch chính thức. Lịch này chỉ là dữ liệu mẫu.' : 'Lịch đã biết: 08:00–12:00. Khung chưa có booking không bảo đảm đủ nhân sự.';
  }
  function renderBooking() {
    renderCalendar();
    const isLinh = active.id === 'linh';
    $('admin-booking-linh').hidden = !isLinh;
    $('admin-booking-other').hidden = isLinh;
    document.querySelector('#admin-booking > .admin-eyebrow').textContent = isLinh ? 'Booking · GS-1024' : 'Thông tin booking';
    if (!isLinh) {
      $('admin-booking-title').textContent = 'Booking của khách';
      $('admin-booking-other-note').textContent = `Chưa có dữ liệu booking của ${active.name} trong tài liệu mẫu.`;
      $('admin-context').textContent = `Đang xem hội thoại mẫu của ${active.name}. Có thể trả lời và đổi trạng thái; chưa có dữ liệu booking cho khách này.`;
      $('admin-context').style.color = 'var(--color-text-muted)';
      return;
    }
    const created = bookingState === 'created', valid = available();
    const labels = { agreed: 'Đã đồng ý giờ · Chưa tạo booking', draft: 'Chưa chốt giờ', proposed: 'Chờ Linh phản hồi', declined: 'Khách từ chối · Cần tư vấn lại', created: 'Chờ cọc 30% · Mô phỏng' };
    $('admin-booking-title').textContent = created ? 'Booking của Linh' : bookingState === 'agreed' ? 'Lịch đã thống nhất' : 'Booking mới';
    $('admin-booking-status').textContent = labels[bookingState];
    $('admin-booking-status').className = 'admin-status ' + (bookingState === 'agreed' ? 'admin-status--success' : 'admin-status--waiting');
    form.hidden = created;
    $('admin-booking-result').hidden = !created;
    $('admin-create').disabled = !valid || bookingState !== 'agreed';
    $('admin-quote').disabled = !valid;
    $('admin-agree').disabled = !valid || bookingState !== 'proposed' || proposal !== fingerprint();
    $('admin-decline').disabled = !valid || !['agreed', 'proposed'].includes(bookingState);
    $('admin-context').textContent = !valid ? 'Chưa có dữ liệu cho ngày này. Chọn 24/10/2026 để tiếp tục bản mẫu.' : created ? 'GS-1024 đang chờ cọc 30% trong bản mô phỏng; lịch chưa giữ chính thức.' : bookingState === 'agreed' ? `✓ Linh đã đồng ý giờ ${time.value}. Có thể tạo booking chờ cọc.` : bookingState === 'declined' ? 'Linh đã từ chối đề xuất. Cần tư vấn giờ khác.' : bookingState === 'proposed' ? 'Đề xuất đã có trong chat mô phỏng. Chờ Linh phản hồi.' : 'Lịch đã thay đổi. Cần gửi đề xuất và có đồng ý mới.';
    $('admin-context').style.color = bookingState === 'agreed' ? 'var(--color-success)' : 'var(--color-text-muted)';
    if (valid) {
      const value = times();
      $('admin-time-help').textContent = `Makeup ${value.makeup} · Mai; chụp ${value.shoot} · Tuấn · Phòng B.`;
      $('admin-result-makeup').textContent = value.makeup;
      $('admin-result-shoot').textContent = value.shoot;
    } else $('admin-time-help').textContent = 'Chưa có dữ liệu cho ngày này; không thể gửi đề xuất hoặc tạo booking.';
  }
  function selectConversation(item) {
    active.draft = $('admin-message').value;
    active.scroll = chatScroll.scrollTop;
    active = item;
    conversations.forEach(conversation => {
      const selected = conversation === active;
      conversation.row.classList.toggle('admin-customer--active', selected);
      conversation.button.setAttribute('aria-pressed', String(selected));
    });
    const avatar = active.row.querySelector('.admin-avatar').cloneNode(true);
    document.querySelector('.admin-chat-head > .admin-avatar').replaceWith(avatar);
    $('admin-chat-title').textContent = active.name;
    document.querySelector('.admin-chat-person p').textContent = active.id === 'linh' ? 'Tốt nghiệp Premium' : 'Hội thoại tư vấn';
    status.value = active.status;
    messages.replaceChildren(...active.history);
    messages.setAttribute('aria-label', `Tin nhắn giữa ${active.name} và studio`);
    document.querySelector('.admin-date-line').textContent = active.id === 'linh' ? initialDate : 'Hội thoại mẫu';
    $('admin-message').value = active.draft;
    $('admin-compose-label').textContent = `Tin nhắn trả lời ${active.name}`;
    renderBooking();
    chatScroll.scrollTop = active.scroll;
  }
  function changeSchedule() {
    if (active.id !== 'linh') return;
    bookingState = 'draft'; proposal = ''; feedback.textContent = '';
    setStatus('advising'); renderBooking();
  }
  [search, filter, status, $('admin-send'), $('admin-edit')].forEach(control => { control.disabled = false; });
  conversations.forEach(item => {
    item.button.disabled = false;
    describe(item);
    item.button.addEventListener('click', () => selectConversation(item));
  });
  search.addEventListener('input', applyFilters);
  filter.addEventListener('change', applyFilters);
  status.addEventListener('change', () => setStatus(status.value));
  document.querySelector('.admin-compose').addEventListener('submit', event => {
    event.preventDefault();
    const text = $('admin-message').value.trim();
    if (!text) { $('admin-message').focus(); return; }
    addMessage(text);
    $('admin-message').value = ''; active.draft = '';
    if (active.status === 'unanswered') setStatus('advising');
    $('admin-message').focus();
  });
  date.addEventListener('change', changeSchedule);
  time.addEventListener('change', changeSchedule);
  $('admin-quote').addEventListener('click', () => {
    if (active.id !== 'linh' || !available()) return;
    const value = times();
    addMessage(`Đề xuất ngày 24/10/2026: makeup ${value.makeup} với Mai, chụp ${value.shoot} với Tuấn tại Phòng B. Gói Tốt nghiệp Premium 1.800.000đ, cọc 30% là 540.000đ. Bạn đồng ý lịch này không?`);
    bookingState = 'proposed'; proposal = fingerprint(); setStatus('advising'); renderBooking();
    feedback.textContent = 'Đã thêm đề xuất vào chat mô phỏng. Có thể thử đồng ý hoặc từ chối.';
  });
  $('admin-agree').addEventListener('click', () => {
    if (active.id !== 'linh' || bookingState !== 'proposed' || proposal !== fingerprint() || !available()) return;
    addMessage(`Dạ em đồng ý lịch chụp ${time.value} ngày 24/10/2026 ạ.`, false);
    bookingState = 'agreed'; setStatus('confirmed'); renderBooking();
    feedback.textContent = 'Linh đồng ý trong bản mô phỏng. Booking chưa tạo, chưa có cọc.';
  });
  $('admin-decline').addEventListener('click', () => {
    if (active.id !== 'linh' || !['agreed', 'proposed'].includes(bookingState) || !available()) return;
    addMessage(`Giờ ${time.value} chưa phù hợp, studio tư vấn giúp em giờ khác nhé.`, false);
    bookingState = 'declined'; proposal = ''; setStatus('advising'); renderBooking();
    feedback.textContent = 'Khách từ chối. Chưa thể tạo booking; hãy gửi đề xuất mới.';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (active.id !== 'linh' || !available() || bookingState !== 'agreed') return;
    bookingState = 'created'; setStatus('confirmed');
    addMessage(`Booking mô phỏng GS-1024 chuyển sang Chờ cọc 30% (540.000đ). Makeup ${times().makeup}; chụp ${times().shoot}. Chưa giữ lịch chính thức.`);
    renderBooking();
    feedback.textContent = 'Chỉ tạo trong phiên xem này. Màn 3 chưa tích hợp; không gửi hoặc lưu dữ liệu.';
    $('admin-booking').scrollTop = 0;
    $('admin-booking-title').focus({ preventScroll: true });
  });
  $('admin-edit').addEventListener('click', () => {
    changeSchedule(); feedback.textContent = 'Đã mở bản nháp. Cần chốt lại trước khi tạo booking.'; time.focus();
  });
  applyFilters(); renderBooking();
})();
