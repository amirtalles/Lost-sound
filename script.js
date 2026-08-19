(() => {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* DATA                                                                */
  /* ------------------------------------------------------------------ */
  const ARTISTS = [
    {
      id: 'amir',
      name: 'AmirTalles',
      role: 'Music Producer',
      photo: 'https://i.pravatar.cc/300?img=13',
      tracks: [
        { name: 'Lost In The Echo', time: '02:45' },
        { name: 'Dark Days', time: '03:10' },
        { name: 'After Midnight', time: '02:58' }
      ]
    },
    {
      id: 'kaiden',
      name: 'Kaiden Rho',
      role: 'Beatmaker',
      photo: 'https://i.pravatar.cc/300?img=12',
      tracks: [
        { name: 'Static Bloom', time: '03:22' },
        { name: 'Low Orbit', time: '02:39' },
        { name: 'Nightcrawl', time: '04:01' }
      ]
    },
    {
      id: 'noel',
      name: 'Noel Vance',
      role: 'Vocalist',
      photo: 'https://i.pravatar.cc/300?img=59',
      tracks: [
        { name: 'Glass House', time: '03:05' },
        { name: 'Paper Moon', time: '02:51' },
        { name: 'Slow Fade', time: '03:47' }
      ]
    },
    {
      id: 'wren',
      name: 'Wren Oaks',
      role: 'Songwriter',
      photo: 'https://i.pravatar.cc/300?img=47',
      tracks: [
        { name: 'Desert Line', time: '03:18' },
        { name: 'Amber Room', time: '02:44' },
        { name: 'Halfway Home', time: '03:33' }
      ]
    },
    {
      id: 'silas',
      name: 'Silas Crane',
      role: 'Sound Designer',
      photo: 'https://i.pravatar.cc/300?img=15',
      tracks: [
        { name: 'Signal Loss', time: '04:12' },
        { name: 'Tape Hiss', time: '02:27' },
        { name: 'Undertow', time: '03:56' }
      ]
    }
  ];

  /* ------------------------------------------------------------------ */
  /* ELEMENTS                                                            */
  /* ------------------------------------------------------------------ */
  const artistStack = document.getElementById('artistStack');
  const screens = document.querySelectorAll('.screen');
  const navItems = document.querySelectorAll('.bottomnav__item');

  const artistPhoto = document.getElementById('artistPhoto');
  const artistName = document.getElementById('artistName');
  const artistRole = document.getElementById('artistRole');
  const trackList = document.getElementById('trackList');

  const uploadForm = document.getElementById('uploadForm');
  const trackNameInput = document.getElementById('trackNameInput');
  const audioFileInput = document.getElementById('audioFileInput');
  const fileNameLabel = document.getElementById('fileName');
  const fileFieldWrap = fileNameLabel.closest('.field__file');

  const ringFill = document.getElementById('ringFill');
  const pctNum = document.getElementById('pctNum');
  const uploadCaption = document.getElementById('uploadCaption');
  const cancelUploadBtn = document.getElementById('cancelUpload');

  const RING_CIRCUMFERENCE = 2 * Math.PI * 90; // r=90

  /* ------------------------------------------------------------------ */
  /* BUILD ARTIST STACK + ENTRANCE ANIMATION                            */
  /* ------------------------------------------------------------------ */
  function buildArtistStack() {
    ARTISTS.forEach((artist, i) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'artist-row';
      row.dataset.artistId = artist.id;
      row.style.zIndex = String(ARTISTS.length - i);
      row.innerHTML = `
        <span class="artist-row__photo-wrap">
          <span class="artist-row__photo"><img src="${artist.photo}" alt="${artist.name}"></span>
          <span class="artist-row__num">${String(i + 1).padStart(2, '0')}</span>
        </span>
        <span class="artist-row__meta">
          <span class="artist-row__name">${artist.name}</span>
        </span>
      `;
      row.addEventListener('click', () => openArtist(artist.id));
      artistStack.appendChild(row);
    });
  }

  function playEntrance() {
    const rows = artistStack.querySelectorAll('.artist-row');
    const baseDelay = 300;   // first artist enters at 0.3s
    const stagger = 140;     // each following artist follows sequentially
    rows.forEach((row, i) => {
      setTimeout(() => {
        row.classList.add('is-in');
      }, baseDelay + i * stagger);
    });
  }

  /* ------------------------------------------------------------------ */
  /* SCREEN NAVIGATION                                                   */
  /* ------------------------------------------------------------------ */
  function showScreen(name) {
    screens.forEach(s => s.classList.toggle('is-active', s.dataset.screen === name));
    navItems.forEach(n => n.classList.toggle('is-active', n.dataset.nav === name));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function openArtist(id) {
    const artist = ARTISTS.find(a => a.id === id);
    if (!artist) return;
    artistPhoto.src = artist.photo;
    artistPhoto.alt = artist.name;
    artistName.textContent = artist.name;
    artistRole.textContent = artist.role;
    trackList.innerHTML = artist.tracks.map(t => `
      <li>
        <span class="track-thumb"><img src="${artist.photo}" alt=""></span>
        <span class="track-info">
          <span class="track-info__name">${t.name}</span>
        </span>
        <span class="track-time">${t.time}</span>
      </li>
    `).join('');
    showScreen('artist');
  }

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav === 'artist-profile' ? 'artist' : btn.dataset.nav;
      showScreen(target);
    });
  });

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.back));
  });

  /* ------------------------------------------------------------------ */
  /* UPLOAD FORM                                                         */
  /* ------------------------------------------------------------------ */
  audioFileInput.addEventListener('change', () => {
    const file = audioFileInput.files[0];
    if (file) {
      fileNameLabel.textContent = file.name;
      fileFieldWrap.classList.add('has-file');
    } else {
      fileNameLabel.textContent = 'Choose file';
      fileFieldWrap.classList.remove('has-file');
    }
  });
  fileFieldWrap.addEventListener('click', () => audioFileInput.click());

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showScreen('uploading');
    runUploadSimulation();
  });

  let uploadTimer = null;

  function runUploadSimulation() {
    clearInterval(uploadTimer);
    let progress = 0;
    ringFill.style.strokeDasharray = String(RING_CIRCUMFERENCE);
    ringFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE);
    pctNum.textContent = '0';
    uploadCaption.textContent = 'Uploading your track…';

    uploadTimer = setInterval(() => {
      progress += Math.random() * 9 + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadTimer);
        uploadCaption.textContent = 'Upload complete';
        setTimeout(() => {
          uploadForm.reset();
          fileNameLabel.textContent = 'Choose file';
          fileFieldWrap.classList.remove('has-file');
          showScreen('mysound');
        }, 700);
      }
      const offset = RING_CIRCUMFERENCE * (1 - progress / 100);
      ringFill.style.strokeDashoffset = String(offset);
      pctNum.textContent = String(Math.round(progress));
    }, 220);
  }

  cancelUploadBtn.addEventListener('click', () => {
    clearInterval(uploadTimer);
    showScreen('upload');
  });

  /* ------------------------------------------------------------------ */
  /* INIT                                                                */
  /* ------------------------------------------------------------------ */
  buildArtistStack();
  // Screen opens visually empty; artists rise from the bottom ~0.3s in.
  window.addEventListener('DOMContentLoaded', playEntrance);
  if (document.readyState !== 'loading') playEntrance();
})();
