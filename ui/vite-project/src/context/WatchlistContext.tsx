/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";


export type WatchlistItem = {
id: string;
title: string;
year: string | null;
rating: number | null;
posterUrl: string | null;
mediaType: string;
};

type WatchlistContextType = {
watchlist: WatchlistItem[];
addToWatchlist: (item: WatchlistItem) => void;
removeFromWatchlist: (id: string) => void;
isInWatchlist: (id: string) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(
undefined,
);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
});

useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}, [watchlist]);

const addToWatchlist = (item: WatchlistItem) => {
    const alreadyExists = watchlist.some(
    (watchlistItem) => watchlistItem.id === item.id,
    );

    if (alreadyExists) {
    return;
    }

    setWatchlist((prev) => [...prev, item]);
};

const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
};

const isInWatchlist = (id: string) => {
    return watchlist.some((item) => item.id === id);
};

return (
    <WatchlistContext.Provider
    value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
    }}
    >
    {children}
    </WatchlistContext.Provider>
);
}

export function useWatchlist() {
const context = useContext(WatchlistContext);

if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
}

return context;
}
