# Changelog

All notable changes to the Data Engineering with Data Science landing page (formerly the Certificate in
Data Engineering Foundation landing page).
The page was built from the Business & Data Analytics with AI landing page (v1.0.0 baseline).

- **MAJOR** — course renamed or restructured
- **MINOR** — content or feature additions
- **PATCH** — fixes

## [Unreleased]

### Pending
- Tuition for an individual four-week section is still to be confirmed (only the full bootcamp is priced; the FAQ
  says so).
- Deploy to the new folder `public_html/data-engineering-with-data-science/` (canonical, og:url and og:image now
  point there) and redirect the old `certificate-in-data-engineering-foundation/` URL to it if it was ever live.
- Confirm the instructor line-up for the 24-week program (the PDF does not name one; Kris Jamsa is unchanged).
- Rename the GoHighLevel forms (still titled "Data Engineering Foundation | …" in the GHL account).
- Seat-count bar ("X of 25 taken") stays hidden until a real capacity and enrollment figure is available.

## [2.2.0] - 2026-10-24

### Changed
- Next cohort starts **3 November 2026**: enrollment badge, heading, sticky bar and fine print updated, and the
  live countdown (main section and sticky bar) switched on via `data-cohort-date="2026-11-03T00:00:00"`
  (counts down to midnight in each visitor's local time; set a start time if wanted).

## [2.1.0] - 2026-10-24

### Changed
- Pricing is now three ways to pay for the same bootcamp: Done for Life $3,499 (pay in full, save $2,000),
  Best Value Pack $4,499 ($1,499 today then $1,500 a month for 2 months, recommended) and Quick Starter Pack
  $5,499 ($1,099 today then $1,100 a month for 4 months), each with the same seven benefits.
  Replaces the two "Tuition to be confirmed" cards.
- FAQ cost answer and JSON-LD (AggregateOffer $3,499 to $5,499) updated to match.

## [2.0.1] - 2026-10-24

### Changed
- Social-share image (1200x630), favicon and apple-touch icon replaced with the supplied artwork for
  "Data Engineering with Data Science". Canonical and og:url confirmed as /data-engineering-with-data-science/.

## [2.0.0] - 2026-10-24

The course is now **Data Engineering with Data Science**, a 24-week bootcamp, replacing the four-week Certificate
in Data Engineering Foundation. All copy follows the new program PDF.

### Changed
- Course name, title, meta/Open Graph/Twitter descriptions, JSON-LD, canonical and og:url
  (`/data-engineering-with-data-science/`). JSON-LD no longer carries a price, since tuition is not confirmed.
- Hero, trust bar, Why Now, transformation table, process, community, deliverables and final CTA rewritten for the
  24-week structure: 12 weeks of data engineering then 12 of data science, 48 live meetings, 96–144 live hours,
  6 to 8 hours of independent practice a week, six section certificates plus the Professional Certificate in
  Data Engineering and Data Science.
- Curriculum is now six certificate sections (was six topic areas): each shows the PDF's overview, the six
  "what you will be able to do" outcomes, its eight weekly meeting topics (all 48, verbatim), certificate project
  and entry preparation.
- Skills and tools: pandas, SQL, Python, data modeling, ETL/ELT, dbt, orchestration, cloud storage,
  scikit-learn, time series, model delivery (was Excel and Power Query).
- Lab showcase cards now show a Python/dbt pipeline run, a baseline-vs-model evaluation and a model card.
- Careers: the five career directions from the PDF, plus the BLS related-occupation figures (data scientists
  $120,230 median, 35% growth; database architects $139,500, 9%) with the PDF's caveats.
- Requirements, certificate and FAQ copy follow the PDF (same standards for section and full-program learners;
  certificates are distinct from vendor exams and degrees; direct entry after a readiness task).
- Pricing shows two enrollment options (individual four-week section, complete bootcamp) with "Tuition to be
  confirmed". The $1,000 / $3,000 / $4,000 figures and the 16-week Business & Data Analytics bootcamp references
  are removed.
- Careers tables: left-aligned, wider second column for the longer descriptions.

### Added
- New social-share image and favicons carrying the new title
  (`data-engineering-with-data-science-og.jpg`, `-og-200x200.webp`, `-apple-touch-icon.png`).

### Removed
- Old `data-engineering-foundation-*` images, which showed the previous course name.

## [1.5.7] - 2026-10-21

### Fixed
- Live QA: Cloudflare's auto-injected Web Analytics beacon was blocked by the CSP (console error, best-practices 93).
  CSP now allows `static.cloudflareinsights.com` (script) and `cloudflareinsights.com` (connect).

## [1.5.6] - 2026-10-21

### Fixed
- Undid the blanket centering from 1.5.5. Only the short, single-line headings are centered (Careers,
  Deliverables, Pricing, FAQ); longer headings and the Community header keep the template's left alignment.

## [1.5.5] - 2026-10-21

### Changed
- All section headings (label, title, intro) are center-aligned, including Why Now, Transformation, Curriculum,
  Skills, Learning, Community, Reviews, Deliverables, Hands-On Learning, Pricing and FAQ. Side-by-side copy
  blocks (Guidance, Certificate) keep their left-aligned text next to their visual.

## [1.5.4] - 2026-10-21

### Changed
- Careers heading block ("Where It Applies" label + title) is center-aligned.

## [1.5.3] - 2026-10-21

### Changed
- "Where data preparation skills fit at work." heading is a single line (scales down on small screens; wraps only below 481px).

## [1.5.2] - 2026-10-21

### Changed
- Trust strip no longer scrolls: the skill chips are static, wrapped and centered above the stat cards.

## [1.5.1] - 2026-10-21

### Fixed
- Trust strip: the scrolling marquee had lost its closing tags, so the stat cards and facts scrolled
  past inside it, mixed with the skill chips. The marquee now holds only the chips (seamless loop) and the
  stat cards, facts and CTA sit below it, static and centered.

## [1.5.0] - 2026-10-21

Pre-launch QA: speed, bugs, security. Lighthouse (mobile, gzip enabled like cPanel): performance 99,
accessibility 98, best practices 100, SEO 100; FCP 1.1 s, LCP 2.0 s, TBT 0 ms, CLS 0; 158 KiB total.
Before: performance 80 (FCP 3.6 s, LCP 3.7 s).

### Changed
- Fonts self-hosted (`fonts/`, latin subset, preloaded) instead of render-blocking Google Fonts.
- Images re-encoded to WebP (tft-lms 1.37 MB to 56 KB, graduates and live-class photos about 60% smaller);
  reviewer avatars now local instead of hot-linked from the WordPress site; width/height added to images.
- GHL form iframes and `form_embed.js` load only when a form modal is first opened.
- `style.css` / `app.js` URLs versioned (`?v=`) so the one-year immutable cache can't serve stale files.
- HSTS no longer uses `includeSubDomains`; CSP no longer allows Google Fonts.
- `.htaccess` also denies `.md`, `.json`, `.log`, `.sh` and `.sample.php` files.
- Footer office headings are `h3` (heading order); nav logo `alt` emptied (text sits beside it).

### Added
- Course JSON-LD (name, description, provider, $1,000 offer).
- `DEPLOY.md` upload checklist.

### Removed
- 25 unused images from the base page, the dead hero video/poster references (404s), and the unused `private/` folder.

## [1.4.0] - 2026-10-21

### Changed
- Custom cursor (dot + ring) is off by default; visitors get the normal system cursor.
  The code is preserved in `optional/` (`custom-cursor.css`, `custom-cursor.js`) with restore steps in
  `optional/README.md`; `index.html` has the two tags commented out ready to re-enable.

## [1.3.5] - 2026-10-21

### Fixed
- Hero cards on the right no longer overlap: they stack in normal flow (staggered) instead of fixed
  percentage positions, so the chip card cannot cover the "Refreshable ETL Project" card.
- Background dashboard illustration dimmed so fragments behind the cards don't read as clutter.

## [1.3.4] - 2026-10-21

### Changed
- Hero title re-set as two balanced lines ("Certificate in Data" / "Engineering Foundation") at up to 56px;
  hero text column widened (1.4fr / 1fr) so the larger title fits on desktop.

## [1.3.3] - 2026-10-21

### Changed
- Hero title is two lines ("Certificate in" / "Data Engineering Foundation") at all widths; font size scaled to fit.

## [1.3.2] - 2026-10-21

### Fixed
- Footer Instagram link now points to https://www.instagram.com/transfotechacademy.

## [1.3.1] - 2026-10-21

### Fixed
- Skills & Tools grid: every row, including the shorter last row, is now centered.

## [1.3.0] - 2026-10-21

### Changed
- Course artwork optimized and applied: 1200x630 JPG for `og:image`/`twitter:image`, 200x200 WebP favicon, 180x180 PNG touch icon. Added `og:title`,
  `og:description`, `og:url`, `og:type` and image dimensions.

## [1.2.0] - 2026-10-21

### Added
- New GoHighLevel forms in both modals: "Data Engineering Foundation | Book a Call" and
  "Data Engineering Foundation | Download PDF" (replaces the placeholder).

## [1.1.0] - 2026-10-21

Adapted the base page into the Certificate in Data Engineering Foundation landing page. Section
order, markup, classes and styles are unchanged; copy is sourced from the Business & Data Analyst
Career Launch Bootcamp overview (Weeks 5–8) and the instructor's CV.

### Changed
- Title, meta description and canonical for `/certificate-in-data-engineering-foundation/`.
- Every section rewritten for the course: 4 weeks, 8 live meetings, 16–24 live hours, $1,000
  tuition (or $3,000 complete bootcamp), Power Query ETL, certificate project deliverables.
- Curriculum: 10 tabs → 6 topic areas (presentation groupings, not a class-by-class syllabus).
- Pricing: 3 cards → 2 (individual section, complete bootcamp), scoped `.pv2__grid--two`.
- Salary, placement, hiring-partner, rating, countdown and seat-count claims removed.
- Careers tables list job-search directions and where the skills apply (no salaries).
- Reviews carousel keeps three genuine Transfotech Academy reviews, relabelled as academy-level.
- Hero illustration text and lab-card examples reworded for ETL.

### Added
- Instructor section (was commented out in the base page) for Kris Jamsa, with portrait.
- Placeholder in both modals in place of the other course's GHL forms.

### Removed
- Old course's GoHighLevel form IDs and the hard-coded June 9, 2026 countdown date.
