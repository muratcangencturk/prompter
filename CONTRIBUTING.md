# Contributing

This guide explains how to set up the project, run tests, lint and format the code, and submit pull requests.

## Setup

1. Install **Node.js** (v22 or later). Cloud Functions deploy on Node 18, but
   the dependencies are compatible with newer releases so local development
   works best on Node 22.
2. Clone the repository and navigate into it:
   ```bash
   git clone <your-fork-url>
   cd prompter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   This project uses **ESLint v8.57.0**, which is installed as a dev
   dependency. Make sure your editor uses this version for linting.
   Run this command before executing `npm test` so the linter can run correctly.
   The install step also sets up Git hooks using **Husky** so that `npm run build`
   runs automatically when needed.
4. (Optional) Start a local web server to use the app:
   ```bash
   python3 -m http.server
   ```
   Then open `http://localhost:8000` in your browser or simply open `index.html` directly.

## Running tests

The project uses **ESLint** as its test suite. Run:

```bash
npm test
```

Make sure you have run `npm install` at least once before running the tests so
that all required packages are available.

This will lint the codebase and report any issues.

## Linting and formatting

- `npm run lint` – run ESLint manually.
- `npm run format` – format files using Prettier.

## Submitting pull requests

1. Create a new branch for your changes.
2. Make your edits and commit them with clear messages.
3. If you modify any HTML files, JavaScript under `src/`, or the `prompts/` directory, run `npm run build` to regenerate `prompts.js` and update `manifest.json` and HTML versions. A pre-commit hook will do this automatically when these files change.
4. Run `npm test` and `npm run format` before opening a PR.
5. Push your branch to your fork and open a pull request on GitHub, describing your changes.
