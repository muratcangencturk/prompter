# Prompter

Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

Prompt templates are stored in small JSON files under the `prompts/` directory and are loaded on demand for faster initial page loads.

![Screenshot](icons/logo.svg)

## Features

- Works offline after the first visit
- Fast loading thanks to lightweight JSON prompt files
- Light and dark themes
- English and Turkish interface
- Twelve prompt categories with over 1.7M combinations
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

Prompter includes **12 categories** in total—the **Random Mix** plus 11 themed options listed above. Each prompt is composed of four parts with at least twenty choices in each. Most categories therefore generate **160,000** unique prompts, while the **AI** and **Video** categories offer a bit more with **168,000** possibilities. Across all categories this adds up to roughly **1,776,000** different combinations.

If icon fonts fail to load, the app falls back to emoji symbols so the buttons remain visible.

If the TailwindCSS CDN is unreachable, a local copy bundled with the app is loaded automatically so the interface still looks correct.

Example: click the **Video** icon, then press **Generate New Prompt** to create a video-related idea.

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

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.
