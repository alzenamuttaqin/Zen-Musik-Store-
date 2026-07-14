let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

// Inisialisasi awal saat web dimuat pertama kali
document.addEventListener("DOMContentLoaded", () => {
    perbaruiBadgeKeranjang();
    cekStatusLoginAwal();
});

function normalisasiHarga(hargaString) {
    return parseInt(hargaString.replace(/[^0-9]/g, ''), 10);
}

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString('id-ID');
}

function tambahKeKeranjang(namaProduk, hargaProduk) {
    const produkAda = keranjang.find(item => item.produk === namaProduk);
    if (produkAda) {
        produkAda.jumlah += 1;
    } else {
        keranjang.push({ 
            produk: namaProduk, 
            harga: hargaProduk, 
            jumlah: 1 
        });
    }
    alert(`${namaProduk} berhasil masuk ke keranjang!`);
    simpanKeLocalStorage();
    perbaruiBadgeKeranjang();
}

function perbaruiBadgeKeranjang() {
    const badge = document.getElementById('jumlah-keranjang');
    if (badge) {
        const totalBarang = keranjang.reduce((total, item) => total + item.jumlah, 0);
        badge.textContent = totalBarang;
    }
}

function tampilkanKeranjang() {
    const daftarKeranjang = document.getElementById("daftar-keranjang");
    if (!daftarKeranjang) return;
    
    daftarKeranjang.innerHTML = ""; 

    if (keranjang.length === 0) {
        daftarKeranjang.innerHTML = "<li style='padding: 20px; justify-content: center;'>Keranjang Anda masih kosong.</li>";
        document.getElementById("checkoutBtn").style.display = "none";
        return;
    }

    document.getElementById("checkoutBtn").style.display = "inline-block";
    let totalBelanjaKeseluruhan = 0;

    keranjang.forEach((item, index) => {
        const hargaSatuan = normalisasiHarga(item.harga);
        const subTotalItem = hargaSatuan * item.jumlah;
        totalBelanjaKeseluruhan += subTotalItem;

        const li = document.createElement("li");
        li.innerHTML = `
            <div style="text-align: left;">
                <strong>${item.produk}</strong><br>
                <span style="color: #ff69b4; font-size: 0.9em;">${item.harga} x ${item.jumlah} = ${formatRupiah(subTotalItem)}</span>
            </div>
            <div class="aksi-keranjang" style="display: flex; gap: 8px; align-items: center;">
                <button onclick="ubahJumlahItem(${index}, -1)" style="padding: 2px 8px; background: #555; color: #fff; border: none; border-radius: 3px; cursor: pointer;">-</button>
                <span>${item.jumlah}</span>
                <button onclick="ubahJumlahItem(${index}, 1)" style="padding: 2px 8px; background: #555; color: #fff; border: none; border-radius: 3px; cursor: pointer;">+</button>
                <button class="hapus-item" onclick="hapusItemKeranjang(${index})" style="margin-left: 10px;">Hapus</button>
            </div>
        `;
        daftarKeranjang.appendChild(li);
    });

    const liTotal = document.createElement("li");
    liTotal.style.borderTop = "2px solid #ff69b4";
    liTotal.style.marginTop = "15px";
    liTotal.style.fontWeight = "bold";
    liTotal.style.fontSize = "1.2em";
    liTotal.innerHTML = `
        <span>TOTAL PEMBAYARAN:</span>
        <span style="color: #ff69b4;">${formatRupiah(totalBelanjaKeseluruhan)}</span>
    `;
    daftarKeranjang.appendChild(liTotal);
}

function ubahJumlahItem(index, perubahan) {
    keranjang[index].jumlah += perubahan;
    if (keranjang[index].jumlah <= 0) {
        hapusItemKeranjang(index);
    } else {
        simpanKeLocalStorage();
        perbaruiBadgeKeranjang();
        tampilkanKeranjang();
    }
}

function menujuHalamanCheckout() {
    if (keranjang.length === 0) {
        alert("Keranjang belanja kosong! Silakan pilih produk terlebih dahulu.");
        return;
    }

    const ringkasanCheckout = document.getElementById("ringkasan-checkout");
    if (ringkasanCheckout) {
        ringkasanCheckout.innerHTML = "";
        let totalBelanjaKeseluruhan = 0;

        keranjang.forEach(item => {
            const hargaSatuan = normalisasiHarga(item.harga);
            const subTotalItem = hargaSatuan * item.jumlah;
            totalBelanjaKeseluruhan += subTotalItem;

            const li = document.createElement("li");
            li.innerHTML = `
                <span><strong>${item.produk}</strong> (x${item.jumlah})</span> 
                <span>${formatRupiah(subTotalItem)}</span>
            `;
            ringkasanCheckout.appendChild(li);
        });

        const liTotal = document.createElement("li");
        liTotal.style.borderTop = "1px solid #ff69b4";
        liTotal.style.fontWeight = "bold";
        liTotal.innerHTML = `<span>Total Akhir</span> <span style="color: #ff69b4;">${formatRupiah(totalBelanjaKeseluruhan)}</span>`;
        ringkasanCheckout.appendChild(liTotal);
    }
    bukaHalaman('checkout');
}

function hapusItemKeranjang(index) {
    keranjang.splice(index, 1);
    simpanKeLocalStorage();
    perbaruiBadgeKeranjang();
    tampilkanKeranjang(); 
}

function simpanKeLocalStorage() {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

// ==================== OPERASI NAVIGASI DAN HALAMAN ====================
function bukaHalaman(namaHalaman) {
    const semuaHalaman = document.querySelectorAll('.halaman-section');
    semuaHalaman.forEach(hal => hal.classList.remove('aktif'));

    const semuaNav = document.querySelectorAll('nav ul li a');
    semuaNav.forEach(nav => nav.classList.remove('active'));

    const targetHalaman = document.getElementById(`halaman-${namaHalaman}`);
    if(targetHalaman) {
        targetHalaman.classList.add('aktif');
    }
    
    const navElemen = document.getElementById(`nav-${namaHalaman}`);
    if (navElemen) {
        navElemen.classList.add('active');
    }

    if (namaHalaman === 'keranjang') {
        tampilkanKeranjang();
    }
    
    if(namaHalaman === 'produk'){
        // Reset pencarian agar semua produk muncul kembali saat tab diklik
        const itemProduk = document.querySelectorAll('#halaman-produk .produk');
        itemProduk.forEach(item => item.style.display = 'flex');
    }
}

// ==================== BAR PENCARIAN & FILTER KATEGORI ====================
function handleSearchHome(e) {
    if(e.key === 'Enter') prosesSearchHome();
}

function prosesSearchHome() {
    const nilaiCari = document.getElementById("search-home").value.toLowerCase();
    bukaHalaman('produk');
    document.getElementById("search-produk").value = nilaiCari;
    filterCariProduk();
}

function filterCariProduk() {
    const kataKunci = document.getElementById("search-produk").value.toLowerCase();
    const listProduk = document.querySelectorAll("#halaman-produk .produk");

    listProduk.forEach(produk => {
        const namaProduk = produk.querySelector("h3").textContent.toLowerCase();
        if(namaProduk.includes(kataKunci)) {
            produk.style.display = "flex";
        } else {
            produk.style.display = "none";
        }
    });
}

function filterKategori(namaKategori) {
    bukaHalaman('produk');
    document.getElementById("search-produk").value = "";
    const listProduk = document.querySelectorAll("#halaman-produk .produk");

    listProduk.forEach(produk => {
        if(produk.getAttribute("data-kategori") === namaKategori) {
            produk.style.display = "flex";
        } else {
            produk.style.display = "none";
        }
    });
}

// ==================== LOGIKA FITUR MODAL LOGIN ====================
function bukaModalLogin() {
    document.getElementById("modal-login").style.display = "flex";
}

function tutupModalLogin() {
    document.getElementById("modal-login").style.display = "none";
}

function prosesLogin() {
    const inputUser = document.getElementById("login-input").value;
    const sandiUser = document.getElementById("login-password").value;

    if (sandiUser === "zenmusik") {
        localStorage.setItem("statusLoginUser", inputUser);
        setTampilanUserMasuk(inputUser);
        tutupModalLogin();
        alert(`Selamat Datang, ${inputUser}!`);
    } else {
        alert("Kata sandi salah! Gunakan: zenmusik");
    }
}

// Cek status login saat memuat halaman pertama kali
function cekStatusLoginAwal() {
    const userSimpanan = localStorage.getItem("statusLoginUser");
    if(userSimpanan) {
        setTampilanUserMasuk(userSimpanan);
    }
}

function setTampilanUserMasuk(namaUser) {
    const menuUser = document.getElementById("menu-user");
    if(menuUser) {
        menuUser.innerHTML = `
            <span class="user-name">👤 ${namaUser}</span>
            <button class="btn-logout" onclick="prosesLogout()">Keluar</button>
        `;
    }
}

function prosesLogout() {
    localStorage.removeItem("statusLoginUser");
    const menuUser = document.getElementById("menu-user");
    if(menuUser) {
        menuUser.innerHTML = `<button id="btn-login-nav" onclick="bukaModalLogin()">Masuk</button>`;
    }
    alert("Anda telah keluar akun.");
    bukaHalaman('home');
}

// ==================== SISTEM CHECKOUT & WHATSAPP GENERATOR ====================
function cekMetodePembayaran() {
    const metode = document.getElementById("metode-pembayaran").value;
    const qrisBox = document.getElementById("qris-container");
    
    if(metode === "QRIS") {
        qrisBox.className = "qris-box-visible";
    } else {
        qrisBox.className = "qris-box-hidden";
    }
}

function selesaikanPembayaran() {
    if(keranjang.length === 0) {
        alert("Keranjang kosong!");
        return;
    }

    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const wa = document.getElementById("wa").value;
    const metode = document.getElementById("metode-pembayaran").value;

    let rincianBarang = "";
    let totalBayar = 0;

    keranjang.forEach(item => {
        const subItem = normalisasiHarga(item.harga) * item.jumlah;
        totalBayar += subItem;
        rincianBarang += `- ${item.produk} (x${item.jumlah}) : ${formatRupiah(subItem)}\n`;
    });

    // Template Pesan Berformat Teks WhatsApp
    const pesanWA = `Halo Zen Musik Store, Saya ingin memesan alat musik:\n\n` +
                    `*Data Pengiriman:*\n` +
                    `- Nama: ${nama}\n` +
                    `- No. HP: ${wa}\n` +
                    `- Alamat: ${alamat}\n\n` +
                    `*Daftar Pesanan:*\n${rincianBarang}\n` +
                    `*Metode Pembayaran:* ${metode}\n` +
                    `--------------------------------------\n` +
                    `*TOTAL AKHIR:* ${formatRupiah(totalBayar)}\n\n` +
                    `Mohon segera diproses ya, Terima kasih!`;

    const linkWA = `https://wa.me/62881023454446?text=${encodeURIComponent(pesanWA)}`;
    
    // Bersihkan Keranjang Setelah Berhasil Memesan
    keranjang = [];
    simpanKeLocalStorage();
    perbaruiBadgeKeranjang();
    document.getElementById("form-checkout").reset();
    document.getElementById("qris-container").className = "qris-box-hidden";

    // Arahkan otomatis ke WhatsApp penjual
    window.open(linkWA, '_blank');
    bukaHalaman('home');
}

// ==================== LOGIKA FITUR MODAL DETAIL PRODUK ====================
function bukaModalDetail(nama, harga, gambarUrl, deskripsi) {
    document.getElementById("detail-nama").textContent = nama;
    document.getElementById("detail-harga").textContent = harga;
    document.getElementById("detail-img").src = gambarUrl;
    document.getElementById("detail-deskripsi").textContent = deskripsi;

    // Menyediakan tombol "Tambah ke Keranjang" yang sinkron dengan fungsi utama toko Anda
    const actionContainer = document.getElementById("detail-action-container");
    actionContainer.innerHTML = `
        <button onclick="tambahKeKeranjang('${nama}', '${harga}'); tutupModalDetail();" 
                style="width: 100%; background-color: #ff69b4; color: #000; border: none; padding: 12px; font-weight: bold; border-radius: 8px; cursor: pointer; font-size: 1em; transition: background 0.3s;">
            Tambah ke Keranjang
        </button>
    `;

    document.getElementById("modal-detail").style.display = "flex";
}

function tutupModalDetail() {
    document.getElementById("modal-detail").style.display = "none";
}

// Menutup modal secara otomatis jika area luar diklik
window.onclick = function(event) {
    const modalLogin = document.getElementById("modal-login");
    const modalDetail = document.getElementById("modal-detail");
    
    if (event.target === modalLogin) {
        tutupModalLogin();
    }
    if (event.target === modalDetail) {
        tutupModalDetail();
    }
}