import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";

export default function App() {
  const location = useLocation();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0f172a" }}>
      <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700}>
            Movie Explorer
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{
                backgroundColor:
                  location.pathname === "/" ? "#1e293b" : "transparent",
                color: "#e2e8f0",
                "&:hover": {
                  backgroundColor: "#465871",
                },
              }}
            >
              SEARCH
            </Button>

            <Button
              component={Link}
              to="/watchlist"
              variant="contained"
              sx={{
                backgroundColor:
                  location.pathname === "/watchlist"
                    ? "#1e293b"
                    : "transparent",
                color: "#e2e8f0",
                "&:hover": {
                  backgroundColor: "#465871",
                },
              }}
            >
              WATCHLIST
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

