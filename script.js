// تغییر صفحه
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');

  // تغییر آیتم فعال در نوار پایین (اختیاری)
  document.querySelectorAll('.bottom-nav span').forEach(el => el.classList.remove('active'));
  const navMap = {
    'page-home': 'HOME',
    'page-artists': 'ARTISTS',
    'page-upload': 'UPLOAD'
  };
  const label = navMap[pageId];
  if (label) {
    document.querySelectorAll('.bottom-nav span').forEach(el => {
      if (el.textContent.trim() === label) el.classList.add('active');
    });
  }
}

// شروع آپلود (شبیه‌سازی با نمایش ۷۲٪ اولیه)
function startUpload(e) {
  e.preventDefault();
  showPage('page-progress');

  // برای نمایش ۷۲٪ ابتدا، همینطور بماند
  // اما اگر می‌خواهید حرکت کند، این کد را فعال کنید:
  /*
  let progress = 72;
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 3) + 1;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';
    text.textContent = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => alert('✅ Upload complete!'), 300);
    }
  }, 200);
  */
}
