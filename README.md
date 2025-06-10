# Prompter

Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

Prompt templates are stored in small JSON files under the `prompts/` directory and are loaded on demand for faster initial page loads.

![Screenshot](icons/logo.svg)

## Features

- Works offline after the first visit
- Fast loading thanks to lightweight JSON prompt files
- Light and dark themes
- English and Turkish interface
- Twelve prompt categories with over 2.5M combinations
  This **AI prompt generator** delivers **creative prompt ideas** in a lightweight **offline web app** that runs directly in your browser.

## Opening the application

Simply open `index.html` in any modern web browser. You can double‑click the file or use your browser's **Open File** option. No server setup is required.

When served from a local web server (for example `python3 -m http.server`) the app installs a small service worker that caches `index.html`, `tailwind.js`, `lucide.min.js`, all JSON files under `prompts/` and the logo in `icons/logo.svg`. After an initial visit you can disconnect from the network and the generator will still load and function normally.

### Versioning

The service worker reads the `version` field from `manifest.json` and names its cache accordingly (for example `prompter-v3`). When the version changes, any old caches are removed automatically during activation so users receive the latest files.

## Customization

### Theme

- **Dark theme** (default) and **Light theme** are available.
- Use the sun/moon buttons in the top‑left corner to switch themes. Your preference is saved locally.

### Language

- Prompter currently supports **English** (`EN`) and **Turkish** (`TR`).
- Use the language switcher in the top‑right corner to choose your interface language. The setting persists in your browser.

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

Prompter includes **12 categories** in total—the **Random Mix** plus 11 themed options listed above. Each prompt is composed of four parts with 22 choices in each, meaning every category yields **234,256** unique prompts. Summed across the 11 themed categories this comes to **2,576,816** possible prompts.

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
4. Run `npm run build` to regenerate `prompts.js` so deployments include your changes.

## Development

This repository uses ESLint and Prettier for code quality. After cloning the
project, run `npm install` to install the dependencies.

Before committing changes run:

```bash
npm test
```

to execute the linter. To automatically format files run:

```bash
npm run format
```

Running `npm install` and `npm test` helps ensure consistent code style across
contributions.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup instructions and the pull
request workflow.

## Deployment

The site is published automatically using GitHub Pages. The workflow
[`pages.yml`](.github/workflows/pages.yml) installs dependencies, runs
`npm run build` (which executes `scripts/build-prompts.js`) to generate
`prompts.js` and then uploads the artifact to GitHub Pages using
`actions/upload-pages-artifact` and `actions/deploy-pages`. Pushes to the
`main` branch trigger a new deployment and the site becomes available at
the repository's Pages URL.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.
