# HOFER Landesprodukte — Website

Hand-coded static website for **HOFER Landesprodukte GmbH & Co KG** (hofer-landesprodukte.com), implemented from the Claude Design handoff bundle (`hofer-landesprodukte-design-system`).

## Structure

```
site/
├── index.html            Startseite — hero, stats, categories, services, certs, contact CTA
├── produkte.html         Filterbarer Katalog (12 Produkte, 5 Kategorien) mit RFQ pro Karte
├── dienstleistungen.html Transporte + Verzollung Übersicht, Liefergebiet-Platzhalter
├── verzollung.html       4-Schritte-Explainer EU ↔ CH + Checkliste + FAQ (SEO-Lead-Magnet)
├── unternehmen.html      Timeline seit 1996, Stat-Band, Zertifikate
├── kontakt.html          Themen-Formular + Kontaktkarte + WhatsApp
├── css/styles.css        Design-Tokens (1:1 aus dem Design-System) + Komponenten
├── js/data.js            Produktkatalog
├── js/main.js            Header/Footer/RFQ-Dialog (eine Quelle für alle Seiten) + Verhalten
└── assets/
    ├── logo-hofer.png            Offizielles Logo, web-optimiert (256px)
    ├── logo-hofer-original.png   Original aus dem Handoff (1536×1024)
    └── mark.svg                  Favicon
```

## Design system (from the handoff)

- **Palette:** Feldgrün `#2d5016` (primary) + Stroh-Gold `#d9a441` (accent), warme Neutrals. Das rot/gelbe Logo ist der eine bewusste Markenakzent — **nicht** ins UI übernehmen (eine Rot-Umstellung wurde im Design explizit verworfen).
- **Type:** Hanken Grotesk (Substitut für eine Söhne-Klasse-Schrift — bei lizenzierter Brand-Font `@import` + `--font-sans` in `css/styles.css` tauschen). IBM Plex Mono für Zahlen.
- **Icons:** Lucide via CDN.
- **Bilder:** `PhotoPlaceholder`-Blöcke tragen je einen Shot-Brief — 1:1 durch echte Dokumentarfotos ersetzen (`hero 16:9, card 4:3, wide 21:9, team 1:1`).
- **Mobile-first:** einspaltig unter 1024px, Sticky-Call-Button auf Mobile (Telefon ist die #1-Conversion).

## Offene Punkte (aus dem Handoff übernommen)

- Formulare und RFQ-Dialog sind UI-only (kein Backend) — Submit zeigt die Bestätigung.
- Sprachumschalter (DE/EN/IT) ist gebaut, Übersetzungen folgen später.
- Impressum / Datenschutz / AGB sind verlinkt, aber noch ohne Inhalt.
- Zertifikats-Chips sind typografisch — offizielle Bio-Austria/pastus+-Artwork einsetzen, sobald lizenziert.

## Run

Statisch — `site/index.html` im Browser öffnen oder einen beliebigen Static-Server auf `site/` zeigen lassen.
