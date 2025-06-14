# Prompter

Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

Prompt templates are stored in small JSON files under the `prompts/` directory and are loaded on demand for faster initial page loads.

![Screenshot](icons/logo.svg)

## Features

- Works offline after the first visit
- Fast loading thanks to lightweight JSON prompt files
- Light and dark themes
- English, Turkish and Spanish interface
- Twelve prompt categories with over 53M combinations per language (more than 159M across EN, TR and ES)
  This **AI prompt generator** delivers **creative prompt ideas** in a lightweight **offline web app** that runs directly in your browser.

## Opening the application

It is recommended to serve the project directory with a simple HTTP server for reliable loading. From the root folder run for example:

```bash
python3 -m http.server
```

and then visit `http://localhost:8000`. This allows the service worker to cache `index.html`, `tailwind.js`, `lucide.min.js`, all JSON files under `prompts/` and the logo in `icons/logo.svg` so the generator works offline after the first visit.

You can still open `index.html` directly from your file system, but offline mode only works if `prompts.js` is loaded because the JSON prompt files cannot be fetched when using the `file://` protocol.

### Versioning

The service worker reads the `version` field from `manifest.json` and names its cache accordingly (for example `prompter-v3`). When the version changes, any old caches are removed automatically during activation so users receive the latest files.

## Customization

### Theme

- **Dark theme** (default) and **Light theme** are available.
- Use the sun/moon buttons in the top‑left corner to switch themes. Your preference is saved locally.

### Language

 - Prompter currently supports **English** (`EN`), **Turkish** (`TR`) and **Spanish** (`ES`).
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

Prompter includes **12 categories** in total—the **Random** plus 11 themed options listed above. Each prompt is composed of four parts. Most categories now have **52** openings and endings and around **51** middle lines. The **AI** set now has **62** entries for its first and last sections, while **Ideas** and **Perspective** gained extra variations. As a result, most categories generate **7,033,104** prompts each. **Perspective** yields **7,030,503**, **Ideas** produces **8,642,816** and **AI** reaches **14,303,524**. In total the 11 themed categories provide **86,241,675** unique prompts per language—**258,725,025** across English, Turkish and Spanish.

If icon fonts fail to load, the app falls back to emoji symbols so the buttons remain visible.

If the TailwindCSS CDN is unreachable, a local copy bundled with the app is loaded automatically so the interface still looks correct.

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
3. Provide corresponding files for other languages to offer translations.
4. Run `npm run build` to regenerate `prompts.js`, update `sw.js`, and bump the version in `manifest.json` so deployments include your changes.
5. Run `node scripts/count-prompts.js` to see how many unique prompts each category provides per language.

## Development

This repository uses ESLint and Prettier for code quality. After cloning the
project, run `npm install` to install the dependencies. Always run this command
before executing `npm test` so the required tooling is available.

Before committing changes run:

```bash
npm test
```

to execute the linter. To automatically format files run:

```bash
npm run format
```

Running `npm install` and `npm test` helps ensure consistent code style across
contributions. To serve the application locally during development run:

```bash
npm start
```

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
- A service worker caches content for offline use and better performance.
- Image `alt` text and descriptive file names improve visual search results.
- `scripts/generate-sitemap.js` keeps the sitemap up to date for search engines.
- Use analytics tools such as Google Search Console or Ahrefs to monitor crawl errors and Core Web Vitals.
- Prompt JSON files include additional lines to keep content fresh across all categories.

## Changing the base URL

Before deploying your own instance, update all references to the default domain
(`https://prompterai.space`).

- Edit the canonical `<link>` tags in `index.html` and `tr/index.html` so they
  point to your final site.
- In `scripts/generate-sitemap.js` replace the `BASE_URL` constant and run
  `npm run build:sitemap` to regenerate `sitemap.xml`.
- Update the `Sitemap:` line inside `robots.txt` with your new domain.

## Deployment

The site is published automatically using GitHub Pages. The workflow
[`pages.yml`](.github/workflows/pages.yml) installs dependencies, runs
`npm run build` (which executes `scripts/build-prompts.js`) and `npm run build:sitemap` to generate `prompts.js`, update `sw.js`, bump the version in `manifest.json`, create `sitemap.xml` and then upload the artifact using
`actions/upload-pages-artifact` and `actions/deploy-pages`. Pushes to the
`main` branch trigger a new deployment and the site becomes available at
the repository's Pages URL.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.

## Attributions

Prompter uses [TailwindCSS](https://tailwindcss.com/) and [Lucide](https://lucide.dev/) under their respective open source licenses. Their local copies—`tailwind.js` and `lucide.min.js`—are bundled in this repository so the application works offline. See the [TailwindCSS MIT license](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE) and the [Lucide ISC license](https://github.com/lucide-icons/lucide/blob/main/LICENSE) for details.

## Disclaimer

The prompt files are provided "AS IS" and may produce unexpected content. Review generated outputs carefully before using or sharing them. See the "Disclaimer of Warranty" section in the [Apache 2.0 License](LICENSE) for details.
