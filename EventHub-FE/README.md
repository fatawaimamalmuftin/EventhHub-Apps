### 1. Perbedaan Linux Kernel dan Distro

Kernel adalah inti dari OS, tugasnya menjembatani dari software ke hardwere. Distro adalah macam2 paket Linux yg berisi seperti GUI, CLI, env, DLL.

---

### 2. Linux FHS beserta dengan penjelasan dan contoh kegunaannya

Filesystem Hierarchy Standard. Contoh kegunaan tiap dir:

- `/` = root
- `/home` = tempat dir user
- `/etc` = tempat config
- `/var` = tempat data yg sering berubah
- `/tmp` = tempat file sementara
- `/usr` = berisi source program
- `/dev` = berisi device
- `/proc` = berisi tentang informasi
- `/boot` = berisi keperluan booting

---

### 3. Sistem permission dan owner pada Linux

Permission: mengatur izin dari file dan dir.

Owner: kepemilikan dari file dan dir.

---

### 4. Perbedaan antara bash, sh dan jenis-jenis shell lain

Shell adalah program yang menerima perintah dari user dan menjalankannya.

`sh` adalah shell yang lebih sederhana dan merupakan standar historis.

Bash: Bourne Again SHell merupakan salah satu shell yg populer di Linux.

Beberapa shell lainnya:

- Bash
- sh
- zsh
- fish
- ksh
- dash

---

### 5. Prinsip enkripsi pada SSH

SSH = Secure Shell.

Digunakan untuk mengakses komputer/server secara remote dengan aman.

Prinsip enkripsi: kombinasi **Encryption, Authentication, dan SSH Key**.

---

### 6. Perbedaan antara HTTP dan HTTPS

HTTP adalah protokol komunikasi antara client dan server.

HTTPS hampir sama dengan HTTP cuma HTTPS lebih aman karna si enkrip.

Port HTTP: `80`

Port HTTPS: `443`

---

### 7. Docker OCI Compliance Standard

OCI = Open Container Initiative / standar container images.

---

### 8. Perbedaan antara Container dan VM

VM / Virtual Mecine itu memiliki OS sendiri yg membuat nya lebih berat ketimbang container.

Container itu ada di dalam kernel host yg membuat lebih ringan.

---

### 9. Definisi dan manfaat dari image layer pada Docker

Lapisan yang bersifat read-only (hanya-baca) yang saling menumpuk dan membentuk sebuah Docker image secara keseluruhan, membuatnya lebih compec dan bersih, karna sisah dari produksi ga ada dan hanya menyisakan produk jadi.

---

### 10. Kegunaan dari penggunaan Docker volume dan network beserta contohnya

Volume menjadi tempat menyimpan data dari container yg bisa membuat data itu persist.

Network virtual jaringan yg memungkinkan untuk berkomunikasi antar container.

Contohnya:

```text
Container
   ↓
Volume
   ↓
Data tetap persist
```

dan:

```text
Container 1
     ↓
  Network
     ↓
Container 2
```

---

### 11. Definisi dan tujuan dari penggunaan web server dan reverse-proxy

Server adalah layanan web yg bisa menerima request dari client dan mengembalikan respon.

Reverse proxy bermanfaat untuk mengatur web yg ingin di tampilkan dan tidak, contoh nya untuk menyembunyikan internal backend biar ga bisa di akses.
