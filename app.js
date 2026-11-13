const caseData = {
  case2: {
    id: 'case2',
    number: '02',
    title: 'Memperlihatkan Suasana Gedung Sekolah',
    subtitle: 'Pergerakan Kamera pada Poros Tripod',
    situation: 'Tim produksi membuat video profil sekolah. Pada bagian pembukaan, sutradara ingin memperlihatkan gedung sekolah dari halaman depan hingga bagian atas gedung. Kamera menggunakan tripod dan tidak dapat berpindah tempat.',
    simDesc: 'Simulasi framing vertikal gedung sekolah terkunci pada tripod. Geser slider atau putar animasi untuk melihat pergerakan Tilt Up dan bandingkan dengan Panning horizontal.',
    qa: [
      {
        q: 'Pergerakan kamera apa yang digunakan?',
        a: `<p><strong>Tilting</strong> (secara spesifik <strong>Tilt Up</strong>). Teknik ini menggerakkan sudut pandang kamera secara vertikal pada poros tetap (tripod) tanpa mengubah posisi fisik kamera.</p>`
      },
      {
        q: 'Ke arah mana kamera harus bergerak?',
        a: `<p>Kamera bergerak <strong>secara vertikal dari bawah ke atas (Tilt Up)</strong>—dimulai dari area halaman depan/dasar bangunan, menyusuri fasad bertingkat secara perlahan, hingga berhenti pada bagian atap atau puncak gedung sekolah.</p>`
      },
      {
        q: 'Apa perbedaan teknik ini dengan panning?',
        a: `<p><strong>Arah Sumbu Gerakan:</strong> <em>Tilting</em> menggerakkan lensa kamera secara <strong>vertikal</strong> (ke atas atau ke bawah, seperti menganggukkan kepala), sedangkan <em>panning</em> menggerakkan lensa kamera secara <strong>horizontal</strong> (ke kiri atau ke kanan, seperti menggelengkan kepala). Keduanya sama-sama bertumpu pada satu poros statis (tripod).</p>`
      },
      {
        q: 'Apa manfaat pergerakan kamera tersebut?',
        a: `<ul>
          <li><strong>Membangun Skala &amp; Kemegahan (<em>Establishing Scale</em>):</strong> Memperlihatkan ketinggian, arsitektur, dan kemegahan gedung secara utuh dalam satu <em>shot</em> berkesinambungan.</li>
          <li><strong>Menciptakan Kesan Dramatis &amp; Pembuka yang Kuat:</strong> Memberikan efek <em>reveal</em> bertahap yang membangkitkan rasa kagum penonton di awal video profil.</li>
          <li><strong>Efisiensi Ruang &amp; Stabilitas:</strong> Memungkinkan pengambilan gambar objek tinggi tanpa perlu mundur terlalu jauh atau menggunakan <em>crane/drone</em>, tetap stabil karena bertumpu pada tripod.</li>
        </ul>`
      }
    ]
  },
  case18: {
    id: 'case18',
    number: '18',
    title: 'Mengarahkan Perhatian Penonton ke Objek Utama',
    subtitle: 'Komposisi Koridor & Perspektif',
    situation: 'Sebuah film pendek memperlihatkan seorang siswa berjalan menuju ruang kepala sekolah. Di sepanjang koridor terdapat garis lantai, deretan pintu, dan jendela yang membentuk pola perspektif. Sutradara ingin perhatian penonton terarah kepada siswa yang berada di ujung koridor.',
    simDesc: 'Visualisasi koridor dengan perspektif satu titik hilang. Aktifkan overlay garis penuntun untuk melihat vektor yang mengarahkan perhatian ke siswa di ujung koridor.',
    qa: [
      {
        q: 'Teknik komposisi apa yang paling tepat?',
        a: `<p><strong>Leading Lines (Garis Penuntun)</strong> yang dipadukan dengan <strong>One-Point Perspective (Perspektif Satu Titik Hilang)</strong>.</p>`
      },
      {
        q: 'Bagaimana penerapan teknik tersebut?',
        a: `<p>Menempatkan kamera sejajar di tengah atau sedikit rendah di sepanjang koridor sehingga garis ubin lantai, kusen pintu, langit-langit, dan deretan jendela membentuk garis diagonal yang menyatu menuju satu titik hilang (<em>vanishing point</em>) di ujung koridor—tepat di posisi siswa tersebut berjalan.</p>`
      },
      {
        q: 'Apa fungsi garis-garis dalam komposisi?',
        a: `<p>Berfungsi sebagai <strong>jalur visual alami</strong> yang memandu pergerakan mata penonton dari tepi bingkai (<em>frame</em>) langsung menuju subjek utama, sekaligus menciptakan ilusi <strong>kedalaman ruang (<em>depth</em>)</strong> tiga dimensi pada layar dua dimensi.</p>`
      },
      {
        q: 'Mengapa teknik ini efektif mengarahkan perhatian penonton?',
        a: `<p>Secara psikologis dan visual, mata manusia secara alami cenderung mengikuti alur garis lurus maupun diagonal hingga ke ujung pertemuannya. Ketika seluruh elemen arsitektur koridor mengarah ke satu titik yang sama, otak penonton otomatis mengunci fokus pada objek yang berada di titik temu tersebut (siswa) dan mengabaikan distraksi di sisi kanan-kiri bingkai.</p>`
      }
    ]
  }
};

let activeCase = 'case2';
let simulatorVisible = true;

const hero = document.getElementById('hero');
const qaGrid = document.getElementById('qaGrid');
const qaIntro = document.getElementById('qaIntro');
const simTitle = document.getElementById('simTitle');
const simDesc = document.getElementById('simDesc');
const simCase2 = document.getElementById('simCase2');
const simCase18 = document.getElementById('simCase18');
const simPanel = document.getElementById('simPanel');
const simToggle = document.getElementById('simToggle');

function renderHero(data) {
  hero.innerHTML = `
    <div>
      <span class="case-label serif">Studi Kasus ${data.number}</span>
      <h2>${data.title}</h2>
      <p>${data.subtitle}. Jelajahi simulator visual dan kartu analisis untuk memahami penerapan teknik sinematografi secara terstruktur.</p>
    </div>
    <div class="meta-card">
      <div class="label">Situasi</div>
      <p>${data.situation}</p>
    </div>`;
}

function plainTextFromHTML(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent.replace(/\s+/g, ' ').trim();
}

function renderQA(data) {
  qaIntro.textContent = 'Klik kartu untuk membuka jawaban, salin poin penting, atau masuk ke mode fokus presentasi.';
  qaGrid.innerHTML = data.qa.map((item, idx) => `
    <article class="qa-card" data-index="${idx}">
      <button class="qa-head" aria-expanded="false">
        <span class="qnum serif">0${idx + 1}</span>
        <span class="qtitle">${item.q}</span>
        <span class="chev">⌄</span>
      </button>
      <div class="qa-body"><div class="qa-inner">
        ${item.a}
        <div class="qa-actions">
          <button class="mini-btn copy-btn">Salin Jawaban</button>
          <button class="mini-btn focus-btn">Presentation / Focus Mode</button>
        </div>
      </div></div>
    </article>`).join('');

  qaGrid.querySelectorAll('.qa-card').forEach(card => {
    const head = card.querySelector('.qa-head');
    const body = card.querySelector('.qa-body');
    const inner = card.querySelector('.qa-inner');
    head.addEventListener('click', (e) => {
      if (e.target.closest('.mini-btn')) return;
      const open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', open);
      body.style.maxHeight = open ? inner.scrollHeight + 'px' : '0px';
    });
    card.querySelector('.copy-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      const idx = +card.dataset.index;
      const text = `${data.qa[idx].q}\n${plainTextFromHTML(data.qa[idx].a)}`;
      try { await navigator.clipboard.writeText(text); showToast('Jawaban disalin'); }
      catch { showToast('Salin tidak tersedia di browser ini'); }
    });
    card.querySelector('.focus-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(data, +card.dataset.index);
    });
  });
}

function setCase(caseId) {
  activeCase = caseId;
  const data = caseData[caseId];
  document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.case === caseId));
  renderHero(data);
  renderQA(data);
  simTitle.textContent = `Simulator Visual — Studi Kasus ${data.number}`;
  simDesc.textContent = data.simDesc;
  simCase2.classList.toggle('hidden', caseId !== 'case2');
  simCase18.classList.toggle('hidden', caseId !== 'case18');
}

simToggle.addEventListener('click', () => {
  simulatorVisible = !simulatorVisible;
  simPanel.classList.toggle('hidden', !simulatorVisible);
  simToggle.classList.toggle('active', simulatorVisible);
  simToggle.textContent = `Simulator: ${simulatorVisible ? 'Aktif' : 'Nonaktif'}`;
  simToggle.setAttribute('aria-pressed', simulatorVisible);
});

document.querySelectorAll('.pill').forEach(p => p.addEventListener('click', () => setCase(p.dataset.case)));

// Case 2: Tilt/Pan simulator
const tiltWorld = document.getElementById('tiltWorld');
const tiltSlider = document.getElementById('tiltSlider');
const angleReadout = document.getElementById('angleReadout');
const playTilt = document.getElementById('playTilt');
const modeTilt = document.getElementById('modeTilt');
const modePan = document.getElementById('modePan');
const tiltBadge = document.getElementById('tiltBadge');
const sliderLabel = document.getElementById('sliderLabel');
let simMode = 'tilt';
let animating = false;
let raf;

function updateTiltFromValue(v) {
  const deg = Math.round(-15 + (v / 100) * 50);
  angleReadout.textContent = `Sudut: ${deg > 0 ? '+' : ''}${deg}°`;
  if (simMode === 'tilt') {
    const y = -(v / 100) * 45;
    tiltWorld.style.transform = `translate(-50%, ${y}%)`;
  } else {
    const x = -(v / 100) * 35;
    tiltWorld.style.transform = `translate(${x}%, -50%)`;
  }
}

function setMode(mode) {
  simMode = mode;
  tiltWorld.classList.toggle('panning', mode === 'pan');
  modeTilt.classList.toggle('active', mode === 'tilt');
  modePan.classList.toggle('active', mode === 'pan');
  tiltSlider.value = 0;
  if (mode === 'tilt') {
    tiltBadge.textContent = 'Mode: Tilting (Vertikal)';
    sliderLabel.textContent = 'Geser untuk mengarahkan kamera secara vertikal (halaman → atap)';
    playTilt.textContent = 'Play Tilt Up';
  } else {
    tiltBadge.textContent = 'Mode: Panning (Horizontal)';
    sliderLabel.textContent = 'Geser untuk mengarahkan kamera secara horizontal (kiri → kanan)';
    playTilt.textContent = 'Play Pan';
  }
  updateTiltFromValue(0);
}

tiltSlider.addEventListener('input', (e) => { stopAnim(); updateTiltFromValue(+e.target.value); });
modeTilt.addEventListener('click', () => { stopAnim(); setMode('tilt'); });
modePan.addEventListener('click', () => { stopAnim(); setMode('pan'); });

function stopAnim() { animating = false; if (raf) cancelAnimationFrame(raf); }
playTilt.addEventListener('click', () => {
  stopAnim();
  animating = true;
  let start = null;
  const duration = 3200;
  const from = +tiltSlider.value;
  const to = 100;
  function step(ts) {
    if (!animating) return;
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = from + (to - from) * eased;
    tiltSlider.value = val;
    updateTiltFromValue(val);
    if (p < 1) raf = requestAnimationFrame(step); else animating = false;
  }
  raf = requestAnimationFrame(step);
});

// Case 18: overlay/focus toggles
const toggleOverlay = document.getElementById('toggleOverlay');
const toggleFocus = document.getElementById('toggleFocus');
const leadingOverlay = document.getElementById('leadingOverlay');
const subjectGroup = document.getElementById('subjectGroup');
let overlayOn = true, focusOn = true;

function syncCase18() {
  leadingOverlay.classList.toggle('visible', overlayOn);
  toggleOverlay.classList.toggle('active', overlayOn);
  toggleOverlay.textContent = `Overlay Leading Lines: ${overlayOn ? 'Aktif' : 'Nonaktif'}`;
  toggleFocus.classList.toggle('active', focusOn);
  toggleFocus.textContent = `Sorotan Fokus: ${focusOn ? 'Aktif' : 'Nonaktif'}`;
  subjectGroup.classList.toggle('highlight', focusOn);
  subjectGroup.style.opacity = focusOn ? '1' : '0.85';
}
toggleOverlay.addEventListener('click', () => { overlayOn = !overlayOn; syncCase18(); });
toggleFocus.addEventListener('click', () => { focusOn = !focusOn; syncCase18(); });

// Modal
const modal = document.getElementById('focusModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalTag = document.getElementById('modalTag');
function openModal(data, idx) {
  const item = data.qa[idx];
  modalTag.textContent = `Presentation / Focus Mode · Studi Kasus ${data.number}`;
  modalTitle.textContent = item.q;
  modalBody.innerHTML = `<p style="color:var(--text);font-weight:500;margin-bottom:10px;">${data.title}</p>${item.a}`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Toast
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

// Init
setCase('case2');
setMode('tilt');
syncCase18();
