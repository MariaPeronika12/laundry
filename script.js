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