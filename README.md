# Dylan Owusu Afriyie — Portfolio Website

A dark-themed, responsive portfolio website for a Cyber Intelligence Analyst and Digital Forensics professional. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just clean static files.

## 🌐 Live Preview

**GitHub Pages:** [https://gabe-dylan0109.github.io/portfolio-website/](https://gabe-dylan0109.github.io/portfolio-website/)

To preview locally, open `index.html` in any modern browser, or serve:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## 📁 Project Structure

```
├── index.html          # Home — hero, certifications, currently learning
├── about.html          # Professional timeline, education, tools & tech
├── projects.html       # Security labs — Afriyie Bank & Image-to-PDF
├── designs.html        # Graphic design portfolio with loading screen
├── contact.html        # Contact form, info cards, CV download
├── style.css           # Shared design system & global styles
├── Dylan_Owusu_Afriyie_CV.pdf
├── images/
│   ├── pfp.png         # Profile photo
│   ├── cert_*.png      # Certification images (5)
│   ├── bank*.png       # Afriyie Bank project screenshots (3)
│   ├── pdf*.png        # PDF Converter project screenshots (2)
│   └── design_*.jpg    # Graphic design portfolio pieces (15)
└── docs/               # Development notes & prompts
```

## ✨ Features

- **Dark navy design system** — custom CSS variables, glassmorphism nav, ambient glow effects, noise texture overlay
- **Typing animation** — rotating role titles on the home page
- **Scroll reveal** — elements animate into view with `IntersectionObserver`
- **Certificate modal** — click any certification to view full-size
- **Project galleries** — image modal with keyboard (Escape) and backdrop-click dismiss
- **Designs loading screen** — animated word rotator with progress counter
- **Skeleton loading** — shimmer placeholders for design gallery images
- **Responsive layout** — mobile hamburger nav, adaptive grids, touch-friendly
- **Downloadable CV** — direct PDF download from hero and contact page

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#070B14` |
| Accent | `#00D1FF` (Cyber Blue) |
| Display Font | Instrument Serif |
| Body Font | Manrope |
| Mono Font | JetBrains Mono |
| Border Radius | 14px / 8px |

## 🛠 Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, grid, flexbox, backdrop-filter, animations
- **Vanilla JavaScript** — no dependencies
- **Font Awesome 6.5** — icons
- **Google Fonts / Fontshare** — typography

## 📄 Pages

### Home (`index.html`)
Landing page with hero section featuring profile photo, status badge, typing effect, stats, certification vault with clickable previews, and a "Currently Learning" grid with progress bars.

### About (`about.html`)
Professional timeline (CID Cybercrime Unit → Margins Group → Digital Point → FON Packaging), education history, tools & technologies arsenal, and a personal "Beyond the Terminal" section about music.

### Projects (`projects.html`)
Two security lab write-ups with vulnerability findings and remediations:
- **Afriyie Bank** — Penetration testing lab (XSS, CSRF, hardcoded secrets, debug mode)
- **Image-to-PDF Converter** — DevSecOps audit (temp file disclosure, DoS, missing CSP)

### Designs (`designs.html`)
15-piece graphic design gallery with animated loading screen, skeleton image loading, and full-size modal preview.

### Contact (`contact.html`)
Contact form (mailto-based), info cards (email, phone, location, current role), social links, and CV download section.

## 📬 Contact

- **Email:** gabrieldylan0109@gmail.com
- **LinkedIn:** [dylan-afriyie](https://www.linkedin.com/in/dylan-afriyie-3aa854273/)
- **GitHub:** [gabe-dylan0109](https://github.com/gabe-dylan0109)

## 📝 License

© 2026 Dylan Owusu Afriyie. All rights reserved.
