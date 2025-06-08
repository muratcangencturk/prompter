# Prompter

Prompter is a small web application that generates creative prompts for AI models. It runs entirely in the browser using HTML, TailwindCSS and vanilla JavaScript.

## Opening the application

Simply open `index.html` in any modern web browser. You can double‑click the file or use your browser's **Open File** option. No server setup is required.

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

If icon fonts fail to load, the app falls back to emoji symbols so the buttons remain visible.
If the TailwindCSS CDN is unreachable, a local copy bundled with the app is loaded automatically so the interface still looks correct.

Example: click the **Video** icon, then press **Generate New Prompt** to create a video-related idea.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for the full text.
