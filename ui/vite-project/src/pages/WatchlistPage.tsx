import { useWatchlist } from "../context/WatchlistContext";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={700} color="#e2e8f0">
          Watchlist
        </Typography>

        {watchlist.length === 0 ? (
          <Alert severity="info">Your watchlist is empty.</Alert>
        ) : (
          <Grid container spacing={3}>
            {watchlist.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
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

                  <CardContent>
                    <Stack spacing={1.5}>
                      <Typography variant="h6" fontWeight={700}>
                        {item.title}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip
                          label={item.year ?? "—"}
                          size="small"
                          sx={{ backgroundColor: "#1e293b", color: "#e2e8f0" }}
                        />
                        <Chip
                          label={item.mediaType}
                          size="small"
                          sx={{ backgroundColor: "#1e293b", color: "#e2e8f0" }}
                        />
                        <Chip
                          label={`${item.rating ?? "—"}`}
                          size="small"
                          sx={{ backgroundColor: "#1e293b", color: "#e2e8f0" }}
                        />
                      </Stack>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeFromWatchlist(item.id)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  );
}

