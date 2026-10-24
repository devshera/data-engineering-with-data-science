# Deploying to cPanel

Upload to `public_html/data-engineering-with-data-science/`:

- `index.html`, `style.min.css`, `app.min.js`, `.htaccess`
- `images/` and `fonts/`

Do **not** upload: `CHANGELOG.md`, `DEPLOY.md`, `optional/`, `.git/`, `.gitignore`, or the unminified sources `style.css` / `app.js`.

The page loads `style.min.css` and `app.min.js`. After editing `style.css` or `app.js`, rebuild them:

    npx esbuild style.css --minify --outfile=style.min.css
    npx esbuild app.js --minify --outfile=app.min.js

Then bump the `?v=` on both in `index.html` (they are cached for a year).

After upload, check: page loads over HTTPS, a modal opens and shows the GHL form, and the response headers
(`curl -I https://transfotechacademy.com/data-engineering-with-data-science/`) include the CSP and
`Content-Encoding: gzip` for HTML/CSS/JS.
