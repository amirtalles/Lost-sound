# Lost Sound

Upload. Share. Be heard. A dark, cinematic, mobile-first music platform UI.

## Stack
Plain HTML5 / CSS3 / vanilla JS — no build step, no frameworks. Works as-is on GitHub Pages.

## Structure
- `index.html` — markup for all screens (home/artists, artist detail, upload, uploading, my sound, profile)
- `style.css` — dark cinematic design system, fixed CSS-generated background, entrance animation
- `script.js` — artist data, staggered entrance animation, screen navigation, upload simulation
- `assets/` — reserved for local media; the prototype currently loads placeholder portraits from a public avatar CDN (i.pravatar.cc) so it runs with zero setup. Swap the `photo` URLs in `script.js` for files in `assets/` to use your own images.

## Run it
Just open `index.html`, or serve the folder (`python3 -m http.server`) and visit it in a browser. No dependencies to install.

## Deploy to GitHub Pages
Push this folder to a repo and enable Pages on the branch/root — no build step required.
