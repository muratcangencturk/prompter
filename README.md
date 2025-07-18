# Prompter

Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

Prompt templates are stored in small JSON files under the `prompts/` directory and are loaded on demand for faster initial page loads.

![Screenshot](icons/logo.svg)

## Features

- Works offline after the first load
- Fast loading thanks to lightweight JSON prompt files
- Light and dark themes
- English, Turkish, Spanish, Hindi, French and Chinese interface
- Twelve prompt categories with over 53M combinations per language (more than 318M across EN, TR, ES, HI, FR and ZH)
- Quick access to Top 10 rankings via the award icon

This **AI prompt generator** delivers **creative prompt ideas** in a lightweight web app that runs directly in your browser. Core pages are cached for offline use after the first visit.

## Opening the application

It is recommended to serve the project directory with a simple HTTP server for reliable loading. From the root folder run for example:

```bash
python3 -m http.server
```

and then visit `http://localhost:8000`. This ensures the JSON prompt files load correctly. The generator fetches prompt data online but cached pages open offline.

Opening `index.html` over `file://` URLs is not supported. Browsers block JavaScript modules when loaded from the file system, so the application cannot initialize. Always serve the directory over HTTP using a command such as `python3 -m http.server` and then visit `http://localhost:8000`.
A server that rewrites extensionless URLs like `/blog` to `/blog.html` is required for the service worker's asset list to match. Simple servers such as `python3 -m http.server` do not provide this rewrite and will cause caching errors when pages are accessed without the `.html` extension.

## Browser support

Prompter relies on modern JavaScript features such as ES modules. The interface
is tested on the following minimum browser versions:

- **Chrome 80** or newer
- **Firefox 79** or newer
- **Safari 13.1** or newer
- **Edge 85** or newer

Older browsers may display a warning banner and some functionality could be
disabled.

## Authentication

Prompter uses Firebase Email/Password authentication. Provide your Firebase
credentials in a `firebase.config.json` file that can be fetched relative to the
deployed base URL (for example `./firebase.config.json` when served from `https://example.com/app/`)
or expose them via `window.firebaseConfig` before the scripts load.
The JSON file should follow this structure:

```json
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT.firebaseapp.com",
  "projectId": "YOUR_PROJECT",
  "storageBucket": "YOUR_PROJECT.appspot.com",
  "messagingSenderId": "YOUR_SENDER_ID",
  "appId": "YOUR_APP_ID",
  "measurementId": "YOUR_MEASUREMENT_ID"
}
```

Enable that sign‑in method in your Firebase console and add your domain (for example `localhost`) to the list of authorized domains.
Serve the app using a simple HTTP server such as `python3 -m http.server` so Firebase initializes correctly.
Synchronization of saved prompts with Firebase requires a logged-in session. When not authenticated, prompts are only stored locally.
Firestore caching is enabled using `initializeFirestore` with `persistentLocalCache({ tabManager: persistentMultipleTabManager() })`. Persistence errors are ignored so the app works even when offline caching cannot be activated.
If `firebase.config.json` cannot be fetched, a red banner reading "Missing Firebase configuration" appears at the top of the page and the Social and Profile pages skip their initialization.

### Versioning

The `manifest.json` file includes a `version` field that increments on each build so deployments always serve the newest assets. Running `npm run build` also updates `sw.js` and appends the version to JavaScript and CSS references in all HTML files. This ensures browsers fetch the latest files and old caches are purged.

## Customization

### Theme

- **Dark theme** (default) and **Light theme** are available.
- Use the sun/moon buttons in the top‑left corner to switch themes. Your preference is saved locally.

### Language

- Prompter currently supports **English** (`EN`), **Turkish** (`TR`), **Spanish** (`ES`), **Hindi** (`HI`), **French** (`FR`) and **Chinese** (`ZH`).
- Use the language switcher in the top‑right corner to choose your interface language. The setting persists in your browser.

## Accessibility

Colors for both light and dark themes meet WCAG AA contrast requirements. Gradients and button styles were tested with automated tools and adjusted so text has at least a 4.5:1 contrast ratio against its background.

## Categories

Prompter offers a variety of prompt themes. Select a category by clicking its icon in the **Select Your Prompt Inspiration** area.

- **Random** – picks from all categories
- **Inspiring** – motivational or uplifting scenarios
- **Interesting** – speculative or reality‑bending ideas
- **Productivity** – business and money-making strategies
- **Educational** – quick lessons and knowledge tests
- **Crazy** – absurd, darkly humorous situations
- **Perspective** – rethink a situation from another angle
- **AI** – prompts about artificial intelligence and the future
- **Ideas** – pitches for apps, movies, books, and more
- **Video** – concepts for short films or viral clips
- **Image** – descriptions for unique visuals or logos
- **Hellprompts** – unsettling horror themes

Prompter includes **12 categories** in total—the **Random** plus 11 themed options listed above. Each prompt is composed of four parts. Most categories now have **52** openings and endings and around **51** middle lines. The **AI** set now has **62** entries for its first and last sections, while **Ideas** and **Perspective** gained extra variations. As a result, most categories generate **7,033,104** prompts each. **Perspective** yields **7,030,503**, **Ideas** produces **8,642,816** and **AI** reaches **14,303,524**. In total the 11 themed categories provide **86,241,675** unique prompts per language—**517,450,050** across English, Turkish, Spanish, Hindi, French and Chinese.

If icon fonts fail to load, the app falls back to emoji symbols so the buttons remain visible.

Example: click the **Video** icon, then press **Generate New Prompt** to create a video-related idea.

## Prompt file format

Prompt data lives in the `prompts/` directory. Files are organised by language and category:
`prompts/<language>/<category>.json`. Each JSON file contains a `parts` array with four arrays
of strings. These arrays represent the beginning, topic, continuation and ending of a prompt:

```json
{
  "parts": [
    ["First part option", "..."],
    ["Second part option", "..."],
    ["Third part option", "..."],
    ["Fourth part option", "..."]
  ]
}
```

### Creating categories or translations

1. Add a new JSON file under `prompts/<language>/` following the structure above.
2. Register the category in `src/main.js` with an icon, emoji and names.
3. Provide corresponding files for other languages to offer translations—use the Hindi (`hi`) folder as a reference.
4. Run `npm run build` to regenerate `prompts.js`, update `sw.js` and bump the version in `manifest.json`. The script also rewrites HTML files with versioned asset URLs so deployments include your changes.
5. Run `node scripts/count-prompts.js` to see how many unique prompts each category provides per language.

## Development

This repository uses ESLint and Prettier for code quality. After cloning the
project, install the dependencies by running:

```bash
npm install
```

You **must** run `npm install` at least once (and whenever `package.json`
changes) before executing `npm test` so the linter can access its tooling.

Before committing changes run:

```bash
npm test
```

to execute the linter. To automatically format files run:

```bash
npm run format
```

Running `npm install` before `npm test` helps ensure consistent code style
across contributions. To serve the application locally during development run:

```bash
npm start
```

After editing `src/styles.css`, build the final Tailwind stylesheet by running:

```bash
npm run build:css
```

This command invokes the Tailwind CLI to compile `src/styles.css` into
`css/tailwind.css`.

To backfill older accounts with root-level name and email fields run:

```bash
node scripts/migrate-user-names.js
node scripts/migrate-user-emails.js
```

This script copies the `name` from `users/{uid}/profile/info` into the parent
`users/{uid}` document when missing.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup instructions and the pull
request workflow.

## SEO Optimizations

Prompter includes a range of optimizations to help search engines crawl and index the site efficiently:

- `robots.txt` allows all bots and references the generated `sitemap.xml`.
- `index.html` and `tr/index.html` embed `WebSite` and `FAQPage` schema markup.
- Key assets are preloaded and images are lazy loaded with explicit size attributes for faster rendering.
- The icons folder can be optimized using `npm run optimize:images` which runs **SVGO** on all SVG assets.
- Pages are fully responsive – check with Google’s [Mobile‑Friendly Test](https://search.google.com/test/mobile-friendly).
- HTTPS is enforced via a `Content-Security-Policy` upgrade header.
- Image `alt` text and descriptive file names improve visual search results.
- `scripts/generate-sitemap.js` keeps the sitemap up to date for search engines.
- Use analytics tools such as Google Search Console or Ahrefs to monitor crawl errors and Core Web Vitals.
- Prompt JSON files include additional lines to keep content fresh across all categories.

## Changing the base URL

Before deploying your own instance, update all references to the default domain
(`https://prompterai.space`).

- Edit the canonical `<link>` tags in all HTML files so they point to your final
  site.
- Update `src/config.js` with your domain so scripts use the correct `BASE_URL`. The same file contains an `AD_LINK` constant that controls whether clicking the “Random” or “Ideas” categories opens an advertisement link in a new tab. Set `AD_LINK` to `null` (the default) to disable this behavior.
- Ensure the `<base>` tag in every HTML file matches the path where the site is
  hosted. A mismatched value will break relative URLs. Example: `<base
href="/subdir/">` when serving from `/subdir/`.
- All pages now use relative script paths so the app also works when deployed inside a subdirectory.
- You can automatically rewrite the `<base>` tags by setting the `BASE_HREF`
  environment variable when running `npm run build`, e.g. `BASE_HREF=/subdir/
npm run build`.
- Set the `SITE_URL` environment variable when running the build commands, for example:

```bash
SITE_URL=https://example.com npm run build && npm run build:sitemap
```

This updates `sitemap.xml` and `robots.txt` with your domain.
- Run `npm run build:es5` before deploying so older browsers load the transpiled scripts.

## Deployment

The site is published automatically using GitHub Pages. The workflow
[`pages.yml`](.github/workflows/pages.yml) installs dependencies, runs
`npm run build` (which executes `scripts/build-prompts.js`) and `npm run build:sitemap` to generate `prompts.js`, bump the version in `manifest.json`, update `sw.js` and rewrite HTML files with versioned asset URLs before uploading the artifact using
`actions/upload-pages-artifact` and `actions/deploy-pages`. Pushes to the
`main` branch trigger a new deployment and the site becomes available at
the repository's Pages URL.

## Updating Firestore Indexes

If you modify `firestore.indexes.json`, deploy the indexes to your Firebase project:

```bash
firebase deploy --only firestore:indexes
```

Use a valid Firebase token when running the command above. Missing indexes will
lead to empty results on the Social page until they are created.
Firestore may take several minutes to build the indexes after deployment. During
this period queries on the Social page can throw `failed-precondition` errors and
show "Failed to load prompts."

Profile pages also rely on the `userId + sharedBy` composite index. You can
create it through the [Firebase console](https://console.firebase.google.com/u/0/project/YOUR_PROJECT/firestore/indexes)
or deploy the definition in `firestore.indexes.json`. Without this index,
prompts on a user's profile will fail to load.

The entry in `firestore.indexes.json` looks like:

```json
{
  "collectionGroup": "prompts",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "userId", "order": "ASCENDING" },
    { "fieldPath": "sharedBy", "arrayConfig": "CONTAINS" }
  ]
}
```

If you encounter `Cannot read properties of undefined (reading 'onAuthStateChanged')` on the Social page, your Firebase configuration is missing. Create a `firebase.config.json` file (using `firebase.config.example.json` as a template) or set `window.firebaseConfig` before loading the scripts. When the file cannot be loaded, a "Missing Firebase configuration" banner is shown.

## CLI and script credentials

Some maintenance tasks rely on the Firebase CLI or Node scripts in the `functions/` and `scripts/` folders. These tools require credentials to access your Firebase project.

### `FIREBASE_TOKEN`

Export a token when running Firebase CLI commands so deployments work without an interactive login:

```bash
export FIREBASE_TOKEN=YOUR_TOKEN
firebase deploy --only firestore:indexes
```

Generate the token with `firebase login:ci`. **Never commit your token.**

### `GOOGLE_APPLICATION_CREDENTIALS`

Scripts that use the Firebase Admin SDK need a service‑account key when executed locally. Provide the path to the JSON key via `GOOGLE_APPLICATION_CREDENTIALS`:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
node scripts/migrate-user-names.js
```

Keep service‑account keys private and do not store them in the repository.

### `FIREBASE_SERVICE_ACCOUNT`

The Cloud Functions in `functions/` and Node scripts in `scripts/` also check
this variable for service‑account credentials. Set it to the JSON contents of
your key when a file path is inconvenient:

```bash
export FIREBASE_SERVICE_ACCOUNT="$(cat service-account.json)"
```

The JSON will be parsed and passed to `initializeApp()` as a credential.

## Advertising

Prompter no longer loads Google AdSense scripts and currently does not display
any third‑party advertising.

## FAQ

### How do I update the production build?

Run `npm run build` after any production change. This command regenerates build artifacts, updates `sw.js`, and increments the version in `manifest.json` while rewriting HTML files with the new asset version. Open pages check the manifest every five minutes and reload automatically when the version changes.

## Offline support and refresh strategy

All pages include `src/version.js`, which checks `manifest.json` every five minutes.
When the `version` field changes, open pages reload automatically. The service worker in
`sw.js` precaches essential files for offline access. During activation it deletes old caches
and reloads open pages so updates are applied immediately.

Run `npm run build` whenever you modify production files. The script updates `manifest.json`, rewrites HTML asset URLs and refreshes the cached files listed in `sw.js` so clients always receive the latest version.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.

## Attributions

Prompter uses [TailwindCSS](https://tailwindcss.com/) and [Lucide](https://lucide.dev/) under their respective open source licenses. The `lucide.min.js` script is bundled in this repository for reliability. See the [TailwindCSS MIT license](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE) and the [Lucide ISC license](https://github.com/lucide-icons/lucide/blob/main/LICENSE) for details.

## Disclaimer

The prompt files are provided "AS IS" and may produce unexpected content. Review generated outputs carefully before using or sharing them. See the "Disclaimer of Warranty" section in the [Apache 2.0 License](LICENSE) for details.

## Troubleshooting

If pages fail to load and show an `ERR_FAILED` error, outdated service workers or caches may be stuck in the browser. Click the **Refresh** banner that appears when a new version is detected to clear them. You can also open the browser console and run:

```javascript
window.clearServiceWorkersAndCaches();
```

This removes all service workers and cached files for the site, forcing a clean reload.
