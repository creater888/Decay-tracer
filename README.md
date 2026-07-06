# Decay Tracker — Desktop App

## First time setup (do this once)

### Requirements
- Node.js installed → download from https://nodejs.org (LTS version)

### Steps

1. Extract this folder anywhere on your PC
2. Double-click `START.bat` (Windows) — it installs everything and launches the app
   - OR open terminal inside this folder and run:
     ```
     npm install
     npm start
     ```

## Run it after setup

Just double-click `START.bat` anytime — or run `npm start` in terminal.

## Build a real .exe (optional)

Want a proper installable .exe file you can double-click anywhere?

```
npm run build-win
```

This creates a `dist/` folder with a portable `.exe` — no install needed, just run it.

## Features
- Tracks topics you've learned with a live health decay bar
- Quizzes you when a topic is about to die
- Lives in your system tray
- All data saved locally on your PC
