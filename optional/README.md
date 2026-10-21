# Optional features (disabled by default)

## Custom cursor (dot + lagging ring)

Removed from the live page so visitors get the normal system cursor. The code is kept here intact.

Files:
- `custom-cursor.css` hides the system cursor on desktop pointers and styles the dot/ring.
- `custom-cursor.js` creates the dot and ring, and animates hover/click states.

**To restore:** in `index.html`, uncomment the two tags marked "Custom cursor"
(the `<link>` in `<head>` after `style.css`, and the `<script>` after `app.js`).
Both files must be loaded together. The cursor never shows on touch devices.

**To remove again:** comment those two tags out.
