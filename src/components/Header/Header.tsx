import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  styled,
  Icon,
} from "@mui/material";
import Logo from "../../assets/logo.png";
import { ConnectWallet } from "./ConnectWallet";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.grey[800]}`,
}));

export function Header() {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={"img"} src={Logo} height={50} width={50} />
            <Typography
              variant="h6"
              sx={{ ml: 1, fontWeight: "bold", color: "white" }}
            >
              Eggs Finance
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          <Button
            sx={{
              marginY: "10px",
              height: "35px",
              display: { xs: "none", sm: "flex" },
            }}
            variant="outlined"
            color="primary"
            href="/docs"
          >
            Documentation
          </Button>
          <ConnectWallet />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
