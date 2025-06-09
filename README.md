# Prompter


Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

Prompt templates are now loaded from a separate `prompts.js` file for faster page loading.
## Features

- Works offline after the first visit
- Fast loading thanks to the local `prompts.js` file
- Light and dark themes
- English, Turkish and Spanish interface
- Twelve prompt categories with over 1.7M combinations
This **AI prompt generator** delivers **creative prompt ideas** in a lightweight **offline web app** that runs directly in your browser.


## Opening the application

Simply open `index.html` in any modern web browser. You can double‑click the file or use your browser's **Open File** option. No server setup is required.

When served from a local web server (for example `python3 -m http.server`) the app installs a small service worker that caches `index.html`, `tailwind.js`, `lucide.min.js`, `prompts.js` and the logo in `icons/logo.svg`. After an initial visit you can disconnect from the network and the generator will still load and function normally.

## Customization

### Theme
- **Dark theme** (default) and **Light theme** are available.
- Use the sun/moon buttons in the top‑left corner to switch themes. Your preference is saved locally.

### Language
- Prompter currently supports **English** (`EN`), **Turkish** (`TR`) and **Spanish** (`ES`).
- Use the language switcher in the top‑right corner to choose your interface language. The setting persists in your browser.

### Translating
Contributions for other languages are welcome. To add a translation:
1. Create a new file under `prompts/` matching the structure of the existing language files. You can copy `prompts/es.js` as a starting point.
2. Extend the `uiText` object in `main.js` with the new translations.
3. Add a button in the language switcher and hook it up in the script with `setLanguage()`.
4. Include the language code in the array near the bottom of `prompts.js` so prompt structures are applied.

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

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.
