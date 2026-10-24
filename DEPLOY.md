# Deploying to cPanel

Upload to `public_html/data-engineering-with-data-science/`:

- `index.html`, `style.css`, `app.js`, `.htaccess`
- `images/` and `fonts/`

Do **not** upload: `CHANGELOG.md`, `DEPLOY.md`, `optional/`, `.git/`, `.gitignore`.

Before each release, bump the `?v=` on `style.css` and `app.js` in `index.html` (they are cached for a year).

After upload, check: page loads over HTTPS, a modal opens and shows the GHL form, and the response headers
(`curl -I https://transfotechacademy.com/data-engineering-with-data-science/`) include the CSP and
`Content-Encoding: gzip` for HTML/CSS/JS.
