// نمایش/مخفی کردن صفحات
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome() { showPage('page-home'); }

function showArtist(name, role) {
  document.getElementById('artist-name').textContent = name;
  document.getElementById('artist-role').textContent = role;
  showPage('page-artist');
}

// شروع آپلود (شبیه‌سازی)
function startUpload(e) {
  e.preventDefault();
  showPage('page-progress');

  let progress = 0;
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');

  // برای اینکه از 72% شروع کنه و بره تا 100، مثل عکس که روی 72 ایستاده
  // ولی برای نمایش پویا، از 0 شروع می‌کنیم تا رشدش رو ببینید.
  // اگر دوست دارید مستقیم روی 72 بایستد، خط زیر را کامنت کنید و خط بعدی رو فعال کنید.
  
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 4) + 1; // 1 تا 4 درصد افزایش
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';
    text.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => alert('✅ آپلود با موفقیت انجام شد!'), 400);
    }
  }, 200);

  // اگر می‌خواهید دقیقاً مثل عکس روی 72 بماند (و حرکت نکند)، کد بالا را حذف کنید و این را جایگزین کنید:
  // fill.style.width = '72%';
  // text.textContent = '72%';
}
