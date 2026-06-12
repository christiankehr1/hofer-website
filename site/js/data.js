// HOFER Landesprodukte — product catalog (from the design handoff)
const HOFER_CATEGORIES = [
  { id: 'futter', label: 'Futtermittel', icon: 'wheat' },
  { id: 'einstreu', label: 'Einstreu', icon: 'layers' },
  { id: 'duenger', label: 'Düngemittel', icon: 'sprout' },
  { id: 'biogas', label: 'Biogas-Substrate', icon: 'flame' },
  { id: 'sonstiges', label: 'Sonstiges', icon: 'package' },
];

const HOFER_PRODUCTS = [
  { name: 'Warmluftheu', cat: 'futter', tone: 'gold', bio: true, avail: 'available', desc: 'Schonend getrocknet, staubarm — beste Futterqualität für Pferd und Rind.', brief: 'Heuballen im Lager, Gegenlicht, Staubpartikel sichtbar' },
  { name: 'Stroh', cat: 'einstreu', tone: 'gold', bio: false, avail: 'available', desc: 'Lang, geschnitten, gemulcht bis extra kurz gemahlen und entstaubt.', brief: 'Strohballen-Stapel, Scheunentor, warmes Licht' },
  { name: 'Luzerne', cat: 'futter', tone: 'green', bio: true, avail: 'request', desc: 'Eiweißreiches, rohfaserhaltiges Grundfutter für gesunde Nutztiere.', brief: 'Luzernefeld in Blüte, Weitwinkel, blauer Himmel' },
  { name: 'Maissilage', cat: 'futter', tone: 'olive', bio: false, avail: 'available', desc: 'Energiereich, in Ballen oder lose — auch für Biogasanlagen geeignet.', brief: 'Silageballen-Reihe am Feldrand, Folie glänzend' },
  { name: 'Dinkelspelzen-Pellets', cat: 'einstreu', tone: 'gold', bio: true, avail: 'available', desc: 'Saugstarke, staubarme Einstreu-Alternative aus Dinkelspelzen.', brief: 'Pellets in geöffnetem Sack, Makro, Hand greift hinein' },
  { name: 'Kakaoschalen', cat: 'einstreu', tone: 'green', bio: false, avail: 'request', desc: 'Alternative Einstreu mit angenehmem Geruch und guter Saugkraft.', brief: 'Kakaoschalen-Detail, dunkle Textur, Streulicht' },
  { name: 'Hühnermistpellets', cat: 'duenger', tone: 'olive', bio: false, avail: 'available', desc: 'Organischer Volldünger, gepresst, lagerfähig und streufähig.', brief: 'Dünger-Pellets fallen aus Streuer, Bewegungsunschärfe' },
  { name: 'Kompost', cat: 'duenger', tone: 'green', bio: true, avail: 'seasonal', desc: 'Reifer Qualitätskompost für Boden- und Humusaufbau.', brief: 'Kompostmiete, Dampf am kühlen Morgen, Lader im Hintergrund' },
  { name: 'Düngesubstrat (Gärrest)', cat: 'biogas', tone: 'olive', bio: false, avail: 'available', desc: 'Nährstoffreicher Gärrest aus der Nawaro-Biogasanlage.', brief: 'Gärrest-Ausbringung mit Schleppschlauch, Feld im Frühjahr' },
  { name: 'Maispellets', cat: 'biogas', tone: 'gold', bio: false, avail: 'request', desc: 'Substrat-Pellets mit hoher Energiedichte für Biogasanlagen.', brief: 'Pellets-Schüttkegel, Werkslicht, Förderband' },
  { name: 'Pflanzenkohle', cat: 'sonstiges', tone: 'green', bio: true, avail: 'request', desc: 'Bio-Pflanzenkohle für Bodenverbesserung und Humusaufbau.', brief: 'Schwarze Pflanzenkohle in Hand, starker Kontrast' },
  { name: 'Rindenmulch', cat: 'sonstiges', tone: 'olive', bio: false, avail: 'available', desc: 'Dekorativer und funktionaler Mulch für Garten und Landschaft.', brief: 'Rindenmulch-Haufen, Schaufel steckt, Waldboden-Töne' },
];

// availability key → badge variant + label
const HOFER_AVAIL = {
  available: { variant: 'available', label: 'Verfügbar', icon: 'check-circle' },
  request:   { variant: 'request', label: 'Auf Anfrage', icon: 'clock' },
  seasonal:  { variant: 'out', label: 'Saisonbedingt ausverkauft', icon: 'x-circle' },
};
