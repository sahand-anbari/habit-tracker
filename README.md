# Habit Tracker

A simple daily habit tracker built with React. Add habits, mark them done for today, and keep your progress in the browser.

## Features

- Add and delete habits
- Check / uncheck completion for **today**
- Habits stay saved after refresh (localStorage)
- Empty add blocked (button disabled + trim guard)
- Empty list message (“No habits yet”)
- Lightweight UI with Tailwind-style utility classes

## Tech stack

- React (Vite)
- React Hooks (useState, useEffect)
- Browser localStorage

## Getting started

### Requirements

- Node.js (18+ recommended; 22 LTS is a safe choice)
- npm

### Install and run

    npm install
    npm run dev

Open the URL Vite prints (usually http://localhost:5173).

### Build for production

    npm run build
    npm run preview

## How it works

Each habit looks like:

    {
      "id": 1710000000000,
      "name": "Read 20 minutes",
      "completedDates": ["2026-08-21"]
    }

- **id** — created with Date.now()
- **name** — habit label
- **completedDates** — list of days (YYYY-MM-DD) you completed it

Toggling today’s checkbox adds or removes today’s date from that list. The full habits array is written to localStorage under the key `saved` whenever it changes.

## Project structure

    src/
      App.jsx
      main.jsx
    index.html
    package.json

## Notes

- Today is derived with toISOString().split('T')[0] (UTC date). Near midnight in some timezones this can differ from the local calendar day.
- Data never leaves your browser; clearing site data wipes habits.
- No backend, auth, or sync between devices.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## License

Personal / learning project — use and change freely.