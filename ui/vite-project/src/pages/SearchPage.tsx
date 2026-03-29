import { useEffect, useRef, useState } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { SearchDocument } from "../generated/graphql";
import { useWatchlist } from "../context/WatchlistContext";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// щоб codegen бачив запит
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query Search($query: String!) {
    search(query: $query) {
      id
      title
      year
      rating
      posterUrl
      mediaType
    }
  }
`;

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const controllerRef = useRef<AbortController | null>(null);

  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const [runSearch, { data, loading, error }] = useLazyQuery(SearchDocument);

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  // запит
  useEffect(() => {
    const trimmedQuery = debouncedValue.trim();
    if (!trimmedQuery) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    runSearch({
      variables: { query: trimmedQuery },
      context: {
        fetchOptions: {
          signal: controller.signal,
        },
      },
    }).catch((err) => {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    });

    return () => controller.abort();
  }, [debouncedValue, runSearch]);

  const items = data?.search ?? [];

  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Start typing..."
          variant="outlined"
          sx={{
            input: { color: "#e2e8f0" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#111827",
              "& fieldset": { borderColor: "#334155" },
              "&:hover fieldset": { borderColor: "#475569" },
            },
          }}
        />

        <Typography variant="h5" fontWeight={700} color="#e2e8f0">
          Search results
        </Typography>

        {debouncedValue.trim() === "" && (
          <Alert severity="info">Start typing to search...</Alert>
        )}

        {loading && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={22} />
            <Typography color="#cbd5e1">Loading...</Typography>
          </Stack>
        )}

        {error && error.name !== "AbortError" && (
          <Alert severity="error">{error.message}</Alert>
        )}

        {!loading &&
          !error &&
          debouncedValue.trim() !== "" &&
          items.length === 0 && <Alert severity="info">Nothing found.</Alert>}

        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#111827",
                  color: "#e2e8f0",
                  border: "1px solid #1f2937",
                  borderRadius: 3,
                }}
              >
                {item.posterUrl && (
                  <CardMedia
                    component="img"
                    height="320"
                    image={item.posterUrl}
                    alt={item.title}
                  />
                )}

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip
                        label={item.year ?? "—"}
                        size="small"
                        sx={{
                          backgroundColor: "#1e293b",
                          color: "#e2e8f0",
                        }}
                      />
                      <Chip
                        label={item.mediaType}
                        size="small"
                        sx={{
                          backgroundColor: "#1e293b",
                          color: "#e2e8f0",
                        }}
                      />
                      <Chip
                        label={`${item.rating ?? "—"}`}
                        size="small"
                        sx={{
                          backgroundColor: "#1e293b",
                          color: "#e2e8f0",
                        }}
                      />
                    </Stack>
                  </Stack>

                  <Box mt="auto">
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={isInWatchlist(item.id)}
                      onClick={() =>
                        addToWatchlist({
                          id: item.id,
                          title: item.title,
                          year: item.year ?? null,
                          rating: item.rating ?? null,
                          posterUrl: item.posterUrl ?? null,
                          mediaType: item.mediaType,
                        })
                      }
                      sx={{
                        mt: 2,
                        backgroundColor: isInWatchlist(item.id)
                          ? "#16a34a"
                          : "#2563eb",
                        "&:hover": {
                          backgroundColor: isInWatchlist(item.id)
                            ? "#15803d"
                            : "#1d4ed8",
                        },
                        color: "#fff",
                        fontWeight: 600,
                        "&.Mui-disabled": {
                          backgroundColor: "#16a34a",
                          color: "#ffffff",
                          opacity: 1,
                        },
                      }}
                    >
                      {isInWatchlist(item.id) ? "Added" : "Add to watchlist"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}



