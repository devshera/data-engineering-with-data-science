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

## Current offer ("11:11 SALE", flat $1,100 off, ends 2026-11-12) — where it lives
Only the top info bar was switched to the 11:11 sale (v2.5.0). The bottom bar and urgency section still announce the real upcoming cohort "Nov 3, 2026" and the countdown reads `data-cohort-date` on the countdown element (not a JS constant): ASK the user before replacing the cohort messaging with the sale.
When a new offer arrives, update ALL of: top info bar text/short text/CTA/`data-expires`, bottom bar label, countdown target, urgency headline/subtext/perk/CTA, cache-busters.

## Page notes
Custom cursor code lives in `optional/` (disabled). Seat-count bar is intentionally hidden (see CHANGELOG pending list).

## Full playbook
Global rules + the complete checklist (cursor, sticky nav, info bar, Instagram, pricing, hero, offer spots), page table and gotchas: `~/.claude/landing-page-playbook.md` (installed from the private repo https://github.com/devshera/claude-memory).
