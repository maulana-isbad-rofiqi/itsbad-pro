cum# ITSBAD PRO - Cloudflare Worker Tunneling Service

ITSBAD PRO adalah Cloudflare Worker yang menyediakan layanan tunneling VLESS/Trojan dengan UI cyberpunk yang stylish.

## Fitur

- **Tunneling VLESS/Trojan**: Mendukung protokol V2Ray untuk tunneling aman.
- **UI Cyberpunk**: Tampilan dengan tema hacker/pro, menggunakan Tailwind CSS.
- **Konfigurasi Mudah**: UUID dan Proxy IP dideklarasikan di atas kode untuk kemudahan edit.
- **Auto Deploy**: Deploy otomatis ke Cloudflare via GitHub Actions.

## Setup

1. Clone repository ini.
2. Edit `worker.js`:
   - Ganti `userID` dengan UUID Anda.
   - Ganti `proxyIP` dengan IP server proxy Anda.
3. Commit dan push ke GitHub untuk auto deploy, atau deploy manual dengan Wrangler.

## Deploy Manual

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

## Deploy ke Cloudflare Workers

### Persiapan
1. **Install Wrangler**: `npm install -g wrangler`
2. **Login ke Cloudflare**: `wrangler login` (akan buka browser untuk autentikasi)
3. **Edit worker.js**: Ganti `userID` dan `proxyIP` dengan nilai Anda.

### Deploy
1. Buka terminal di folder project (c:/itsbad-pro)
2. Jalankan: `wrangler deploy`
3. Wrangler akan deploy worker dan memberikan URL worker.

### Verifikasi
- Akses URL worker untuk melihat UI cyberpunk.
- Test tunneling dengan client VLESS/Trojan.

## Penggunaan

- Akses root domain untuk UI.
- `/sub` untuk config VLESS.
- WebSocket untuk tunneling.

## Lisensi

MIT