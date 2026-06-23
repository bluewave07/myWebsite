# Donau e.V. Website — Design Spec
**Date:** 2026-06-23  
**Status:** Approved  
**Location:** `/Users/bluewave/Claude Test/donau-ev/` (new standalone project)

---

## 1. Organisasyon & Ziel

**Donau Schüler Eltern e.V.** — Almanya'da kültürlerarası saygı, eğitim ve entegrasyon odaklı dernek. Mevcut site (`donau-ev.de`) WordPress tabanlı, yalnızca 3 sayfa (Home, Über uns, Kontakt). Yeni site bu yapıyı 6 sayfaya genişletecek ve organizasyonun kimliğini görsel olarak yansıtacak.

**Referans tasarım:** `pz-in.de` (yapı ve profesyonellik için) — ama daha yaratıcı ve renkli.  
**Dil:** Yalnızca Almanca.

---

## 2. Tasarım Sistemi

### Vizyon
**"Canlı & Kültürlerarası"** — Her proje/bölüm kendi accent rengiyle. Çeşitlilik görsel olarak güce dönüşüyor.

### Renk Paleti — "Taze Bahçe"

| Token | Değer | Kullanım |
|---|---|---|
| `--color-bg` | `#f0fdf4` | Sayfa zemini |
| `--color-primary` | `#16a34a` | Ana butonlar, navbar aktif, CTA |
| `--color-secondary` | `#0891b2` | İkincil vurgular, Bildung kartı |
| `--color-accent-orange` | `#ea580c` | Events kartı, hover efektleri |
| `--color-accent-purple` | `#7c3aed` | Integration kartı, etiketler |
| `--color-text-dark` | `#14532d` | Başlıklar, hero metin |
| `--color-text-body` | `#374151` | Gövde metni |
| `--color-footer-bg` | `#14532d` | Footer arka planı |

### Tipografi
- **Başlıklar:** Inter veya Poppins, 800–900 weight (mevcut proje ile uyumlu)
- **Gövde:** Inter, 400–500 weight
- **Etiketler:** letter-spacing: 2-3px, uppercase, küçük punto

### Tasarım İlkeleri
- Yuvarlak köşeler (`border-radius: 8–16px`)
- Soft shadow (`box-shadow: 0 4px 24px rgba(0,0,0,0.06)`)
- Gradient geçişler (yeşil→teal hero, her kart kendi gradyanı)
- Animasyonlu "renk bubbles" hero'da — Framer Motion ile pulse/float

---

## 3. Site Yapısı

```
/                    → Home (ana sayfa)
/ueber-uns           → Über uns (dernek hakkında)
/projekte            → Projekte (genel liste)
/projekte/kita       → KiTa Atlantik detay
/projekte/bildung    → Bildungsprojekte detay
/projekte/events     → Kulturveranstaltungen detay
/projekte/integration → Integration detay
/aktuelles           → Haberler & Duyurular
/aktuelles/[slug]    → Tek haber detay sayfası
/team                → Ekip üyeleri
/kontakt             → İletişim formu
```

---

## 4. Sayfa Tasarımları

### 4.1 Home (Ana Sayfa)

**Navbar**
- Sol: Logo (DONAU **e.V.** — koyu yeşil + yeşil accent)
- Sağ: Home · Projekte (dropdown) · Über uns · Aktuelles · Team · [Kontakt — CTA butonu]
- Sticky, scroll'da hafif gölge ekler
- Mobile: hamburger menü

**Hero Bölümü**
- Arka plan: `linear-gradient(160deg, #f0fdf4 → #dcfce7 → #cffafe)`
- Sol içerik (60%):
  - Küçük etiket: `DONAU SCHÜLER ELTERN e.V.` (yeşil, letter-spacing)
  - Büyük başlık (3 satır): `Der Weg zum / interkulturellen / Respekt.` — `#14532d`, 900 weight
  - Alt metin: `Gemeinsam für Bildung, Kultur und Integration.`
  - 2 buton: `Unsere Projekte` (dolu yeşil) + `Über uns` (outline)
- Sağ dekor (40%): 4 animasyonlu "renk bubble" — yeşil, teal, turuncu, mor — pulse + float animasyonu

**Projekte Cards (4 kart)**
- Grid: 2x2 (mobile: 1 kolon)
- Her kart: gradient ikon alanı + başlık + kısa açıklama + "Mehr →" linki
  - 🏫 KiTa Atlantik — `#16a34a → #0891b2`
  - 📖 Bildungsprojekte — `#0891b2 → #6366f1`
  - 🎭 Kulturveranstaltungen — `#ea580c → #dc2626`
  - 🌍 Integration — `#7c3aed → #4f46e5`

**Aktuelles Preview**
- Son 3 haberin kartı (Markdown'dan çekilir)
- Her kart: tarih etiketi + başlık + özet + link
- "Alle Neuigkeiten →" linki

**Über uns Teaser**
- 2 kolon: sol metin + sağ placeholder fotoğraf alanı
- Kısa misyon paragrafı + "Mehr über uns →" butonu

**Team Preview**
- 3–4 üye kartı (avatar + isim + rol) — gerçek fotoğraf yoksa `public/images/team/placeholder.jpg` kullanılır
- "Das ganze Team →" linki

**Kontakt CTA Banner**
- Tam genişlik, `#16a34a` arka plan
- Beyaz büyük metin + `Jetzt Kontakt aufnehmen` butonu

**Footer**
- Arka plan: `#14532d`
- 3 kolon: Logo + açıklama | Hızlı linkler | İletişim bilgileri
- Alt çizgi: telif hakkı + sosyal medya ikonları (Twitter/X, Instagram)

---

### 4.2 Projekte Sayfası (`/projekte`)
- 4 büyük proje kartı (hero bölümdekinden daha detaylı)
- Her kart tıklanınca `/projekte/[slug]` detay sayfasına gider
- Detay sayfası: Markdown'dan render edilir (başlık, açıklama, fotoğraflar, iletişim)

### 4.3 Aktuelles (`/aktuelles`)
- Liste sayfası: tüm haberler, en yenisi önce
- `content/aktuelles/*.md` — frontmatter: `title`, `date`, `summary`, `slug`
- Detay sayfası `/aktuelles/[slug]`: full Markdown render

### 4.4 Über uns (`/ueber-uns`)
- Misyon & vizyon metni
- Dernek geçmişi
- Değerler bölümü (renkli ikonlar)
- Ortak proje linkleri (kita-atlantik.de referansı)

### 4.5 Team (`/team`)
- Grid: 3–4 kolon
- Her üye kartı: `content/team/*.md` — frontmatter: `name`, `role`, `bio`, `image`

### 4.6 Kontakt (`/kontakt`)
- Sol: iletişim bilgileri (adres, e-posta, sosyal medya)
- Sağ: basit form (Name, E-Mail, Nachricht, Absenden)
- Form: Netlify Forms (sunucu taraflı, spam korumalı)

---

## 5. İçerik Mimarisi (Markdown)

```
donau-ev/
└── content/
    ├── projekte/
    │   ├── kita.md
    │   ├── bildung.md
    │   ├── events.md
    │   └── integration.md
    ├── aktuelles/
    │   └── YYYY-MM-DD-titel.md   ← yeni haberler buraya eklenir
    └── team/
        └── vorname-nachname.md
```

**Frontmatter şeması:**
```yaml
# aktuelles
---
title: "Haber Başlığı"
date: "2026-06-23"
summary: "Kısa özet"
slug: "haber-basligi"
---

# team
---
name: "Ad Soyad"
role: "Görev"
image: "/images/team/ad-soyad.jpg"
---
```

---

## 6. Teknik Stack

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animasyon | Framer Motion |
| İçerik | Markdown (`gray-matter` + `remark`) |
| Deployment | Netlify (static export) |
| Font | Inter (Google Fonts) |
| İkonlar | Lucide React |
| **Kod dili** | **İngilizce** — değişken adları, fonksiyon adları, component adları, yorumlar hepsi İngilizce. Yalnızca kullanıcıya gösterilen UI metinleri Almanca. |

---

## 7. Güvenlik & Erişilebilirlik

- Tüm form inputları XSS'e karşı sanitize edilir
- Netlify Forms ile sunucu taraflı form işleme (istemci taraflı kod yok)
- Tüm görseller `alt` attribute ile donatılır
- Renk kontrastları WCAG AA standardına uyar (yeşil üzerine beyaz kontrol edilecek)
- `next/image` ile otomatik optimizasyon
- `robots.txt` ve `sitemap.xml` oluşturulur

---

## 8. Proje Dosya Yapısı

```
donau-ev/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  ← Home
│   ├── ueber-uns/page.tsx
│   ├── projekte/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── aktuelles/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── team/page.tsx
│   ├── kontakt/page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjekteCards.tsx
│   ├── AktuellesPreview.tsx
│   ├── TeamPreview.tsx
│   ├── KontaktBanner.tsx
│   └── ui/
│       ├── Card.tsx
│       └── Button.tsx
├── lib/
│   ├── markdown.ts               ← MD dosyalarını parse eder
│   └── content.ts                ← içerik yardımcı fonksiyonlar
├── content/
│   ├── projekte/
│   ├── aktuelles/
│   └── team/
├── public/
│   └── images/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 9. Deployment

- `next.config.ts`: `output: 'export'` (static)
- `netlify.toml`: build command `next build`, publish `out`
- Preview deploy: her commit'te otomatik Netlify preview URL
- Custom domain: `donau-ev.de` → Netlify DNS

---

## 10. Kapsam Dışı

- Çok dil desteği (sadece Almanca)
- Admin paneli / headless CMS
- Kullanıcı girişi / üyelik sistemi
- Bağış ödeme entegrasyonu
- Blog yorumları
