# Contributing

This guide explains how to set up the project, run tests, lint and format the code, and submit pull requests.

## Setup

1. Install **Node.js** (v18 or later).
2. Clone the repository and navigate into it:
   ```bash
   git clone <your-fork-url>
   cd prompter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Optional) Start a local web server to use the app:
   ```bash
   python3 -m http.server
   ```
   Then open `http://localhost:8000` in your browser or simply open `index.html` directly.

## Translations

We welcome new language contributions.

1. Create a folder under `prompts/<lang>` with JSON files for each category.
2. Add the interface text and category names for the language in `src/main.js`.
3. Run `npm run build` to regenerate `prompts.js` before opening a pull request.

## Running tests

The project uses **ESLint** as its test suite. Run:

```bash
npm test
```

This will lint the codebase and report any issues.

## Linting and formatting

* `npm run lint` – run ESLint manually.
* `npm run format` – format files using Prettier.

## Submitting pull requests

1. Create a new branch for your changes.
2. Make your edits and commit them with clear messages.
3. Run `npm test` and `npm run format` before opening a PR.
4. Push your branch to your fork and open a pull request on GitHub, describing your changes.
