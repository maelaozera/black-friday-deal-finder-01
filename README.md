# Black Friday Scout

[![Black Friday Deal Finder](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/maelaozera/black-friday-deal-finder-01/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/maelaozera/black-friday-deal-finder-01/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

Pencari deal Black Friday dan Cyber Monday 2026 yang jujur: 37 deal nyata
dari Amazon, Best Buy, Walmart, Target, dan Costco, lengkap dengan harga
sale, harga biasa, persentase diskon, dan verdict apa adanya tentang apakah
deal itu benar-benar layak dibeli atau cuma diskon palsu.

Setiap deal dicek langsung pada 27 November 2026 dan diberi stempel waktu
pengecekan, supaya pembaca tahu seberapa segar angkanya.

## Yang ada di dalam

- 37 deal terverifikasi dari lima retailer besar, dikelompokkan per kategori
  (TV, laptop, headphone, konsol, smart home, dan lain-lain).
- Harga sale dan harga biasa berdampingan, jadi besarnya diskon bisa
  dicek sendiri, bukan sekadar percaya label "hemat 50%".
- Verdict jujur per deal: beli sekarang, tunggu, atau lewati.
- Filter berdasarkan retailer, kategori, dan besaran diskon.
- Tanpa iklan, tanpa pelacak, tanpa link afiliasi.

## Cara memakai

Situs ini statis dan tidak butuh network saat runtime.

1. Buka folder `app/` di repo ini.
2. Buka file `index.html` di browser apa pun.
3. Semua data deal sudah tertanam di dalam situs; tidak ada request
   keluar saat halaman dipakai.

Tidak ada proses build, tidak ada dependensi, dan tidak ada server
yang perlu dijalankan.

## Layout file

```
app/
  index.html   Halaman utama pencari deal
  style.css    Tampilan dan tata letak
  app.js       Filter, pencarian, dan render daftar deal
  deals.json   Data 37 deal (harga, diskon, verdict, waktu cek)
README.md      Dokumen ini
```

## Catatan tentang harga

Harga yang tercantum adalah harga yang tertera di situs retailer pada
27 November 2026. Harga Black Friday berubah cepat dan bisa berbeda
saat Anda membukanya — selalu cek harga akhir di halaman retailer
sebelum membeli.

## Cara deal dinilai

Sebuah deal disebut bagus hanya bila harga salenya benar-benar di bawah
harga biasa yang berlaku sebelum musim diskon, bukan di bawah harga
coret yang sengaja dinaikkan. Deal dengan diskon kecil tapi harga akhir
termurah tetap ditandai layak beli, sementara diskon besar pada barang
yang memang sedang diobral di mana-mana ditandai biasa saja.
