# Dylan Afriyie Portfolio — Antigravity Build Prompts

**Tech context for every prompt:** The portfolio is pure HTML/CSS/JS — no framework, no bundler. Shared styles live in `style.css`. Every page links `style.css` and Font Awesome 6.5.1. The design system uses these CSS variables:
```
--bg: #070B14 | --bg-raised: #0C1220 | --bg-card: rgba(12,18,32,0.75)
--border: rgba(255,255,255,0.06) | --border-hover: rgba(0,209,255,0.3)
--text: #E4E8EF | --text-muted: #7A8BA0 | --text-dim: #3D4F66
--accent: #00D1FF | --accent-dim: rgba(0,209,255,0.08) | --accent-glow: rgba(0,209,255,0.15)
--green: #34D399 | --amber: #FBBF24 | --red: #F87171
--font-display: 'Instrument Serif' | --font-body: 'Manrope' | --font-mono: 'JetBrains Mono'
--radius: 14px | --radius-sm: 8px | --transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)
```

---

## TIER 1 — HIGH IMPACT

---

### PROMPT 1 — Live Threat Intelligence Ticker

Add a live cybersecurity threat ticker to `index.html`, placed directly below the `.site-nav` and above the `.hero` section. The ticker must feel like a real-time intelligence feed consistent with the site's dark navy + cyan design system.

**What to build:**

Create a `<div class="threat-ticker">` component. It contains two parts: a label badge on the left that reads `LIVE THREATS` in `var(--font-mono)`, 10px, uppercase, letter-spacing 2px, with a small pulsing red dot (6px circle, `var(--red)` color, CSS `@keyframes pulse` opacity animation). To the right is a scrolling marquee of threat entries that scrolls continuously left using CSS `@keyframes ticker-scroll` with `animation: ticker-scroll 40s linear infinite`.

**Threat data:** Hardcode 12 realistic threat entries as an array in a `<script>` tag and inject them dynamically into the marquee. Use this format for each entry: `[CRITICAL] CVE-2025-XXXX — Apache RCE via deserialization · Affected: 14,000 systems` where severity labels are CRITICAL (red), HIGH (amber), MEDIUM (accent cyan). Each entry is separated by a `·` divider in `var(--text-dim)`. Randomize display order on each page load using `array.sort(() => Math.random() - 0.5)`.

**Styling:** The ticker bar is 40px tall, `background: rgba(7,11,20,0.85)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid var(--border)`. Position it `position: sticky; top: 65px; z-index: 999` so it sticks just below the nav. On hover, pause the animation with `animation-play-state: paused`. On mobile (`max-width: 768px`), reduce font to 10px and hide the label badge.

**Extras:** Wrap the whole ticker in a `<details>` alternative — add a small `×` button on the far right that sets `display: none` on the ticker and saves the preference to `localStorage` with key `threatTickerDismissed`. On page load, check this key and skip rendering if set.

---

### PROMPT 2 — Dark / Light Theme Toggle

Add a fully functional dark/light mode toggle to `style.css` and every HTML page (`index.html`, `about.html`, `projects.html`, `designs.html`, `contact.html`).

**CSS approach:** In `style.css`, create a `[data-theme="light"]` selector on the `<html>` element that overrides the CSS variables. Light theme values: `--bg: #F0F4FA`, `--bg-raised: #FFFFFF`, `--bg-card: rgba(255,255,255,0.85)`, `--border: rgba(0,0,0,0.08)`, `--border-hover: rgba(0,161,209,0.4)`, `--text: #0D1117`, `--text-muted: #4A5568`, `--text-dim: #A0AEC0`, `--accent: #0080CC`. Keep all other variables unchanged so they compute correctly.

**Toggle button:** Add a `<button id="themeToggle">` button to the `.site-nav` element in every HTML file, placed between the nav-links and the nav-cta button. Style it: `width: 36px; height: 36px; border-radius: 8px; background: var(--bg-raised); border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center`. Show a sun icon (Font Awesome `fa-sun`) in dark mode and a moon icon (`fa-moon`) in light mode.

**JavaScript:** Add a shared `<script>` block at the bottom of every page's `<body>`. On load, read `localStorage.getItem('theme')` and apply it via `document.documentElement.setAttribute('data-theme', value)`. On button click, toggle between `'light'` and `'dark'`, save to localStorage, update the icon, and add a 200ms CSS transition on `html { transition: background 0.2s, color 0.2s }` so the switch feels smooth and not jarring.

---

### PROMPT 3 — Page Transition Animations

Add smooth fade+slide transitions when navigating between pages in the portfolio. The site is pure HTML — no framework. Use the native View Transitions API with a CSS fallback.

**In `style.css`:** Add these rules:
```css
@keyframes page-fade-in  { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes page-fade-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-8px); } }

::view-transition-old(root) { animation: page-fade-out 0.25s cubic-bezier(0.4,0,0.2,1) forwards; }
::view-transition-new(root) { animation: page-fade-in  0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
```

**In every HTML page's `<head>`:** Add `<meta name="view-transition" content="same-origin">`.

**JavaScript fallback (for browsers without View Transitions API):** Add a shared script at the bottom of every `<body>`. It intercepts all `<a>` clicks where the href is a same-origin `.html` link. On click: add class `page-leaving` to `<body>` (which applies `animation: page-fade-out 0.25s forwards`), wait 250ms via `setTimeout`, then navigate. On `DOMContentLoaded`, add class `page-entering` to `<body>` (which applies `animation: page-fade-in 0.35s forwards`). Check for View Transitions API support with `if (!document.startViewTransition)` and only apply the fallback if unsupported.

**Nav active state:** While you're in every file, ensure the correct `<a>` tag in `.nav-links` has the class `active` matching the current page filename.

---

## TIER 2 — DIFFERENTIATION FEATURES

---

### PROMPT 4 — Secret Terminal Easter Egg

Add a hidden command-line terminal that slides up from the bottom of the screen on any page when the user presses the `/` key (or the backtick `` ` `` key). This is the most memorable interactive feature for a cybersecurity portfolio.

**HTML structure:** Append this to the `<body>` of every HTML page:
```html
<div id="terminal" aria-hidden="true">
  <div id="terminal-header">
    <span class="term-dots"><span></span><span></span><span></span></span>
    <span class="term-title">dylan@portfolio ~ $</span>
    <button id="term-close">×</button>
  </div>
  <div id="terminal-body">
    <div id="term-output"></div>
    <div id="term-input-row">
      <span class="term-prompt">dylan@portfolio:~$</span>
      <input type="text" id="term-input" autocomplete="off" spellcheck="false" />
    </div>
  </div>
</div>
```

**Styling:** Terminal is `position: fixed; bottom: 0; left: 50%; transform: translateX(-50%) translateY(100%); width: min(680px, 95vw); height: 360px; z-index: 9000; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); border-radius: 14px 14px 0 0; background: rgba(7,11,20,0.97); border: 1px solid rgba(0,209,255,0.2); border-bottom: none; backdrop-filter: blur(24px)`. When active, add class `open` which sets `transform: translateX(-50%) translateY(0)`. The terminal header is 40px tall with a `#00D1FF` title, three colored dots (red/amber/green circles), and a close button. The output area uses `font-family: 'JetBrains Mono'; font-size: 13px; color: #E4E8EF; overflow-y: auto`. The input has no border, transparent background, full width, same font, and a blinking cursor.

**Commands to implement** (in a JS `commands` object):
- `help` — prints a formatted list of all available commands
- `whoami` — prints: `Dylan Owusu Afriyie · Cyber Intelligence Analyst · MSc Digital Forensics & Cybersecurity (GIMPA)`
- `ls` — prints: `index.html  about.html  projects.html  designs.html  contact.html`
- `ls projects` — prints the two project names with one-line descriptions
- `cat cv` — prints a beautifully ASCII-formatted summary of Dylan's CV with sections for Experience, Certifications, Education
- `skills` — prints a text-based bar chart of skill levels using `█` characters for each domain
- `ping dylan` — prints: `PING dylan.afriyie (gabrieldylan0109@gmail.com): 56 data bytes · 64 bytes: icmp_seq=0 ttl=64 time=1.337 ms · Response: Open to new opportunities.`
- `clear` — clears the output div
- `exit` — closes the terminal
- `sudo rm -rf /` — prints: `Permission denied. Nice try.`
- Any unrecognised command — prints: `command not found: [input]. Type 'help' for available commands.`

**Behaviour:** Press `/` or `` ` `` anywhere on the page (except when focus is inside a form input) to open the terminal and focus the input. Press `Escape` to close. Maintain a command history array and allow Up/Down arrow keys to navigate it. Each command output is prepended with the prompt line in cyan. Animate new output lines sliding in with `opacity: 0 → 1` over 150ms.

**Hint:** Add a small, subtle tooltip that appears in the bottom-right corner of every page on first visit (localStorage-gated): `Press / to open terminal` — styled as a `font-mono` badge in `var(--text-dim)`, visible for 4 seconds then fades out.

---

### PROMPT 5 — Interactive Skills Radar Chart

Add an animated radar chart to `about.html`, placed in a new section between the Tools & Technologies section and the Beyond the Terminal section.

**Library:** Use Chart.js loaded from CDN: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`. No other dependencies.

**Section markup:**
```html
<section class="section-pad" style="padding-top:0;">
  <div class="container">
    <div class="reveal">
      <span class="label">// proficiency</span>
      <h2 class="heading">Skill <em>Radar</em></h2>
      <p class="subtext">Cross-domain competency mapped across technical and creative disciplines.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;">
      <div style="max-width:420px;margin:0 auto;width:100%;">
        <canvas id="skillRadar"></canvas>
      </div>
      <div id="radarLegend"></div>
    </div>
  </div>
</section>
```

**Chart configuration:** Labels: `['Penetration Testing','Digital Forensics','OSINT & Intelligence','Network Analysis','Python / Scripting','Graphic Design','AI & Automation']`. Data values (0–100): `[82, 78, 75, 70, 55, 88, 40]`. Chart options: `type: 'radar'`. Use `Chart.js` radar with these exact visual settings — `backgroundColor: rgba(0,209,255,0.08)`, `borderColor: #00D1FF`, `borderWidth: 2`, `pointBackgroundColor: #00D1FF`, `pointRadius: 4`, `pointHoverRadius: 7`. Scales: `r.grid.color: rgba(255,255,255,0.06)`, `r.angleLines.color: rgba(255,255,255,0.06)`, `r.ticks` hidden (display false), `r.pointLabels.color: #7A8BA0`, `r.pointLabels.font.family: 'JetBrains Mono'`, `r.pointLabels.font.size: 11`, `r.suggestedMin: 0`, `r.suggestedMax: 100`. Set `plugins.legend.display: false`. Background: transparent. All text in `#7A8BA0`.

**Animated entry:** The chart should not render until `.reveal` fires (IntersectionObserver). On first intersection, animate the chart drawing in using `animation.duration: 1200` and `animation.easing: 'easeInOutQuart'`.

**Legend panel:** Dynamically generate a legend in `#radarLegend` — each skill as a row with: a small `██` bar (CSS width = the data value as a percentage, colored `var(--accent)`), the skill label in `var(--font-mono)` 12px, and the numeric score in `var(--accent)` on the right. Each bar animates its width from 0 to full when the IntersectionObserver fires, with staggered delays (index × 80ms).

**Responsive:** On mobile (`max-width: 768px`), switch the grid to `1fr`, show the radar above the legend, and reduce point label font to 9px.

---

### PROMPT 6 — Custom Glowing Cursor

Add a custom cursor effect to every page on the portfolio — a small glowing dot that replaces the default cursor on desktop, with a subtle trailing ring that follows with a smooth lag.

**HTML:** Append to the `<body>` of every page:
```html
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>
```

**CSS:**
```css
#cursor-dot {
  position: fixed; top: 0; left: 0; width: 6px; height: 6px;
  background: var(--accent); border-radius: 50%;
  pointer-events: none; z-index: 99999;
  transform: translate(-50%, -50%);
  transition: transform 0.05s, opacity 0.3s, width 0.2s, height 0.2s;
  box-shadow: 0 0 8px var(--accent), 0 0 20px var(--accent-glow);
}
#cursor-ring {
  position: fixed; top: 0; left: 0; width: 32px; height: 32px;
  border: 1px solid rgba(0,209,255,0.4); border-radius: 50%;
  pointer-events: none; z-index: 99998;
  transform: translate(-50%, -50%);
  transition: transform 0.12s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s, width 0.25s, height 0.25s, border-color 0.25s;
}
body { cursor: none; }
a, button, [role="button"] { cursor: none; }
```

**JavaScript:** Track `mousemove` and update `#cursor-dot` position instantly using `transform: translate(${x - 3}px, ${y - 3}px)`. Update `#cursor-ring` position with a `requestAnimationFrame` lerp (linear interpolation): `ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15` — this creates the smooth trailing lag. On `mouseenter` of any `a`, `button`, or `.card` element: scale `#cursor-dot` to 12×12px, make `#cursor-ring` 48×48px with `border-color: rgba(0,209,255,0.7)`. On `mouseleave`, revert. On `mouseleave` from the browser window, set both elements to `opacity: 0`. On `mouseenter` to window, restore opacity.

**Disable on touch/mobile:** Wrap everything in `if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;` so the effect only runs on devices with a real mouse. On those devices, also reset `body { cursor: auto }`.

---

## TIER 3 — CONTENT DEPTH

---

### PROMPT 7 — Project Deep-Dive Case Study Pages

Create two new standalone HTML pages: `project-bank.html` and `project-pdf.html`. These are full case study pages reachable from `projects.html`. Update `projects.html` to link to them.

**Layout structure for each page** (inherits `style.css` and Font Awesome):

1. **Hero band** (80px top padding): `<span class="label">// case study</span>`, `<h1 class="heading">` with project name, a row of meta badges (Type, Stack, Grade, Date) styled as `font-mono` pill tags in `var(--accent-dim)`, and a one-paragraph executive summary.

2. **Attack surface overview** (new section): A 2-column grid. Left column: a styled `<pre>` block showing a fake but realistic network topology or file tree for the target. Right column: a list of "Scope" items (what was in/out of scope) styled as checkmarked list items using `var(--green)` and `var(--red)` bullet colours.

3. **Vulnerability findings table** (new section): An HTML `<table>` styled with `style.css` variables. Columns: `#`, `Vulnerability`, `CVSS Score`, `Severity`, `OWASP Category`. Each row has a severity badge (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`) styled as pill tags using `var(--red)`, `var(--amber)`, `var(--accent)`, `var(--green)` respectively with 8% opacity backgrounds. CVSS scores shown as numbers (e.g. `9.1`, `7.3`). Make the table `width: 100%`, `border-collapse: collapse`, alternating row backgrounds using `var(--bg-raised)`.

4. **Attack chain diagram** (new section): A visual step-by-step attack flow built in pure HTML/CSS using flexbox — numbered steps (1→2→3→4→5) connected by `→` arrows in `var(--accent)`. Each step is a `.card` with a step number badge, step name (e.g. "Reconnaissance", "SQL Injection", "Privilege Escalation"), and a one-line description. Steps animate in with staggered `.reveal` classes.

5. **Remediation applied** (new section): Same card grid layout as findings but using green accent colors. Each card: vulnerability name, the fix applied, and a `[PATCHED]` badge.

6. **Lessons learned + screenshots** (new section): The existing gallery images from `projects.html` reused here in a larger grid with a caption below each image. Add a `<blockquote>` styled with a left `var(--accent)` border containing a key takeaway from the project.

7. **Back link**: A `<a href="projects.html">← Back to all projects</a>` link at the bottom in `var(--text-muted)`.

**Update `projects.html`:** Add a `<a href="project-bank.html" class="btn btn-ghost">Read Full Case Study →</a>` button to each project's info section.

---

### PROMPT 8 — Blog / Writeups Section

Create a new page `blog.html` and add a "Writeups" link to the nav in every HTML file (between Projects and Designs).

**`blog.html` page structure** (inherits `style.css` and Font Awesome):

**Hero section:**
```
label: // field notes
heading: Intelligence &amp; <em>Writeups</em>
subtext: Technical breakdowns, CTF solutions, OSINT methodologies, and observations from the field.
```

**Filter bar:** A row of filter buttons above the post grid: `All`, `CTF`, `OSINT`, `Forensics`, `Tutorials`. Style as pill buttons: `padding: 0.35rem 1rem; border: 1px solid var(--border); border-radius: 50px; font-size: 0.78rem; font-family: var(--font-mono); background: transparent; color: var(--text-muted); cursor: pointer; transition: var(--transition)`. Active state: `background: var(--accent-dim); border-color: var(--accent); color: var(--accent)`. Filter buttons show/hide cards by matching `data-category` attributes using vanilla JS classList toggling.

**Post card grid:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem`. Each card is a `.card` with:
- Top: a category label in `var(--font-mono)` 10px with coloured dot
- `<h3>` post title in `var(--font-display)` italic, 1.2rem
- 2-line excerpt in `var(--text-muted)` 0.88rem
- Bottom row: date on left in `var(--font-mono)` `var(--text-dim)`, and `Read More →` link in `var(--accent)` on right
- Hover: lift with `transform: translateY(-4px)` and `border-color: var(--border-hover)`

**Seed the page with 4 placeholder posts:**
1. `[CTF]` — "Breaking a Vulnerable Banking App: SQL Injection to Admin Access" — 5 Jan 2026
2. `[OSINT]` — "Building a Suspect Network Map Using Only a Phone Number" — 18 Jan 2026
3. `[Forensics]` — "Android Data Acquisition: A Comparative Review of Cellebrite, MSAB XRY, and Oxygen" — 2 Feb 2026
4. `[Tutorial]` — "Setting Up a Home Penetration Testing Lab on a Budget" — 20 Feb 2026

Each "Read More" link points to `#` for now, with a `coming-soon` tooltip on hover that shows `"Full writeup coming soon"` in a small `position: absolute` tooltip.

**Empty state:** If all cards are hidden by a filter, show a centered message: `<i class="fas fa-terminal"></i> No writeups in this category yet. Check back soon.`

---

### PROMPT 9 — GitHub Activity Heatmap

Add a GitHub contribution-style activity heatmap widget to `about.html`, placed at the bottom of the page above the footer. Use the GitHub REST API to fetch real public contribution data.

**API call:** `fetch('https://api.github.com/users/gabe-dylan0109/events/public?per_page=100')`. This returns a public events array. Parse it to build a contribution frequency map keyed by date string (`YYYY-MM-DD`). Count events per day for the past 52 weeks (364 days) to build the heatmap grid.

**Heatmap rendering:** Use `<canvas id="ghHeatmap">` sized at `100% width` and fixed 120px height. Draw 52 columns × 7 rows of 13×13px squares with 3px gap. Colour intensity based on daily event count: 0 events = `rgba(255,255,255,0.04)`, 1 event = `rgba(0,209,255,0.2)`, 2–3 events = `rgba(0,209,255,0.45)`, 4–6 = `rgba(0,209,255,0.7)`, 7+ = `rgba(0,209,255,1.0)`. Round corners: use `ctx.roundRect()` with 3px radius. Animate entry: fade each square in on a staggered delay using `setTimeout` per column so the heatmap "fills in" left to right over 600ms on first viewport intersection.

**Tooltip:** On canvas `mousemove`, detect which cell the cursor is over, and show a `<div id="ghTooltip">` positioned absolutely near the cursor showing: `"3 contributions on Jan 14, 2026"`. Style it as a `font-mono` 11px tooltip with `background: var(--bg-raised)`, `border: 1px solid var(--border)`, `border-radius: 6px`, `padding: 4px 10px`.

**Loading state:** While fetching, show a skeleton version of the grid with `rgba(255,255,255,0.04)` squares and a `animation: shimmer 1.5s infinite` sweep. If the API fails (rate limit or network error), fall back to displaying a static 52×7 grid of plausible random contribution data so the widget never shows broken.

**Section wrapper:**
```html
<section class="section-pad" style="padding-top:0;">
  <div class="container">
    <div class="reveal">
      <span class="label">// activity</span>
      <h2 class="heading">GitHub <em>Contributions</em></h2>
    </div>
    <div class="card" style="padding: 2rem;">
      <canvas id="ghHeatmap"></canvas>
      <div id="ghTooltip" style="display:none; position:fixed; pointer-events:none;"></div>
      <p style="margin-top:1rem; font-size:0.78rem; color:var(--text-dim); font-family:var(--font-mono);">
        <a href="https://github.com/gabe-dylan0109" target="_blank" style="color:var(--accent);">@gabe-dylan0109</a> on GitHub
      </p>
    </div>
  </div>
</section>
```

---

## TIER 4 — UX AND POLISH FIXES

---

### PROMPT 10 — SEO, Open Graph, and Structured Data

Add complete SEO metadata to every HTML page in the portfolio. The pages currently have no description meta tags, no Open Graph data, and no structured data.

**Add to `<head>` of `index.html`:**
```html
<meta name="description" content="Dylan Owusu Afriyie — Cyber Intelligence Analyst, MSc Digital Forensics & Cybersecurity candidate, and ISC2 CC certified professional based in Accra, Ghana. Specialising in intelligence reporting, penetration testing, and digital forensics.">
<meta name="keywords" content="cybersecurity analyst, digital forensics, penetration testing, OSINT, Accra Ghana, ISC2 CC, cybercrime investigation">
<meta name="author" content="Dylan Owusu Afriyie">
<meta name="robots" content="index, follow">

<meta property="og:type" content="website">
<meta property="og:url" content="https://dylan-afriyie.netlify.app/">
<meta property="og:title" content="Dylan Owusu Afriyie | Cyber Intelligence Analyst">
<meta property="og:description" content="MSc candidate in Digital Forensics & Cybersecurity. Active industrial attachment at the Ghana Police Service CID Cybercrime Unit.">
<meta property="og:image" content="https://dylan-afriyie.netlify.app/images/og-cover.png">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dylan Owusu Afriyie | Cyber Intelligence Analyst">
<meta name="twitter:description" content="Penetration tester, digital forensics analyst, and ISC2 CC certified.">
<meta name="twitter:image" content="https://dylan-afriyie.netlify.app/images/og-cover.png">

<link rel="canonical" href="https://dylan-afriyie.netlify.app/">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dylan Owusu Afriyie",
  "jobTitle": "Cyber Intelligence Analyst",
  "url": "https://dylan-afriyie.netlify.app",
  "email": "gabrieldylan0109@gmail.com",
  "telephone": "+233208203691",
  "address": { "@type": "PostalAddress", "addressLocality": "Accra", "addressCountry": "GH" },
  "sameAs": [
    "https://www.linkedin.com/in/dylan-afriyie-3aa854273/",
    "https://github.com/gabe-dylan0109"
  ],
  "knowsAbout": ["Cybersecurity","Digital Forensics","Penetration Testing","OSINT","Graphic Design"]
}
</script>
```

Apply unique, page-specific `<title>`, `<meta name="description">`, and `og:title`/`og:description`/`og:url`/`canonical` tags to `about.html`, `projects.html`, `designs.html`, `contact.html`, and `blog.html` as well. Each page description should be 150–160 characters and accurately describe that page's content.

**Create `og-cover.png`:** Generate a 1200×630px Open Graph cover image as an HTML file (`og-cover.html`) that can be screenshot. Style it: `background: #070B14`, centered text "Dylan Owusu Afriyie" in Instrument Serif 72px white, subtitle "Cyber Intelligence Analyst" in JetBrains Mono 24px `#00D1FF`, bottom-left a small "Accra, Ghana" and the accent bar from the design system. This file is for reference — instruct the user to screenshot it and save as `images/og-cover.png`.

**Fix the footer year:** Update `&copy; 2025` to `&copy; <span id="yr"></span>` and add `<script>document.getElementById('yr').textContent = new Date().getFullYear();</script>` to all footers so it auto-updates every year.

---

### PROMPT 11 — Working Contact Form with EmailJS

Make the contact form in `contact.html` actually send emails, using the EmailJS free tier (no backend required, no server needed).

**Step 1 — EmailJS setup instructions (output as a comment block):** Tell the user to: (1) Create a free account at emailjs.com, (2) Create an Email Service connected to Gmail, (3) Create an Email Template with variables `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, (4) Note down their `Service ID`, `Template ID`, and `Public Key`.

**Step 2 — Add to `contact.html` `<head>`:**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>emailjs.init('YOUR_PUBLIC_KEY');</script>
```

**Step 3 — Update the form:** Add `id="contactForm"` and `novalidate` to the `<form>` element. Add `name` attributes to all inputs: `name="from_name"`, `name="from_email"`, `name="subject"`, `name="message"`. Replace the static `.submit-btn` with:
```html
<button type="submit" class="submit-btn" id="submitBtn">
  <span id="btnText">Send Message</span>
  <i class="fas fa-paper-plane" id="btnIcon"></i>
</button>
```

**Step 4 — Form submission JS:** Listen for `form#contactForm` `submit` event. Prevent default. Validate all fields client-side (non-empty, valid email regex). If invalid, show inline error messages below each field in `var(--red)` with `font-size: 0.78rem`. If valid: (1) Set button to loading state: disable it, change text to "Sending...", add spinning `fa-spinner fa-spin` icon. (2) Call `emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)`. (3) On `.then()`: show a success banner `<div class="form-success">Message sent! I'll be in touch within 24 hours.</div>` styled with `var(--green)` left border, reset the form, restore the button. (4) On `.catch()`: show `<div class="form-error">Something went wrong. Please email me directly.</div>` styled with `var(--red)` left border, restore the button.

**Success/error banners styling:** `padding: 1rem 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid [color]; background: [color at 8% opacity]; font-size: 0.88rem; margin-bottom: 1rem; animation: slideDown 0.3s ease`.

---

### PROMPT 12 — Scroll Progress Bar

Add a scroll progress indicator to every page in the portfolio — a 3px bar at the very top of the viewport that fills from left to right as the user scrolls down the page.

**HTML:** Append one element as the very first child of `<body>` on every page:
```html
<div id="scroll-progress"></div>
```

**CSS (add to `style.css`):**
```css
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  z-index: 10000;
  background: linear-gradient(90deg, var(--accent) 0%, rgba(0,209,255,0.6) 100%);
  box-shadow: 0 0 8px var(--accent-glow);
  transition: width 0.05s linear;
  pointer-events: none;
}
```

**JavaScript (add to every page's script block):**
```javascript
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}, { passive: true });
```

No other dependencies or libraries needed. The bar must sit above the sticky nav (`z-index: 10000` exceeds the nav's `z-index: 1000`) and must not interfere with any other element. On short pages where there is no scroll, the bar stays at 0% and remains invisible. Confirm this works correctly on both `index.html` (long) and `contact.html` (shorter).

---

### PROMPT 13 — Back To Top Button

Add a floating "Back to Top" button that appears on every page when the user has scrolled more than 300px from the top.

**HTML:** Append before `</body>` on every page:
```html
<button id="backToTop" aria-label="Back to top" title="Back to top">
  <i class="fas fa-chevron-up"></i>
</button>
```

**CSS (add to `style.css`):**
```css
#backToTop {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s, color 0.3s, box-shadow 0.3s;
}
#backToTop.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
#backToTop:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
}
```

**JavaScript:**
```javascript
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });
btt.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

Ensure the button does not overlap the terminal easter egg (PROMPT 4) when it is open by adding `bottom: 8rem` when `#terminal` has the `open` class. Add a `MutationObserver` on `#terminal` to watch for the `open` class and update `#backToTop`'s bottom value accordingly.

---

## TIER 5 — AMBITIOUS / HIGH REWARD

---

### PROMPT 14 — Canvas Particle Network Hero Background

Replace the static `glow-1` and `glow-2` ambient divs in `index.html` with a live animated canvas particle network that renders behind the hero section.

**HTML:** Replace the two `.glow` divs with:
```html
<canvas id="netCanvas" style="position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.45;"></canvas>
```

**JavaScript — full particle system (add inside a `<script>` tag at the bottom of `index.html`):**

1. **Setup:** Size the canvas to `window.innerWidth × window.innerHeight`. Listen for `resize` to update and re-init.

2. **Particles:** Create 80 particle objects. Each has: `x`, `y` (random initial position), `vx`, `vy` (random velocity between -0.3 and 0.3), `radius: 2`, `opacity: Math.random() * 0.5 + 0.3`.

3. **Animation loop (`requestAnimationFrame`):**
   - Clear canvas each frame
   - Move each particle: `x += vx; y += vy`
   - Bounce off edges: if x or y goes out of bounds, negate the relevant velocity
   - Draw each particle as a filled circle: `fillStyle: rgba(0,209,255,${particle.opacity})`
   - For every pair of particles closer than 130px, draw a line between them with `strokeStyle: rgba(0,209,255,${opacity})` where opacity scales as `(1 - dist/130) * 0.15`
   - Mouse interaction: on `mousemove`, find all particles within 100px of the cursor and gently push them away (add a small force vector away from the cursor position, capped at 0.5 speed)

4. **Performance:** Use `requestAnimationFrame` correctly. Wrap in `document.addEventListener('visibilitychange', ...)` to pause the loop when the tab is hidden and resume when visible. Only run on devices with `window.innerWidth > 768` — on mobile, skip the canvas entirely and show nothing (the glow divs should be removed already).

5. **Fading in:** The canvas starts with `opacity: 0` in CSS. After the DOM loads, transition it to `opacity: 0.45` over 1.5s using `canvas.style.transition = 'opacity 1.5s ease'; canvas.style.opacity = '0.45'`.

---

### PROMPT 15 — Availability Widget + Testimonials Section

**Part A — Live Availability Badge (add to `index.html` hero)**

In the `.hero-text` section, replace the static `.status-badge` with an upgraded real-time availability widget:

```html
<div class="availability-badge">
  <span class="avail-dot"></span>
  <span class="avail-status">Open to opportunities</span>
  <span class="avail-divider">·</span>
  <span class="avail-time" id="accraTime"></span>
  <span class="avail-tz">Accra, GH</span>
</div>
```

**Styling:** Same pill shape as the existing `.status-badge`. The dot is 6px, `var(--green)`, pulsing. The time updates every second using:
```javascript
function updateAccraTime() {
  const now = new Date();
  const accra = new Intl.DateTimeFormat('en-GH', {
    timeZone: 'Africa/Accra',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(now);
  document.getElementById('accraTime').textContent = accra;
}
setInterval(updateAccraTime, 1000);
updateAccraTime();
```

Change the dot and status text dynamically based on Accra time: between 08:00–18:00 show green dot + "Online now", between 18:00–22:00 show amber dot + "Evening hours", between 22:00–08:00 show `var(--text-dim)` dot + "Offline — will respond tomorrow".

**Part B — Testimonials Section (add to `index.html` before footer)**

Add a new section after the "Currently Learning" section:

```html
<section class="section-pad" style="padding-top:0;">
  <div class="container">
    <div class="reveal">
      <span class="label">// endorsements</span>
      <h2 class="heading">What People <em>Say</em></h2>
    </div>
    <div class="testimonials-grid">
      <!-- Cards injected here -->
    </div>
  </div>
</section>
```

**Testimonial card design:** `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem`. Each `.testimonial-card` is a `.card` with: a large opening `"` in `var(--font-display)` 48px `var(--accent-dim)` at top-left, the quote text in `var(--text-muted)` 0.92rem line-height 1.7, and a bottom row with an avatar circle (initials, same style as the contact form), the name in `var(--text)` 0.9rem bold, and the role/organisation in `var(--text-dim)` 0.78rem `var(--font-mono)`.

**Seed with 3 placeholder testimonials** that are clearly marked `<!-- PLACEHOLDER — replace with real quotes -->`:
1. From a CID supervisor about intelligence reporting quality
2. From an MSc course peer about collaboration and technical depth
3. From a past client about graphic design work at Digital Point

**Carousel on mobile:** On `max-width: 768px`, convert the grid to a horizontal scroll snap container: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1rem`. Each card: `min-width: 85%; scroll-snap-align: start`. Add dot indicators below (`<div class="carousel-dots">`) that highlight the active card based on scroll position, updated via `IntersectionObserver` on each card.
