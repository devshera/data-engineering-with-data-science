# CLAUDE.md — Data Engineering with Data Science

Project instructions for Claude Code. (Do NOT upload this file to cPanel.)

## What this is
Static landing page for Transfotech Academy. Live: https://transfotechacademy.com/data-engineering-with-data-science/
Git branch: `main`. GitHub: https://github.com/devshera/data-engineering-with-data-science

## Rules for every change (standing instructions from the owner, Theophil Dio)
- Commit, tag the next semver version, and push after EVERY change: `git push origin main --follow-tags`; confirm `git status -sb` shows nothing ahead. Never force-push.
- Run localhost and open it: `python3 -m http.server 8083` then `open http://localhost:8083/`; tell the user what to check.
- He deploys manually through cPanel File Manager. Never overwrite the server's `.htaccess`.
- Report content problems (expired dates/offers, seat counters, claims) instead of silently changing them.
- Verify by measuring (computed styles, console errors, `elementFromPoint`), not only screenshots (headless screenshots catch fade-in animations half-way). Inject test scripts with Python, not `sed`.

## Files, build, deploy
- Upload to cPanel: see DEPLOY.md: index.html, style.min.css, app.min.js, .htaccess, images/, fonts/. NOT CHANGELOG.md, DEPLOY.md, optional/, style.css, app.js, CLAUDE.md
- Build: Edit style.css/app.js, then `npx --yes esbuild style.css --minify --outfile=style.min.css` and `npx --yes esbuild app.js --minify --outfile=app.min.js`; bump `?v=` in index.html; add an entry to CHANGELOG.md for every change (versions v2.x.x).

## Current offer ("Black Friday Career Upgrade: 50% Off All Courses", ends 2026-11-30 23:59:59) — where it lives
Info bar (`#promo-bar`, `data-expires`); bottom bar `.sticky-cta__label` + countdown (`#scd-*`); urgency section `#enroll` (countdown `#cd-*`). The countdown target is `data-cohort-date` on `#urgency-countdown` (not a JS constant). At expiry app.js removes the info bar, bottom bar and urgency countdown. The old Nov 3, 2026 cohort messaging was removed in v2.6.0. Pricing cards are not part of the offer.
When a new offer arrives, update ALL of: info bar text/short text/CTA/`data-expires`, bottom bar label, countdown target, urgency section, cache-busters.

## Page notes
Custom cursor code lives in `optional/` (disabled). Seat-count bar is intentionally hidden (see CHANGELOG pending list).

## Full playbook
Global rules + the complete checklist (cursor, sticky nav, info bar, Instagram, pricing, hero, offer spots), page table and gotchas: `~/.claude/landing-page-playbook.md` (installed from the private repo https://github.com/devshera/claude-memory).
