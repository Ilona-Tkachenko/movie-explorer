# Movie Explorer

Movie Explorer is a full-stack test project for searching movies and TV shows using the TMDB API.

## Live Demo

Frontend: https://movie-explorer-five-bay.vercel.app
Backend: https://movie-explorer-production-fe97.up.railway.app

---

## Features

- Search movies and TV shows by title
- Debounced search input
- Cancel previous request when a new search starts
- Loading, error, and empty states
- Add items to watchlist
- Remove items from watchlist
- Watchlist persisted in localStorage
- Separate Search and Watchlist pages
- GraphQL BFF between UI and TMDB REST API
- GraphQL Code Generator configured

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Apollo Client
- React Router
- MUI

### Backend
- Node.js
- TypeScript
- Apollo Server
- GraphQL
- TMDB REST API

---

## Architecture

UI → GraphQL BFF → TMDB REST API

The frontend does not call TMDB directly.  
The BFF fetches data from TMDB and returns only the data required by the UI.

---

## Project Structure


movie-explorer/
bff/
src/
ui/
vite-project/
src/
README.md


---

## Requirements

- Node.js
- npm
- TMDB API key

---

## TMDB API Key Setup

1. Create a TMDB account and generate an API key.
2. Inside the `bff` folder, create a `.env` file.
3. Add the following:

```env
PORT=4000
TMDB_API_KEY=your_tmdb_api_key_here
Installation
Backend
cd bff
npm install
Frontend
cd ui/vite-project
npm install
Run the Project
Start backend
cd bff
npm run dev

Backend will run at:
http://localhost:4000/

Start frontend
cd ui/vite-project
npm run dev

Frontend will run at:
http://localhost:5173/

GraphQL Codegen
cd ui/vite-project
npx graphql-codegen
Pages
Search
Search movies and TV shows
Debounced input
Request cancellation
Loading, error, and empty states
Add to watchlist
Watchlist
View saved titles
Remove saved titles
Stored in localStorage
Notes
Only movie and TV results are displayed
Watchlist is stored locally in the browser
Frontend communicates only with the BFF
GraphQL Code Generator is used
Deployment
Frontend → Vercel
Backend → Railway

Author
Ilona Tkachenko