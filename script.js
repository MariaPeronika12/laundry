/*
  Bilas Laundry – script.js
  Isi file:
  1. Kalkulator biaya, estimasi selesai, dan tautan WhatsApp
  2. Simpan pesanan dan lacak status cucian (localStorage)
  3. Tombol tema terang/gelap
  4. Slider sebelum & sesudah
  5. Tombol kembali ke atas
*/

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
  p.style.cssText="margin:0 0 10px;font-weight:600;color:var(--teal)";
  h1.parentNode.insertBefore(p,h1);
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