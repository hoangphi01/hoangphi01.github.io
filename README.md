# hoangphi01.github.io

Personal portfolio and security blog built with Jekyll, hosted on GitHub Pages.

**Live:** [https://hoangphi01.github.io](https://hoangphi01.github.io)

## Features

- **Portfolio** — Profile card with education, research experience, awards, contact info, and tools
- **Security Blog** — Bilingual articles (EN/VN) on cybersecurity topics with language switching
- **Crypto Toolkit** — Interactive calculator for modular arithmetic, Euclidean algorithms, Vigenere cipher, Diffie-Hellman, and more
- **Dark Mode** — Toggle with system preference detection and localStorage persistence
- **macOS-style UI** — Card interface with close/minimize/fullscreen dots, collapsible sidebar
- **Responsive** — Mobile-first with sticky bottom nav, safe-area support, and adaptive layout

## Blog Posts

| Date | Title | Lang |
|------|-------|------|
| 2026-03-03 | HANU Candidate Data Exposure | EN / VN |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Static Site Generator | Jekyll 4 (kramdown + Rouge) |
| CSS Framework | Bootstrap 5.3.3 |
| Icons | Bootstrap Icons 1.11.3 |
| Typography | Google Fonts (Inter) |
| JavaScript | Vanilla JS (no frameworks) |
| Hosting | GitHub Pages |

## Project Structure

```
├── _config.yml            # Jekyll configuration
├── _layouts/
│   ├── default.html       # Main portfolio layout (macOS card UI)
│   └── post.html          # Blog post layout (dark mode, lang switch, font controls)
├── _includes/
│   ├── sidebar.html       # Profile sidebar (photo, bio, skills, socials)
│   ├── page-home.html     # Home tab
│   ├── page-research.html # Research tab
│   ├── page-awards.html   # Awards tab
│   ├── page-contact.html  # Contact tab
│   ├── page-tools.html    # Tools tab
│   └── card-scripts.html  # Card interaction logic
├── _posts/                # Blog posts (YYYY-MM-DD-{en|vn}-slug.md)
├── index.html             # Main portfolio page (tab navigation)
├── blog.html              # Blog listing page
├── calculation.html       # Crypto and Number Toolkit (standalone)
├── calculation.js         # BigInt-based crypto/number theory functions
├── pages.js               # Tab switcher with scroll persistence
├── style.css              # All styles including dark mode
├── favicon.svg            # SVG favicon
├── profile_picture.jpg    # Profile photo
└── background.jpg         # Background image
```

## Local Development

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## License

All rights reserved. Blog content and personal information are not licensed for reuse.
