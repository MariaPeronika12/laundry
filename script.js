/*
  Bilas Laundry – script.js
  Isi file:
  1. Kalkulator biaya, estimasi selesai, dan tautan WhatsApp
  2. Simpan pesanan dan lacak status cucian (localStorage)
  3. Tombol tema terang/gelap
  4. Slider sebelum & sesudah
  5. Tombol kembali ke atas
  6. Service Worker registration (PWA)
  7. Install prompt handling
  8. Multi-language support (ID/EN)
  9. Customer loyalty & referral system
*/

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
      console.log('[SW] Registered:', reg.scope);
      // Check for updates periodically
      setInterval(function() { reg.update(); }, 60 * 60 * 1000);
    }).catch(function(err) {
      console.error('[SW] Registration failed:', err);
    });
  });
}

// Multi-language support
const I18N = {
  id: {
    // Hero
    hero_title: "Baju bersih, wangi, <span>sampai di pintu rumah.</span>",
    hero_desc: "Kami jemput cucian Anda, cuci dengan deterjen lembut, lalu antar kembali tepat waktu dan rapi. Hitung biayanya dulu, pesan lewat WhatsApp.",
    hitung_title: "Hitung biaya cucian Anda",
    layanan_label: "Layanan",
    berat_label: "Perkiraan berat (kg)",
    antar_label: "Antar-jemput ke rumah",
    total_label: "Perkiraan total",
    tambah_btn: "Tambah ke keranjang",
    simpan_btn: "Simpan pesanan & dapatkan kode",
    wa_btn: "Pesan sekarang lewat WhatsApp",
    // Cart
    keranjang_title: "Keranjang pesanan",
    keranjang_sub: "Gabungkan beberapa layanan dalam satu pesanan, lalu pakai kode promo (coba HEMAT10 atau HEMAT5K).",
    promo_placeholder: "Kode promo",
    pakai_btn: "Pakai",
    c_sub: "Subtotal",
    c_disk: "Diskon",
    c_ongkir: "Antar-jemput",
    c_total: "Total",
    c_wa_btn: "Kirim keranjang lewat WhatsApp",
    c_kosong_btn: "Kosongkan keranjang",
    // Services
    layanan_title: "Layanan kami",
    layanan_sub: "Pilih yang sesuai kebutuhan, semuanya dijemput dan diantar.",
    // Prices
    harga_title: "Daftar harga",
    harga_sub: "Harga sudah termasuk deterjen dan pewangi. Berat ditimbang ulang saat cucian dijemput.",
    // Packages
    paket_title: "Paket langganan",
    paket_sub: "Lebih hemat untuk cucian rutin. Berlaku 30 hari, sudah termasuk antar-jemput.",
    paket_hemat: "Hemat",
    paket_hemat_desc: "10 kg cuci + setrika",
    paket_plus: "Plus",
    paket_plus_desc: "20 kg cuci + setrika",
    paket_keluarga: "Keluarga",
    paket_keluarga_desc: "40 kg cuci + setrika",
    ambil_paket: "Ambil paket",
    saran_label: "Berapa kg cucian Anda per bulan?",
    // How it works
    cara_title: "Cara kerjanya",
    cara_sub: "Empat langkah, tanpa perlu keluar rumah.",
    cara_1_title: "Pesan",
    cara_1_desc: "Isi kalkulator di atas, lalu kirim lewat WhatsApp.",
    cara_2_title: "Jemput",
    cara_2_desc: "Kurir datang ke alamat Anda dan menimbang cucian.",
    cara_3_title: "Cuci",
    cara_3_desc: "Pakaian dipisah per warna, dicuci, dikeringkan, dan disetrika.",
    cara_4_title: "Antar",
    cara_4_desc: "Cucian wangi dan terlipat rapi sampai di rumah.",
    // About
    tentang_title: "Tentang kami",
    tentang_desc: "Bilas Laundry berawal dari satu mesin cuci dan keinginan sederhana: pakaian pelanggan bersih, wangi, dan sampai tepat waktu. Kami memisahkan cucian per warna, memakai deterjen yang lembut di kulit, dan selalu memberi kabar lewat WhatsApp.",
    stat_1: "1.000+",
    stat_1_label: "cucian selesai",
    stat_2: "6 jam",
    stat_2_label: "layanan ekspres",
    stat_3: "5 km",
    stat_3_label: "radius antar-jemput",
    // Gallery
    galeri_title: "Sebelum & sesudah",
    galeri_sub: "Geser untuk melihat perbedaan hasil cucian kami.",
    sebelum: "Sebelum",
    sesudah: "Sesudah",
    // Booking
    booking_title: "Booking jemput cucian",
    booking_sub: "Isi data di bawah. Kami jadwalkan penjemputan lalu konfirmasi lewat WhatsApp.",
    bk_nama: "Nama",
    bk_hp: "Nomor HP",
    bk_alamat: "Alamat jemput",
    bk_tgl: "Tanggal jemput",
    bk_jam: "Jam jemput",
    bk_catatan: "Catatan (opsional)",
    bk_submit: "Kirim booking sekarang",
    // Track
    lacak_title: "Lacak cucian",
    lacak_sub: "Masukkan kode pesanan Anda. Untuk demo, status berpindah otomatis setiap 20 detik.",
    kode_placeholder: "Contoh: BL-1234",
    cari_btn: "Cek status",
    riwayat_title: "Pesanan terakhir",
    // Testimonials
    testi_title: "Kata pelanggan",
    testi_sub: "Cerita singkat dari mereka yang sudah mencoba.",
    ulasan_title: "Tulis ulasan Anda",
    u_nama: "Nama",
    u_nilai: "Nilai",
    u_teks: "Ulasan",
    u_submit: "Kirim ulasan",
    // FAQ
    faq_title: "Tanya jawab",
    faq_sub: "Jawaban singkat untuk hal yang paling sering ditanyakan.",
    faq_search: "Cari pertanyaan...",
    faq_empty: "Tidak ada pertanyaan yang cocok.",
    // Contact
    kontak_title: "Kontak & jam buka",
    kontak_sub: "Senin–Sabtu 07.00–20.00, Minggu 09.00–17.00.",
    wa_chat: "Chat WhatsApp",
    alamat_label: "Alamat",
    maps_link: "Lihat di Google Maps",
    wa_label: "WhatsApp",
    area_label: "Area layanan",
    area_desc: "Radius 5 km dari toko.",
    // Footer
    share_btn: "Bagikan situs",
    back_top: "Kembali ke atas",
    // Notifications
    js_required: "Aktifkan JavaScript agar kalkulator, booking, dan pelacakan cucian berfungsi.",
    // Promo
    promo_hemat10: "Diskon 10%",
    promo_hemat5k: "Potongan Rp5.000",
    // Units
    unit_kg: "kg",
    unit_pasang: "pasang",
    unit_m2: "m²",
    unit_pcs: "pcs",
    // Status
    status_dijemput: "Dijemput",
    status_dicuci: "Dicuci",
    status_disetrika: "Disetrika",
    status_diantar: "Diantar",
    // Common
    simpan: "Simpan",
    batal: "Batal",
    hapus: "Hapus",
    kosong: "Kosong",
    cari: "Cari",
    tutup: "Tutup",
    buka: "Buka",
    copy: "Salin",
    copied: "Tersalin ✓",
    error: "Gagal",
    success: "Berhasil",
    confirm: "Konfirmasi",
    // Time greetings
    pagi: "Selamat pagi",
    siang: "Selamat siang",
    sore: "Selamat sore",
    malam: "Selamat malam",
    // Loyalty
    loyalty_title: "Poin Loyalitas",
    loyalty_points: "Poin Anda",
    loyalty_redeem: "Tukar Hadiah",
    referral_title: "Referral",
    referral_code: "Kode Referral",
    referral_share: "Bagikan Kode",
    referral_reward: "Hadiah Referral",
    // Language
    lang_id: "Indonesia",
    lang_en: "English",
    // 404 page
    404_title: "Halaman tidak ditemukan",
    404_desc: "Sepertinya halaman ini hilang di mesin cuci. Kembali ke beranda untuk menghitung biaya dan memesan laundry.",
    404_home: "Kembali ke beranda"
  },
  en: {
    // Hero
    hero_title: "Clean, fresh clothes, <span>delivered to your door.</span>",
    hero_desc: "We pick up your laundry, wash with gentle detergent, and deliver back on time, neatly folded. Calculate cost first, order via WhatsApp.",
    hitung_title: "Calculate your laundry cost",
    layanan_label: "Service",
    berat_label: "Estimated weight (kg)",
    antar_label: "Home pick-up & delivery",
    total_label: "Estimated total",
    tambah_btn: "Add to cart",
    simpan_btn: "Save order & get code",
    wa_btn: "Order now via WhatsApp",
    // Cart
    keranjang_title: "Order Cart",
    keranjang_sub: "Combine multiple services in one order, then use promo code (try HEMAT10 or HEMAT5K).",
    promo_placeholder: "Promo code",
    pakai_btn: "Apply",
    c_sub: "Subtotal",
    c_disk: "Discount",
    c_ongkir: "Delivery",
    c_total: "Total",
    c_wa_btn: "Send cart via WhatsApp",
    c_kosong_btn: "Clear cart",
    // Services
    layanan_title: "Our Services",
    layanan_sub: "Choose what fits your needs, all with pick-up & delivery.",
    // Prices
    harga_title: "Price List",
    harga_sub: "Prices include detergent and fragrance. Weight re-checked at pick-up.",
    // Packages
    paket_title: "Subscription Packages",
    paket_sub: "Save more for regular laundry. Valid 30 days, includes pick-up & delivery.",
    paket_hemat: "Basic",
    paket_hemat_desc: "10 kg wash + iron",
    paket_plus: "Plus",
    paket_plus_desc: "20 kg wash + iron",
    paket_keluarga: "Family",
    paket_keluarga_desc: "40 kg wash + iron",
    ambil_paket: "Get package",
    saran_label: "How many kg of laundry per month?",
    // How it works
    cara_title: "How it works",
    cara_sub: "Four steps, without leaving home.",
    cara_1_title: "Order",
    cara_1_desc: "Fill the calculator above, then send via WhatsApp.",
    cara_2_title: "Pick-up",
    cara_2_desc: "Courier comes to your address and weighs the laundry.",
    cara_3_title: "Wash",
    cara_3_desc: "Clothes separated by color, washed, dried, and ironed.",
    cara_4_title: "Delivery",
    cara_4_desc: "Fresh, neatly folded clothes delivered to your home.",
    // About
    tentang_title: "About Us",
    tentang_desc: "Bilas Laundry started with one washing machine and a simple wish: customer clothes clean, fresh, and on time. We separate by color, use skin-friendly detergent, and always update via WhatsApp.",
    stat_1: "1,000+",
    stat_1_label: "orders completed",
    stat_2: "6 hrs",
    stat_2_label: "express service",
    stat_3: "5 km",
    stat_3_label: "pick-up radius",
    // Gallery
    galeri_title: "Before & After",
    galeri_sub: "Slide to see the difference in our wash results.",
    sebelum: "Before",
    sesudah: "After",
    // Booking
    booking_title: "Schedule Pick-up",
    booking_sub: "Fill in the details below. We schedule pick-up and confirm via WhatsApp.",
    bk_nama: "Name",
    bk_hp: "Phone Number",
    bk_alamat: "Pick-up Address",
    bk_tgl: "Pick-up Date",
    bk_jam: "Pick-up Time",
    bk_catatan: "Notes (optional)",
    bk_submit: "Send booking now",
    // Track
    lacak_title: "Track Laundry",
    lacak_sub: "Enter your order code. For demo, status changes automatically every 20 seconds.",
    kode_placeholder: "e.g. BL-1234",
    cari_btn: "Check status",
    riwayat_title: "Recent Orders",
    // Testimonials
    testi_title: "Customer Reviews",
    testi_sub: "Short stories from those who have tried.",
    ulasan_title: "Write Your Review",
    u_nama: "Name",
    u_nilai: "Rating",
    u_teks: "Review",
    u_submit: "Submit Review",
    // FAQ
    faq_title: "FAQ",
    faq_sub: "Quick answers to the most common questions.",
    faq_search: "Search questions...",
    faq_empty: "No matching questions.",
    // Contact
    kontak_title: "Contact & Hours",
    kontak_sub: "Mon–Sat 07.00–20.00, Sun 09.00–17.00.",
    wa_chat: "Chat WhatsApp",
    alamat_label: "Address",
    maps_link: "View on Google Maps",
    wa_label: "WhatsApp",
    area_label: "Service Area",
    area_desc: "5 km radius from store.",
    // Footer
    share_btn: "Share site",
    back_top: "Back to top",
    // Notifications
    js_required: "Enable JavaScript for calculator, booking, and tracking to work.",
    // Promo
    promo_hemat10: "10% Discount",
    promo_hemat5k: "Rp5,000 Off",
    // Units
    unit_kg: "kg",
    unit_pasang: "pair",
    unit_m2: "m²",
    unit_pcs: "pcs",
    // Status
    status_dijemput: "Picked up",
    status_dicuci: "Washing",
    status_disetrika: "Ironing",
    status_diantar: "Delivered",
    // Common
    simpan: "Save",
    batal: "Cancel",
    hapus: "Delete",
    kosong: "Empty",
    cari: "Search",
    tutup: "Close",
    buka: "Open",
    copy: "Copy",
    copied: "Copied ✓",
    error: "Failed",
    success: "Success",
    confirm: "Confirm",
    // Time greetings
    pagi: "Good morning",
    siang: "Good afternoon",
    sore: "Good evening",
    malam: "Good night",
    // Loyalty
    loyalty_title: "Loyalty Points",
    loyalty_points: "Your Points",
    loyalty_redeem: "Redeem Rewards",
    referral_title: "Referral",
    referral_code: "Referral Code",
    referral_share: "Share Code",
    referral_reward: "Referral Reward",
    // Language
    lang_id: "Indonesia",
    lang_en: "English",
    // 404 page
    404_title: "Page Not Found",
    404_desc: "Looks like this page got lost in the wash. Back to home to calculate and order laundry.",
    404_home: "Back to Home"
  }
};

// Loyalty & Referral System
const LOYALTY = {
  POINTS_PER_1K: 10,        // 10 points per Rp1,000 spent
  REDEEM_RATE: 100,         // 100 points = Rp1,000 discount
  REWARDS: [
    { id: 'discount_5k', name: 'Rp5,000 Discount', points: 500, type: 'discount', value: 5000 },
    { id: 'discount_10k', name: 'Rp10,000 Discount', points: 1000, type: 'discount', value: 10000 },
    { id: 'discount_25k', name: 'Rp25,000 Discount', points: 2500, type: 'discount', value: 25000 },
    { id: 'express_free', name: 'Free Express Upgrade', points: 1500, type: 'upgrade', value: 'express' },
    { id: 'wash_free_5kg', name: 'Free 5kg Wash', points: 3000, type: 'free_wash', value: 5 }
  ],
  REFERRAL_REWARD_POINTS: 500,
  REFERRAL_FRIEND_DISCOUNT: 5000
};

// Initialize language
let currentLang = 'id';

function getLang() {
  try {
    return localStorage.getItem('bilas_lang') || 'id';
  } catch (e) {
    return 'id';
  }
}

function setLang(lang) {
  currentLang = lang;
  try {
    localStorage.setItem('bilas_lang', lang);
  } catch (e) {}
  applyLanguage();
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N.id[key] || key;
}

function applyLanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.innerHTML = t(key);
    }
  });
  
  // Update language button text
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = currentLang === 'id' ? 'EN' : 'ID';
    langBtn.setAttribute('aria-label', currentLang === 'id' ? 'Switch to English' : 'Beralih ke Indonesia');
  }
  
  // Update select options that have data-i18n
  document.querySelectorAll('option[data-i18n]').forEach(opt => {
    opt.textContent = t(opt.getAttribute('data-i18n'));
  });
  
  // Re-render dynamic content
  if (typeof render === 'function') render();
  if (typeof update === 'function') update();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  currentLang = getLang();
  applyLanguage();
  
  // Add language toggle button to header
  addLanguageToggle();
});

function addLanguageToggle() {
  const nav = document.querySelector('header nav');
  if (nav && !document.getElementById('lang-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.type = 'button';
    btn.className = 'tema';
    btn.style.marginLeft = '8px';
    btn.title = currentLang === 'id' ? 'Switch to English' : 'Beralih ke Indonesia';
    btn.setAttribute('aria-label', currentLang === 'id' ? 'Switch to English' : 'Beralih ke Indonesia');
    btn.textContent = currentLang === 'id' ? 'EN' : 'ID';
    btn.addEventListener('click', function() {
      setLang(currentLang === 'id' ? 'en' : 'id');
    });
    nav.appendChild(btn);
  }
}

// Loyalty functions
function getLoyaltyData() {
  try {
    return JSON.parse(localStorage.getItem('bilas_loyalty') || '{}');
  } catch (e) {
    return {};
  }
}

function saveLoyaltyData(data) {
  try {
    localStorage.setItem('bilas_loyalty', JSON.stringify(data));
  } catch (e) {}
}

function addLoyaltyPoints(amountSpent) {
  const data = getLoyaltyData();
  const pointsEarned = Math.floor(amountSpent / 1000) * LOYALTY.POINTS_PER_1K;
  data.points = (data.points || 0) + pointsEarned;
  data.history = data.history || [];
  data.history.unshift({
    date: Date.now(),
    type: 'earn',
    amount: amountSpent,
    points: pointsEarned,
    balance: data.points
  });
  saveLoyaltyData(data);
  return pointsEarned;
}

function redeemReward(rewardId) {
  const data = getLoyaltyData();
  const reward = LOYALTY.REWARDS.find(r => r.id === rewardId);
  if (!reward || (data.points || 0) < reward.points) return false;
  
  data.points -= reward.points;
  data.history = data.history || [];
  data.history.unshift({
    date: Date.now(),
    type: 'redeem',
    reward: rewardId,
    points: -reward.points,
    balance: data.points
  });
  saveLoyaltyData(data);
  return reward;
}

function getReferralCode() {
  const data = getLoyaltyData();
  if (!data.referralCode) {
    // Generate unique referral code
    const name = (data.name || 'USER').toUpperCase().replace(/\s+/g, '').slice(0, 6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    data.referralCode = name + random;
    saveLoyaltyData(data);
  }
  return data.referralCode;
}

function applyReferralCode(code) {
  const data = getLoyaltyData();
  if (data.referredBy) return { success: false, message: t('error') + ': ' + t('confirm') };
  if (code === data.referralCode) return { success: false, message: t('error') + ': Cannot use own code' };
  
  // In real app, would validate against server
  // For demo, accept any 6+ char code
  if (code.length < 6) return { success: false, message: t('error') + ': Invalid code' };
  
  data.referredBy = code;
  data.points = (data.points || 0) + LOYALTY.REFERRAL_REWARD_POINTS;
  data.history = data.history || [];
  data.history.unshift({
    date: Date.now(),
    type: 'referral_bonus',
    referralCode: code,
    points: LOYALTY.REFERRAL_REWARD_POINTS,
    balance: data.points
  });
  saveLoyaltyData(data);
  
  return { 
    success: true, 
    message: t('success') + '! +' + LOYALTY.REFERRAL_REWARD_POINTS + ' ' + t('loyalty_points').toLowerCase(),
    discount: LOYALTY.REFERRAL_FRIEND_DISCOUNT
  };
}

// Show loyalty modal
function showLoyaltyModal() {
  const data = getLoyaltyData();
  const points = data.points || 0;
  const referralCode = getReferralCode();
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal loyalty-modal" role="dialog" aria-labelledby="loyalty-title" aria-modal="true">
      <button class="modal-close" type="button" aria-label="${t('tutup')}">&times;</button>
      <h2 id="loyalty-title">${t('loyalty_title')}</h2>
      <div class="loyalty-header">
        <div class="points-display">
          <span class="points-label">${t('loyalty_points')}</span>
          <span class="points-value">${points.toLocaleString('id-ID')}</span>
        </div>
        <div class="referral-section">
          <h3>${t('referral_title')}</h3>
          <div class="referral-code-display">
            <code id="ref-code">${referralCode}</code>
            <button class="btn copy-ref" type="button" data-copy="${referralCode}">${t('copy')}</button>
          </div>
          <p class="note">${t('referral_share')} - ${t('referral_reward')}: ${LOYALTY.REFERRAL_REWARD_POINTS} ${t('loyalty_points').toLowerCase()}</p>
          <input type="text" id="referral-input" placeholder="${t('referral_code')}" aria-label="${t('referral_code')}" maxlength="12">
          <button class="btn" id="apply-referral" type="button">${t('simpan')}</button>
          <p class="note" id="referral-msg"></p>
        </div>
      </div>
      <h3>${t('loyalty_redeem')}</h3>
      <div class="rewards-grid">
        ${LOYALTY.REWARDS.map(r => `
          <button class="reward-card ${(points >= r.points) ? '' : 'disabled'}" 
                  data-reward="${r.id}" 
                  ${(points >= r.points) ? '' : 'disabled'}
                  aria-disabled="${points < r.points}">
            <span class="reward-name">${r.name}</span>
            <span class="reward-cost">${r.points.toLocaleString('id-ID')} ${t('loyalty_points').toLowerCase()}</span>
          </button>
        `).join('')}
      </div>
      <h3>Riwayat</h3>
      <div class="loyalty-history">
        ${(data.history || []).slice(0, 10).map(h => `
          <div class="history-item">
            <span>${new Date(h.date).toLocaleDateString('id-ID')}</span>
            <span class="${h.points >= 0 ? 'positive' : 'negative'}">${h.points >= 0 ? '+' : ''}${h.points.toLocaleString('id-ID')} pts</span>
            <span>${h.balance.toLocaleString('id-ID')} pts</span>
          </div>
        `).join('') || `<p class="note">${t('kosong')}</p>`}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Event listeners
  modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  modal.querySelector('.copy-ref').addEventListener('click', function() {
    navigator.clipboard.writeText(this.dataset.copy).then(() => {
      this.textContent = t('copied');
      setTimeout(() => this.textContent = t('copy'), 2000);
    });
  });
  modal.querySelector('#apply-referral').addEventListener('click', function() {
    const code = modal.querySelector('#referral-input').value.trim().toUpperCase();
    if (!code) return;
    const result = applyReferralCode(code);
    const msgEl = modal.querySelector('#referral-msg');
    msgEl.textContent = result.message;
    msgEl.style.color = result.success ? 'var(--teal)' : 'var(--pink)';
    if (result.success) {
      setTimeout(() => modal.remove(), 1500);
      showLoyaltyModal(); // Refresh
    }
  });
  modal.querySelectorAll('.reward-card:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', function() {
      const reward = redeemReward(this.dataset.reward);
      if (reward) {
        alert(t('success') + '! ' + reward.name + ' diklaim.');
        modal.remove();
        showLoyaltyModal();
      }
    });
  });
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  
  // ESC to close
  document.addEventListener('keydown', function escClose(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escClose);
    }
  });
}

// Add loyalty button to header
function addLoyaltyButton() {
  const nav = document.querySelector('header nav');
  if (nav && !document.getElementById('loyalty-btn')) {
    const btn = document.createElement('button');
    btn.id = 'loyalty-btn';
    btn.type = 'button';
    btn.className = 'tema';
    btn.style.marginLeft = '8px';
    btn.title = t('loyalty_title');
    btn.setAttribute('aria-label', t('loyalty_title'));
    btn.innerHTML = '⭐';
    btn.addEventListener('click', showLoyaltyModal);
    nav.appendChild(btn);
  }
}

// Call after language init
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(addLoyaltyButton, 100);
});

// PWA Install Prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPrompt();
});

function showInstallPrompt() {
  if (localStorage.getItem('bilas_install_dismissed') === 'true') return;
  if (window.matchMedia('(display-mode: standalone)').matches) return;
  
  const prompt = document.createElement('div');
  prompt.className = 'install-prompt';
  prompt.innerHTML = `
    <div class="install-content">
      <span class="install-icon">🧺</span>
      <div class="install-text">
        <strong>${currentLang === 'id' ? 'Pasang Bilas Laundry' : 'Install Bilas Laundry'}</strong>
        <span>${currentLang === 'id' ? 'Akses cepat dari layar utama, bekerja offline' : 'Quick access from home screen, works offline'}</span>
      </div>
      <button class="btn install-btn" type="button">${currentLang === 'id' ? 'Pasang' : 'Install'}</button>
      <button class="chip dismiss-btn" type="button">${currentLang === 'id' ? 'Nanti' : 'Later'}</button>
    </div>
  `;
  document.body.appendChild(prompt);
  
  prompt.querySelector('.install-btn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installed');
    }
    deferredPrompt = null;
    prompt.remove();
  });
  
  prompt.querySelector('.dismiss-btn').addEventListener('click', () => {
    localStorage.setItem('bilas_install_dismissed', 'true');
    prompt.remove();
  });
  
  // Auto dismiss after 30 seconds
  setTimeout(() => {
    if (document.body.contains(prompt)) prompt.remove();
  }, 30000);
}

// Check for SW updates
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(reg => {
      reg.update();
    });
  }
}

// Add update check to visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkForUpdates();
  }
});

// Export for use in other modules
window.BilasLaundry = {
  t,
  getLang,
  setLang,
  currentLang: () => currentLang,
  addLoyaltyPoints,
  getLoyaltyData,
  showLoyaltyModal,
  getReferralCode,
  applyReferralCode,
  LOYALTY
};

(function(){
  var WA="6281234567890";
  var $=function(i){return document.getElementById(i)};
  var rp=function(n){return "Rp"+Math.round(n).toLocaleString("id-ID")};
  function update(){
    var sel=$("layanan"),harga=+sel.value,kg=Math.min(50,Math.max(0,parseFloat($("berat").value)||0));
    var unit=sel.options[sel.selectedIndex].getAttribute("data-unit")||"kg";
    $("lblberat").textContent=unit=="kg"?"Perkiraan berat (kg)":"Jumlah ("+unit+")";
    var antar=$("antar").checked,ongkir=0,info="";
    if(antar){ongkir=(unit=="kg"&&kg>=5)?0:5000;info=ongkir?"Ongkos antar-jemput Rp5.000 (gratis mulai 5 kg).":"Antar-jemput gratis.";}
    else info="Anda mengantar dan mengambil sendiri ke toko.";
    if(kg<=0){ongkir=0;info="Masukkan jumlah lebih dari 0.";}
    var total=harga*kg+ongkir;
    var jam=+sel.options[sel.selectedIndex].getAttribute("data-jam")||48,d=new Date(Date.now()+jam*3600000);
    var est=d.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long"})+(jam<=12?", sekitar pukul "+d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}):"");
    $("estimasi").textContent=kg>0?"Estimasi selesai: "+est:"";
    $("total").textContent=rp(total);
    $("ongkir").textContent=info+" Total final menyesuaikan timbangan.";
    var teks="Halo Bilas Laundry, saya mau pesan:\n- Layanan: "+sel.options[sel.selectedIndex].text.split(" – ")[0]+
      "\n- Jumlah: "+kg+" "+unit+"\n- "+(antar?"Antar-jemput":"Antar sendiri")+
      "\n- Perkiraan total: "+rp(total)+"\n- Estimasi selesai: "+est+"\nAlamat: ";
    $("wa").href="https://wa.me/"+WA+"?text="+encodeURIComponent(teks);
  }
  ["layanan","berat","antar"].forEach(function(i){$(i).addEventListener("input",update)});
  update();
})();

/* Hari 9: pesanan, kode, dan lacak status (disimpan di browser) */
(function(){
  var KEY="bilas_pesanan",LANGKAH=["Dijemput","Dicuci","Disetrika","Diantar"],DETIK=20;
  var $=function(i){return document.getElementById(i)},aktif=null;
  function muat(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
  function simpan(l){try{localStorage.setItem(KEY,JSON.stringify(l))}catch(e){}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function tahap(p){return Math.min(Math.floor((Date.now()-p.waktu)/1000/DETIK),LANGKAH.length-1)}
  function tampil(p){
    aktif=p?p.kode:null;
    if(!p){$("hasil").innerHTML='<p class="kosong">Kode tidak ditemukan. Periksa lagi atau buat pesanan baru di kalkulator.</p>';return}
    var t=tahap(p),li=LANGKAH.map(function(n,i){return'<li class="'+(i<t?"done":i==t?"now":"")+'">'+esc(n)+'</li>'}).join("");
    $("hasil").innerHTML='<div class="detail"><div><b>'+esc(p.kode)+'</b><span>'+esc(p.layanan)+' · '+esc(p.kg)+' '+esc(p.unit||'kg')+' · '+(p.antar?"antar-jemput":"antar sendiri")+'</span></div><strong>'+esc(p.total)+'</strong></div><ol class="steps">'+li+'</ol><p class="note">'+(t==3?"Cucian sudah diantar. Terima kasih!":"Status saat ini: "+LANGKAH[t])+'</p>';
  }
  function cari(k){var p=muat().filter(function(x){return x.kode==k.trim().toUpperCase()})[0];tampil(p)}
  function riwayat(){
    var l=muat();
    $("riwayat").innerHTML=l.length?l.map(function(p){return'<button type="button" class="chip" data-k="'+esc(p.kode)+'">'+esc(p.kode)+' · '+esc(p.total)+'</button>'}).join("")+'<button type="button" class="chip" data-hapus="1">Hapus riwayat</button>':'<p class="kosong">Belum ada pesanan tersimpan.</p>';
  }
  $("simpan").addEventListener("click",function(){
    var s=$("layanan"),p={kode:"BL-"+Math.floor(1000+Math.random()*9000),layanan:s.options[s.selectedIndex].text.split(" – ")[0],kg:+$("berat").value||0,unit:s.options[s.selectedIndex].getAttribute("data-unit")||"kg",antar:$("antar").checked,total:$("total").textContent,waktu:Date.now()};
    var l=muat();l.unshift(p);simpan(l.slice(0,10));
    $("kode").textContent="Pesanan tersimpan. Kode Anda: "+p.kode;
    var tb=document.createElement("button");tb.type="button";tb.className="chip";tb.textContent="Salin kode";
    tb.addEventListener("click",function(){
      if(navigator.clipboard){navigator.clipboard.writeText(p.kode).then(function(){tb.textContent="Tersalin \u2713"},function(){tb.textContent="Gagal menyalin"})}
      else{tb.textContent="Tidak didukung"}
    });
    $("kode").appendChild(tb);
    $("kodeinput").value=p.kode;tampil(p);riwayat();
    $("lacak").scrollIntoView({behavior:"smooth"});
  });
  $("cari").addEventListener("click",function(){cari($("kodeinput").value)});
  $("kodeinput").addEventListener("keydown",function(e){if(e.key=="Enter")cari(this.value)});
  $("riwayat").addEventListener("click",function(e){
    if(e.target.getAttribute&&e.target.getAttribute("data-hapus")){if(confirm("Hapus semua riwayat pesanan?")){simpan([]);aktif=null;$("hasil").innerHTML="";riwayat()}return}var k=e.target.getAttribute&&e.target.getAttribute("data-k");if(k){$("kodeinput").value=k;cari(k)}});
  setInterval(function(){if(aktif)cari(aktif)},2000);
  riwayat();
})();

/* Tombol tema terang/gelap */
(function(){
  var k="bilas_tema",d=document.documentElement,b=document.getElementById("tema"),t;
  function pasang(x){d.setAttribute("data-theme",x);b.textContent=x=="dark"?"\u2600\uFE0F":"\uD83C\uDF19";b.setAttribute("aria-pressed",x=="dark")}
  try{t=localStorage.getItem(k)}catch(e){}
  if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  pasang(t);
  b.addEventListener("click",function(){t=t=="dark"?"light":"dark";pasang(t);try{localStorage.setItem(k,t)}catch(e){}});
})();

/* Slider sebelum & sesudah */
(function(){
  var r=document.getElementById("ba-range"),s=document.getElementById("ba-sesudah"),g=document.getElementById("ba-garis");
  function u(){s.style.clipPath="inset(0 0 0 "+r.value+"%)";g.style.left=r.value+"%"}
  r.addEventListener("input",u);u();
})();

/* Tombol kembali ke atas */
(function(){
  var b=document.getElementById("atas");
  function cek(){b.hidden=window.scrollY<400}
  window.addEventListener("scroll",cek,{passive:true});cek();
  b.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});
})();

/* Sapaan sesuai waktu di bagian atas halaman */
(function(){
  var j=new Date().getHours();
  var salam=j<11?"Selamat pagi":j<15?"Selamat siang":j<18?"Selamat sore":"Selamat malam";
  var h1=document.querySelector(".hero h1");
  if(!h1)return;
  var p=document.createElement("p");
  p.textContent=salam+"! Cucian menumpuk? Serahkan pada kami.";
  p.style.cssText="margin:0 0 12px;font-weight:600;color:var(--teal)";
  var anchor=h1.parentNode.querySelector(".eyebrow")||h1;
  anchor.parentNode.insertBefore(p,anchor);
})();

/* Booking jemput cucian (disimpan di browser, lalu dikirim lewat WhatsApp) */
(function(){
  var f=document.getElementById("formbooking");
  if(!f)return;
  var KEY="bilas_booking",st=document.getElementById("bk-status"),tgl=document.getElementById("bk-tgl");
  var n=new Date();
  tgl.min=n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0");
  var v=function(i){return document.getElementById(i).value.trim()};
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var d={nama:v("bk-nama"),hp:v("bk-hp"),alamat:v("bk-alamat"),tgl:v("bk-tgl"),jam:v("bk-jam"),catatan:v("bk-catatan")};
    if(!d.nama||!d.hp||!d.alamat||!d.tgl){st.textContent="Lengkapi nama, nomor HP, alamat, dan tanggal jemput.";return}
    if(!/^[0-9+\-\s]{8,16}$/.test(d.hp)){st.textContent="Nomor HP tidak valid.";return}
    var kode="BK-"+Math.floor(1000+Math.random()*9000);
    try{var l=JSON.parse(localStorage.getItem(KEY))||[];l.unshift(Object.assign({kode:kode},d));localStorage.setItem(KEY,JSON.stringify(l.slice(0,10)))}catch(x){}
    var teks="Halo Bilas Laundry, saya mau booking jemput cucian ("+kode+"):\n- Nama: "+d.nama+"\n- HP: "+d.hp+"\n- Alamat: "+d.alamat+"\n- Jemput: "+d.tgl+", "+d.jam+(d.catatan?"\n- Catatan: "+d.catatan:"");
    var wa=document.getElementById("wa").href.split("wa.me/")[1].split("?")[0];
    st.textContent="Booking "+kode+" tersimpan. Membuka WhatsApp untuk konfirmasi.";
    window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(teks),"_blank","noopener");
    f.reset();
  });
})();

/* Animasi muncul saat digulir */
(function(){
  if(!("IntersectionObserver" in window))return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("tampak");io.unobserve(e.target)}});
  },{threshold:.12});
  document.querySelectorAll("section .wrap").forEach(function(x){x.classList.add("muncul");io.observe(x)});
})();

/* Penanda buka/tutup di bagian kontak */
(function(){
  var el=document.querySelector("#kontak .sub");
  if(!el)return;
  var n=new Date(),h=n.getHours()+n.getMinutes()/60;
  var buka=n.getDay()==0?(h>=9&&h<17):(h>=7&&h<20);
  var b=document.createElement("strong");
  b.textContent=buka?" ● Buka sekarang":" ● Sedang tutup";
  b.style.color=buka?"var(--teal)":"#C2410C";
  el.appendChild(b);
})();

/* Judul tab berubah saat ditinggal */
(function(){
  var asli=document.title;
  document.addEventListener("visibilitychange",function(){
    document.title=document.hidden?"Cucian menunggu \uD83E\uDDFA":asli;
  });
})();

/* Keranjang multi-layanan, kode promo, dan paket langganan */
(function(){
  var KEY="bilas_keranjang",$=function(i){return document.getElementById(i)};
  var PROMO={HEMAT10:{tipe:"persen",nilai:10,info:"Diskon 10%"},HEMAT5K:{tipe:"tetap",nilai:5000,info:"Potongan Rp5.000"}};
  var st=(function(){try{return JSON.parse(localStorage.getItem(KEY))||{items:[],promo:""}}catch(e){return{items:[],promo:""}}})();
  var rp=function(n){return "Rp"+Math.round(n).toLocaleString("id-ID")};
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function simpan(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
  function hitung(){
    var sub=st.items.reduce(function(a,x){return a+x.sub},0),p=PROMO[st.promo],disk=0;
    if(p)disk=p.tipe=="persen"?sub*p.nilai/100:Math.min(p.nilai,sub);
    var ongkir=st.items.length?((sub-disk)>=50000?0:5000):0;
    return{sub:sub,disk:disk,ongkir:ongkir,total:sub-disk+ongkir};
  }
  function render(){
    var r=hitung();
    var tl=document.querySelector('nav a[href="#keranjang"]');
    if(tl)tl.textContent=st.items.length?"Keranjang ("+st.items.length+")":"Keranjang";
    $("cart-list").innerHTML=st.items.length?st.items.map(function(x,i){
      return'<div class="item"><div><b>'+esc(x.nama)+'</b><small>'+esc(x.jumlah)+' '+esc(x.unit)+' × '+rp(x.harga)+'</small></div><div><strong>'+rp(x.sub)+'</strong><button type="button" class="chip" data-hapus="'+i+'" aria-label="Hapus '+esc(x.nama)+'">Hapus</button></div></div>';
    }).join(""):'<p class="kosong">Keranjang masih kosong. Pilih layanan di kalkulator lalu klik "Tambah ke keranjang".</p>';
    $("c-sub").textContent=rp(r.sub);$("c-disk").textContent=r.disk?"-"+rp(r.disk):"Rp0";
    $("c-ongkir").textContent=r.ongkir?rp(r.ongkir):(st.items.length?"Gratis":"Rp0");$("c-total").textContent=rp(r.total);
    if(st.promo&&PROMO[st.promo])$("promo").value=st.promo;
  }
  function pesan(t){$("c-pesan").textContent=t}
  $("tambah").addEventListener("click",function(){
    var s=$("layanan"),o=s.options[s.selectedIndex],jml=Math.min(50,Math.max(0,parseFloat($("berat").value)||0));
    if(jml<=0){pesan("Masukkan jumlah lebih dari 0 di kalkulator.");return}
    if(st.items.length>=10){pesan("Maksimal 10 layanan per keranjang.");return}
    var harga=+s.value;st.items.push({nama:o.text.split(" – ")[0],jumlah:jml,unit:o.getAttribute("data-unit")||"kg",harga:harga,sub:harga*jml});
    simpan();render();pesan("Ditambahkan ke keranjang.");
    $("keranjang").scrollIntoView({behavior:"smooth"});
  });
  $("cart-list").addEventListener("click",function(e){
    var i=e.target.getAttribute&&e.target.getAttribute("data-hapus");
    if(i!==null&&i!==undefined&&i!==false){st.items.splice(+i,1);simpan();render()}
  });
  $("pakai").addEventListener("click",function(){
    var k=$("promo").value.trim().toUpperCase();
    if(!k){st.promo="";simpan();render();pesan("Kode promo dihapus.");return}
    if(PROMO[k]){st.promo=k;simpan();render();pesan("Kode "+k+" dipakai: "+PROMO[k].info+".")}
    else pesan("Kode promo tidak dikenal.");
  });
  $("c-kosong").addEventListener("click",function(){if(!st.items.length)return;if(confirm("Kosongkan keranjang?")){st.items=[];st.promo="";$("promo").value="";simpan();render();pesan("Keranjang dikosongkan.")}});
  function nomor(){return $("wa").href.split("wa.me/")[1].split("?")[0]}
  $("c-wa").addEventListener("click",function(){
    if(!st.items.length){pesan("Keranjang masih kosong.");return}
    var r=hitung(),t="Halo Bilas Laundry, saya mau pesan:\n"+st.items.map(function(x){return"- "+x.nama+" "+x.jumlah+" "+x.unit+" = "+rp(x.sub)}).join("\n");
    if(r.disk)t+="\nPromo "+st.promo+": -"+rp(r.disk);
    t+="\nAntar-jemput: "+(r.ongkir?rp(r.ongkir):"gratis")+"\nTotal: "+rp(r.total)+"\nAlamat: ";
    window.open("https://wa.me/"+nomor()+"?text="+encodeURIComponent(t),"_blank","noopener");
  });
  document.querySelectorAll("[data-paket]").forEach(function(b){
    b.addEventListener("click",function(){
      var t="Halo Bilas Laundry, saya mau ambil paket langganan "+b.getAttribute("data-paket")+".\nNama: \nAlamat: ";
      window.open("https://wa.me/"+nomor()+"?text="+encodeURIComponent(t),"_blank","noopener");
    });
  });
  render();
})();

/* Ulasan pelanggan dan pencarian FAQ */
(function(){
  var KEY="bilas_ulasan",$=function(i){return document.getElementById(i)};
  function muat(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function bintang(n){return"\u2605\u2605\u2605\u2605\u2605".slice(0,n)+"\u2606\u2606\u2606\u2606\u2606".slice(0,5-n)}
  function render(){
    var l=muat(),tot=15,cnt=3+l.length;
    l.forEach(function(u){tot+=u.nilai});
    var rata=tot/cnt;
    $("u-rata").textContent=rata.toFixed(1).replace(".",",");
    $("u-bintang").textContent=bintang(Math.round(rata));
    $("u-jumlah").textContent="dari "+cnt+" ulasan";
    $("u-daftar").innerHTML=l.map(function(u){
      return'<figure><div class="stars" aria-label="'+u.nilai+' dari 5 bintang">'+bintang(u.nilai)+'</div><blockquote>'+esc(u.teks)+'</blockquote><figcaption><b>'+esc(u.nama)+'</b>Ulasan baru</figcaption></figure>';
    }).join("");
  }
  $("fulasan").addEventListener("submit",function(e){
    e.preventDefault();
    var u={nama:$("u-nama").value.trim(),nilai:+$("u-nilai").value,teks:$("u-teks").value.trim()};
    if(!u.nama||u.teks.length<10){$("u-pesan").textContent="Isi nama dan ulasan minimal 10 huruf.";return}
    var l=muat();l.unshift(u);
    try{localStorage.setItem(KEY,JSON.stringify(l.slice(0,6)))}catch(x){}
    this.reset();$("u-pesan").textContent="Terima kasih atas ulasan Anda!";render();
  });
  render();

  var c=$("faq-cari"),det=document.querySelectorAll(".faq details");
  c.addEventListener("input",function(){
    var q=c.value.trim().toLowerCase(),ada=0;
    det.forEach(function(d){
      var cocok=!q||d.textContent.toLowerCase().indexOf(q)>-1;
      d.hidden=!cocok;if(cocok)ada++;
    });
    $("faq-kosong").hidden=ada>0;
  });
})();

/* Rekomendasi paket berdasarkan kg per bulan */
(function(){
  var i=document.getElementById("kg-bulan"),o=document.getElementById("saran-hasil");
  if(!i)return;
  var KILO=9000,PAKET=[{n:"Hemat",kg:10,h:85000},{n:"Plus",kg:20,h:160000},{n:"Keluarga",kg:40,h:300000}];
  var rp=function(n){return "Rp"+Math.round(n).toLocaleString("id-ID")};
  function hitung(){
    var k=Math.min(100,Math.max(0,parseFloat(i.value)||0));
    if(k<=0){o.textContent="Masukkan jumlah kg per bulan.";return}
    var kiloan=k*KILO,best={n:"Kiloan reguler",total:kiloan};
    PAKET.forEach(function(p){
      var total=p.h+Math.max(0,k-p.kg)*KILO;
      if(total<best.total)best={n:"Paket "+p.n,total:total};
    });
    var hemat=kiloan-best.total;
    o.textContent=hemat>0
      ?"Rekomendasi: "+best.n+" ("+rp(best.total)+"). Hemat "+rp(hemat)+" dibanding kiloan ("+rp(kiloan)+")."
      :"Untuk "+k+" kg per bulan, kiloan reguler paling hemat ("+rp(kiloan)+").";
  }
  i.addEventListener("input",hitung);hitung();
})();

/* Tombol bagikan situs */
(function(){
  var b=document.getElementById("bagikan");
  if(!b)return;
  b.addEventListener("click",function(){
    var d={title:document.title,text:"Cek Bilas Laundry: cuci, setrika, dan antar-jemput.",url:location.href};
    if(navigator.share){navigator.share(d).catch(function(){})}
    else if(navigator.clipboard){navigator.clipboard.writeText(location.href).then(function(){b.textContent="Tautan tersalin \u2713"},function(){b.textContent="Gagal menyalin"})}
    else{b.textContent="Tidak didukung"}
  });
})();

/* Tekan "/" untuk langsung mencari di FAQ */
(function(){
  var c=document.getElementById("faq-cari");
  if(!c)return;
  document.addEventListener("keydown",function(e){
    var t=e.target.tagName;
    if(e.key=="/"&&t!="INPUT"&&t!="TEXTAREA"&&t!="SELECT"){e.preventDefault();c.focus();c.scrollIntoView({behavior:"smooth",block:"center"})}
  });
})();

/* Online/Offline detection */
(function(){
  function updateOnlineStatus() {
    const indicator = document.getElementById('offline-indicator');
    if (!navigator.onLine) {
      if (!indicator) {
        const div = document.createElement('div');
        div.id = 'offline-indicator';
        div.className = 'offline-indicator';
        div.textContent = currentLang === 'id' ? '📴 Mode offline - Beberapa fitur terbatas' : '📴 Offline mode - Limited features';
        document.body.appendChild(div);
      }
    } else {
      if (indicator) {
        indicator.remove();
        // Re-check for SW updates when coming back online
        checkForUpdates();
        // Re-show install prompt if dismissed
        localStorage.removeItem('bilas_install_dismissed');
        setTimeout(showInstallPrompt, 5000);
      }
    }
  }
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial check
  updateOnlineStatus();
  
  // Listen for language changes to update offline indicator
  window.addEventListener('storage', (e) => {
    if (e.key === 'bilas_lang') {
      currentLang = e.newValue || 'id';
      applyLanguage();
    }
  });
})();

/* Add missing i18n keys for placeholders */
(function(){
  // Extend I18N with placeholder keys
  const extraKeys = {
    id: {
      bk_nama_placeholder: "Nama lengkap",
      bk_hp_placeholder: "0812-xxxx-xxxx",
      bk_alamat_placeholder: "Jalan, nomor, patokan",
      bk_catatan_placeholder: "Contoh: ada selimut besar",
      u_nama_placeholder: "Nama Anda",
      u_teks_placeholder: "Ceritakan pengalaman Anda (minimal 10 huruf)",
      nav_harga: "Harga",
      nav_cara: "Cara kerja",
      nav_keranjang: "Keranjang",
      nav_paket: "Paket",
      nav_booking: "Booking",
      nav_lacak: "Lacak",
      nav_faq: "FAQ",
      nav_kontak: "Kontak"
    },
    en: {
      bk_nama_placeholder: "Full name",
      bk_hp_placeholder: "Phone number",
      bk_alamat_placeholder: "Street, number, landmark",
      bk_catatan_placeholder: "E.g.: large bedcover",
      u_nama_placeholder: "Your name",
      u_teks_placeholder: "Share your experience (min 10 chars)",
      nav_harga: "Prices",
      nav_cara: "How it works",
      nav_keranjang: "Cart",
      nav_paket: "Packages",
      nav_booking: "Booking",
      nav_lacak: "Track",
      nav_faq: "FAQ",
      nav_kontak: "Contact"
    }
  };
  
  Object.keys(extraKeys).forEach(lang => {
    Object.assign(I18N[lang], extraKeys[lang]);
  });
})();