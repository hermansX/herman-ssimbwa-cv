# Herman Ssimbwa — Professional HTML CV

## 🎯 Project Overview
A polished single-page HTML CV/portfolio for **Herman Ssimbwa**, IT Specialist & Digital Transformation Advisor with 13+ years of enterprise IT experience across East Africa. The design is inspired by the dark, executive IT-infrastructure visual language of [satorres.com](https://satorres.com/).

---

## ✅ Completed Features

### Design & Layout
- **Dark executive theme** — deep navy/indigo palette (`#070d1a` base) with electric-blue accents (`#2f7ef7`)
- **Fixed left sidebar** — identity, contact, navigation with animated active-state dots
- **Hero section** — animated grid overlay, radial glow, typing-effect tag line, stat counter cards
- **Responsive layout** — tablet & mobile adaptive with hamburger sidebar toggle + overlay
- **Print-optimised styles** — clean black-on-white output for PDF printing

### Sections
1. **Hero** — Headline, subtitle, 4 animated KPI stat cards
2. **About** — Bio + 4 expertise pillar cards (DB, Cloud, Security, DevOps)
3. **Technical Proficiencies** — 6 categorised skill tag clouds (Infrastructure, DB, Cloud, DevOps, Networking, Security)
4. **Career Experience** — Full 4-position timeline (BDO Rwanda, HARELMALLAC, CWG, Technology Associates)
5. **Key Projects** — 4 featured project cards (NCBA Bank, RwandAir, BPR Bank, Uganda Revenue Authority)
6. **Education** — Uganda Martyrs University B.Sc. IT
7. **Certifications** — 12 certification cards (CEH, RHCE, VCP, Oracle, ECSA, Solaris, PMP, NetApp, FortiGate, ITIL, HPE, CCIE ongoing)
8. **Referees** — 3 professional referees with contact details

### Interactivity (`js/main.js`)
- Smooth-scroll sidebar navigation with active-section tracking on scroll
- Animated stat counters (count-up on scroll into view)
- Scroll-reveal animations with stagger for card grids
- Hero tag typing effect
- Mobile sidebar toggle with overlay backdrop
- Timeline dot hover glow effects

---

## 📁 File Structure

```
index.html          — Main single-page CV
css/
  style.css         — Full stylesheet (dark theme, responsive, print)
js/
  main.js           — All interactivity (scroll, animations, mobile nav)
README.md           — This file
```

---

## 🔗 Entry Points

| Path | Description |
|------|-------------|
| `index.html` | Main CV page |
| `index.html#about` | About section |
| `index.html#skills` | Skills section |
| `index.html#experience` | Career experience |
| `index.html#projects` | Key projects |
| `index.html#education` | Education |
| `index.html#certifications` | Certifications |
| `index.html#referees` | Professional referees |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#070d1a` | Page background |
| `--bg-card` | `#111b33` | Card surfaces |
| `--accent-blue` | `#2f7ef7` | Primary accent, icons, links |
| `--accent-glow` | `#3a8cff` | Highlights, numbers |
| `--text-primary` | `#d8e0ee` | Body text |
| `--text-bright` | `#edf1fb` | Headings |
| `--green-pulse` | `#22d3a0` | Status badge, ongoing certs |
| `--font-body` | Inter | All UI text |
| `--font-mono` | JetBrains Mono | Code tags, dates, section numbers |

---

## 📤 Deployment
To publish this website, go to the **Publish tab** for one-click deployment with a live URL.

---

## 🔧 Recommended Next Steps
- [ ] Add a professional headshot photo to replace the "HS" initials avatar
- [ ] Add a downloadable PDF button (print-to-PDF from browser works today)
- [ ] Add a contact form section using a form service (Formspree, etc.)
- [ ] Add animated background particle network (server/node theme)
- [ ] Add light/dark mode toggle
- [ ] Internationalise for French (useful for Rwanda/Mauritius market)
