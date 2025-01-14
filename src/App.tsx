import { Grid, Box, Divider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnwindPage from "./pages/Unwind";
import LoopPage from "./pages/Loop";
import BorrowPage from "./pages/Borrow";

import HomePage from "./pages/Home";
import { Header } from "./components/Header/Header";

import Navigation from "./components/Header/Navigation";
import { Footer } from "./components/Footer/Footer";
import { BackgroundOverlay } from "./ui/BackgroundOverlay";

export const dynamic = "force-dynamic";

//need to add mainnet vs blast for wrap/bridge
//need to implement approve wsonic button into loop (reapprove if amount is increased)

function App() {
  return (
    <>
      <Router>
        <Box
          sx={{
            minHeight: {
              xs: "calc(100dvh - 156px)",
              sm: "calc(100dvh - 56px)",
            },
            bgcolor: "background.default",
          }}
        >
          <BackgroundOverlay />
          <Header />
          <Box
            sx={{
              bgcolor: "background.paper",
              position: "fixed",
              width: "100%",
              top: { xs: 56, sm: 64 },
              zIndex: 40,
            }}
          >
            <Divider />
            <Navigation />
            <Divider />
          </Box>
          <Grid
            container
            spacing={1}
            pt={"158px"}
            px={0}
            direction="column"
            alignContent={"center"}
            sx={{
              minHeight: {
                xs: "calc(100dvh - 156px)",
                sm: "calc(100dvh - 56px)",
              },
              minWidth: "100dvw",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lending" element={<BorrowPage />} />
              <Route path="/leverage" element={<LoopPage />} />
            </Routes>
          </Grid>
        </Box>
        <Box px={0} alignContent={"center"} style={{ minWidth: "100dvw" }}>
          <Footer />
        </Box>
      </Router>
    </>
  );
}
export default App;
