#!/usr/bin/env python3
"""Build a fully self-contained vermietung-vorschau.html.

Inlines the shared brand CSS/JS, the logo + favicon, and every local
image referenced from vermietung/index.html (e.g. the Hochregale photos)
as data-URIs. Re-run after adding or changing photos:

    python3 vermietung/build-standalone.py
"""
import base64, re, sys, pathlib, mimetypes

ROOT = pathlib.Path(__file__).resolve().parent.parent          # repo root
VERM = ROOT / 'vermietung'

def data_uri(path: pathlib.Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return 'data:%s;base64,%s' % (mime, base64.b64encode(path.read_bytes()).decode())

def main() -> int:
    html = (VERM / 'index.html').read_text(encoding='utf-8')
    portfolio_css = (ROOT / 'portfolio/portfolio.css').read_text(encoding='utf-8')
    verm_css = (VERM / 'vermietung.css').read_text(encoding='utf-8')
    core_js = (VERM / 'vermietung-core.js').read_text(encoding='utf-8')

    # favicon + logo (live under ../portfolio)
    html = html.replace('href="../portfolio/mark.svg"',
                        'href="%s"' % data_uri(ROOT / 'portfolio/mark.svg'))
    html = html.replace('src="../portfolio/assets/logo-hofer.png"',
                        'src="%s"' % data_uri(ROOT / 'portfolio/assets/logo-hofer.png'))

    # stylesheets -> one <style>
    html = html.replace(
        '<link rel="stylesheet" href="../portfolio/portfolio.css" />\n'
        '<link rel="stylesheet" href="vermietung.css" />',
        '<style>\n/* shared brand design system */\n%s\n'
        '/* rental-specific additions */\n%s\n</style>' % (portfolio_css, verm_css))

    # vermietung-core.js -> inline
    html = html.replace('<script src="vermietung-core.js"></script>',
                        '<script>\n%s\n</script>' % core_js)

    # footer link to the live main site (no sibling folder in a standalone file)
    html = html.replace('<a href="../portfolio/" data-cursor="link">Zur Hauptseite</a>',
                        '<a href="https://hofer-landesprodukte.com" data-cursor="link">Zur Hauptseite</a>')

    # Lightbox high-res (data-full -> assets/hochregale/large/*) is too heavy to
    # embed (~10 MB). In the standalone we drop data-full so the lightbox falls
    # back to the inlined carousel image; the hosted site keeps the high-res.
    html = re.sub(r'\s*data-full="assets/hochregale/large/[^"]*"', '', html)

    # inline every local image: src="assets/..." -> data-URI (skip if file missing)
    missing = []
    def repl(m):
        rel = m.group(2)
        f = VERM / rel
        if not f.exists():
            missing.append(rel)
            return m.group(0)
        return '%s="%s"' % (m.group(1), data_uri(f))
    html = re.sub(r'(src|href)="(assets/[^"]+\.(?:jpg|jpeg|png|webp|svg))"', repl, html, flags=re.I)

    bad = re.findall(r'(?:href|src)="(?:\.\./portfolio|vermietung\.css)[^"]*"', html)
    bad += re.findall(r'assets/hochregale/large/[^"]*', html)   # high-res must be stripped
    if bad:
        print('ERROR: leftover local refs:', bad); return 1

    out = VERM / 'vermietung-vorschau.html'
    out.write_text(html, encoding='utf-8')
    kb = len(html.encode()) / 1024
    print('wrote %s  (%.0f KB)' % (out.relative_to(ROOT), kb))
    if missing:
        print('NOTE: these images are not on disk yet, left as relative refs:')
        for r in missing:
            print('   -', r)
    return 0

if __name__ == '__main__':
    sys.exit(main())
