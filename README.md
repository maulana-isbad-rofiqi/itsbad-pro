# ITSBAD PRO - Cloudflare Worker Tunneling Service

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

## Auto Deploy

Push ke branch `main` akan otomatis deploy ke Cloudflare via GitHub Actions.

## Penggunaan

- Akses root domain untuk UI.
- `/sub` untuk config VLESS.
- WebSocket untuk tunneling.

## Lisensi

MIT