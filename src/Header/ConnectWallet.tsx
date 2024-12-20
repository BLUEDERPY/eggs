import { Button } from "@mui/material";
import { Wallet } from "lucide-react";
import { ConnectKitButton } from "connectkit";

export const ConnectWallet = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <>
            <Button
              onClick={show}
              variant="contained"
              color="primary"
              startIcon={<Wallet size={16} />}
              sx={{
                py: 0,
                marginY: "10px",
                height: "35px",
                display: { xs: "none", sm: "flex" },

                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "background.paper",
                },
              }}
            >
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </Button>
            <Button
              onClick={show}
              variant="contained"
              color="primary"
              sx={{
                p: "0 !important",

                display: { xs: "flex", sm: "none" },
                position: "fixed",
                right: "10px",
                minWidth: 50,
                top: "8px",
                height: 40,
                width: 30,

                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "background.paper",
                },
              }}
            >
              <Wallet size={24} />
            </Button>
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
