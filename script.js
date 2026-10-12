(function(){
  var WA="6281234567890";
  var $=function(i){return document.getElementById(i)};
  var rp=function(n){return "Rp"+Math.round(n).toLocaleString("id-ID")};
  function update(){
    var sel=$("layanan"),harga=+sel.value,kg=Math.max(0,parseFloat($("berat").value)||0);
    var antar=$("antar").checked,ongkir=0,info="";
    if(antar){ongkir=kg>=5?0:5000;info=ongkir?"Ongkos antar-jemput Rp5.000 (gratis mulai 5 kg).":"Antar-jemput gratis.";}
    else info="Anda mengantar dan mengambil sendiri ke toko.";
    var total=harga*kg+ongkir;
    $("total").textContent=rp(total);
    $("ongkir").textContent=info+" Total final menyesuaikan timbangan.";
    var teks="Halo Bilas Laundry, saya mau pesan:\n- Layanan: "+sel.options[sel.selectedIndex].text.split(" – ")[0]+
      "\n- Berat sekitar: "+kg+" kg\n- "+(antar?"Antar-jemput":"Antar sendiri")+
      "\n- Perkiraan total: "+rp(total)+"\nAlamat: ";
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
    $("hasil").innerHTML='<div class="detail"><div><b>'+esc(p.kode)+'</b><span>'+esc(p.layanan)+' · '+esc(p.kg)+' kg · '+(p.antar?"antar-jemput":"antar sendiri")+'</span></div><strong>'+esc(p.total)+'</strong></div><ol class="steps">'+li+'</ol><p class="note">'+(t==3?"Cucian sudah diantar. Terima kasih!":"Status saat ini: "+LANGKAH[t])+'</p>';
  }
  function cari(k){var p=muat().filter(function(x){return x.kode==k.trim().toUpperCase()})[0];tampil(p)}
  function riwayat(){
    var l=muat();
    $("riwayat").innerHTML=l.length?l.map(function(p){return'<button type="button" class="chip" data-k="'+esc(p.kode)+'">'+esc(p.kode)+' · '+esc(p.total)+'</button>'}).join(""):'<p class="kosong">Belum ada pesanan tersimpan.</p>';
  }
  $("simpan").addEventListener("click",function(){
    var s=$("layanan"),p={kode:"BL-"+Math.floor(1000+Math.random()*9000),layanan:s.options[s.selectedIndex].text.split(" – ")[0],kg:+$("berat").value||0,antar:$("antar").checked,total:$("total").textContent,waktu:Date.now()};
    var l=muat();l.unshift(p);simpan(l.slice(0,10));
    $("kode").textContent="Pesanan tersimpan. Kode Anda: "+p.kode;
    $("kodeinput").value=p.kode;tampil(p);riwayat();
    $("lacak").scrollIntoView({behavior:"smooth"});
  });
  $("cari").addEventListener("click",function(){cari($("kodeinput").value)});
  $("kodeinput").addEventListener("keydown",function(e){if(e.key=="Enter")cari(this.value)});
  $("riwayat").addEventListener("click",function(e){var k=e.target.getAttribute&&e.target.getAttribute("data-k");if(k){$("kodeinput").value=k;cari(k)}});
  setInterval(function(){if(aktif)cari(aktif)},2000);
  riwayat();
})();