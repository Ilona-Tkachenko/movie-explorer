import { searchTmdb } from "../services/tmdbService";

export const searchResolver = {
search: async (_parent: unknown, args: { query: string }) => {
    const query = args.query.trim();

    if (!query) {
    return [];
    }

    const results = await searchTmdb(query);

    return results
    .filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv",
    )
    .map((item: any) => {
        const title = item.title || item.name || "No title";

        const date = item.release_date || item.first_air_date || null;
        const year = date ? date.slice(0, 4) : null;

        const posterUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null;

        return {
        id: String(item.id),
        title,
        year,
        rating: item.vote_average ?? null,
        posterUrl,
        mediaType: item.media_type,
        };
    });
},
};
