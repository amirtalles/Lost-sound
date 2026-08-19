// تغییر بین صفحات
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome() { showPage('page-home'); }
function showArtist(name) {
  document.getElementById('artist-name').textContent = name;
  showPage('page-artist');
}

// شبیه‌سازی آپلود با درصد
function startUpload(e) {
  e.preventDefault();
  showPage('page-progress');
  let progress = 0;
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressPercent');

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1; // بین ۱ تا ۵ افزایش
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';
    text.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => alert('آپلود با موفقیت انجام شد! 🎵'), 300);
    }
  }, 150);
}
