# Changelog

All notable changes to the Certificate in Data Engineering Foundation landing page.
The page was built from the Business & Data Analytics with AI landing page (v1.0.0 baseline).

- **MINOR** — content or feature additions
- **PATCH** — fixes

## [Unreleased]

### Pending
- GoHighLevel embed code for the new course (modal "Book a Call" and "Course Outline" forms
  show a placeholder, see `data-ghl-slot` in `index.html`).
- Cohort start date: set `data-cohort-date` (ISO, e.g. `2026-12-01T09:00:00`) on
  `#urgency-countdown` to switch on the countdown, and restore the seat-count and sticky-bar copy.
- Course-specific OG image (`og:image` still points at the base page's image).

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
