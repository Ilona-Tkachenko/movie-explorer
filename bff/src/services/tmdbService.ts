export async function searchTmdb(query: string) {
const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
    throw new Error("TMDB_API_KEY is missing in .env");
}

const url =
    `https://api.themoviedb.org/3/search/multi` +
    `?api_key=${apiKey}` +
    `&query=${encodeURIComponent(query)}`;

const response = await fetch(url);

if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
}

const data = await response.json();

return data.results;
}
