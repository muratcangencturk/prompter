# Prompter

Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

Prompt templates are stored in small JSON files under the `prompts/` directory and are loaded on demand for faster initial page loads.

![Screenshot](icons/logo.svg)

## Features

- Works offline after the first visit
- Fast loading thanks to lightweight JSON prompt files
- Light and dark themes
- English and Turkish interface
- Twelve prompt categories with over 31M combinations per language (more than 62M across EN and TR)
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

- Prompter currently supports **English** (`EN`) and **Turkish** (`TR`).
- Use the language switcher in the top‑right corner to choose your interface language. The setting persists in your browser.
## Accessibility

Colors for both light and dark themes meet WCAG AA contrast requirements. Gradients and button styles were tested with automated tools and adjusted so text has at least a 4.5:1 contrast ratio against its background.

## Categories

Prompter offers a variety of prompt themes. Select a category by clicking its icon in the **Select Your Prompt Inspiration** area.

- **Random Mix** – picks from all categories
- **Inspiring** – motivational or uplifting scenarios
- **Mind-blowing** – speculative or reality‑bending ideas
- **Productivity** – business and money-making strategies
- **Educational** – quick lessons and knowledge tests
- **Crazy** – absurd, darkly humorous situations
- **Perspective** – rethink a situation from another angle
- **AI** – prompts about artificial intelligence and the future
- **Ideas** – pitches for apps, movies, books, and more
- **Video** – concepts for short films or viral clips
- **Image** – descriptions for unique visuals or logos
- **Hellprompts** – unsettling horror themes

Prompter includes **12 categories** in total—the **Random Mix** plus 11 themed options listed above. Each prompt is composed of four parts. Most categories now have **40** openings and endings and around **39** middle lines. The **AI** set was expanded to **50** entries for its first and last sections, while **Ideas** and **Perspective** gained extra variations. As a result, most categories generate **2,433,600** prompts each. **Perspective** yields **2,432,079**, **Ideas** produces **3,175,040** and **AI** reaches **6,002,500**. In total the 11 themed categories provide **31,078,419** unique prompts per language—**62,156,838** across both English and Turkish.

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

## Deployment

The site is published automatically using GitHub Pages. The workflow
[`pages.yml`](.github/workflows/pages.yml) installs dependencies, runs
`npm run build` (which executes `scripts/build-prompts.js`) to generate `prompts.js`, update `sw.js`, bump the version in `manifest.json` and then uploads the artifact to GitHub Pages using
`actions/upload-pages-artifact` and `actions/deploy-pages`. Pushes to the
`main` branch trigger a new deployment and the site becomes available at
the repository's Pages URL.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.

## Disclaimer

The prompt files are provided "AS IS" and may produce unexpected content. Review generated outputs carefully before using or sharing them. See the "Disclaimer of Warranty" section in the [Apache 2.0 License](LICENSE) for details.
