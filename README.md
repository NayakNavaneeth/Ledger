# Ledger — a paper-tape expense tracker

A small, dependency-free expense tracker styled like a paper receipt tape.
Add income and expenses, see your running balance, and export your data as JSON.

![Type: HTML/CSS/JS]() ![No frameworks, no build step]()

## Features
- Add income or expense entries with a category
- Live totals for money in, money out, and balance
- Export all entries to a `.json` file
- Fully responsive, no dependencies, no build step

## Run it locally
Just open `index.html` in a browser — no server or install needed.

## Deploy it for free (GitHub Pages)
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to your main branch, root folder
4. Your tracker is live at `https://<your-username>.github.io/<repo-name>/`

## Persisting data
By default entries live only for your current browser session (export to
JSON to save your data). To make entries persist automatically between
visits, see the commented-out `localStorage` snippet at the bottom of
`script.js` — uncomment it once you're hosting the page yourself.

## Ideas to extend it
- Filter entries by category or date range
- Monthly spending chart (e.g. with Chart.js)
- Import a previously exported JSON file
- Recurring entries (rent, subscriptions)

## Stack
Plain HTML, CSS, and JavaScript. No frameworks, no build tools — clone and go.
