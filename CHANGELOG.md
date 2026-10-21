# Changelog

All notable changes to the Certificate in Data Engineering Foundation landing page.
The page was built from the Business & Data Analytics with AI landing page (v1.0.0 baseline).

- **MINOR** — content or feature additions
- **PATCH** — fixes

## [Unreleased]

### Pending
- Cohort start date: set `data-cohort-date` (ISO, e.g. `2026-12-01T09:00:00`) on
  `#urgency-countdown` to switch on the countdown, and restore the seat-count and sticky-bar copy.

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
