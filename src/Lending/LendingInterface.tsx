import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BorrowInputs } from "./BorrowInputs";
import { CollateralDisplay } from "./CollateralDisplay";
import { FeesDisplay } from "./FeesDisplay";
import { BorrowActions } from "./BorrowActions";
import { useLendingState } from "./hooks/useLendingState";
import LoadingScreen from "../UnwindComponents/LoadingScreen";
import { LoanMetrics } from "./Sidebar/LoanMetrics";
import useLoanByAddress from "../hooks/useLoanByAddress";
import { formatEther } from "viem";
import theme from "../themes";
import { AlertTriangle } from "lucide-react";
import { LendingTabs } from "./LendingTabs";

export const LendingInterface: React.FC = () => {
  const {
    borrowAmount,
    setBorrowAmount,
    duration,
    setDuration,
    collateralRequired,
    fees,
    isValid,
    errorMessage,
    handleMaxBorrow,
    handleBorrow,
    isTransactionOccuring,
    balance,
    onRepay,
    onExtend,
    onClose,
  } = useLendingState();
  const { data: loanData } = useLoanByAddress();

  const borrowedSonic = loanData ? Number(formatEther(loanData[1])) : 0;

  const hasPosition = borrowedSonic > 0;

  const [extendDays, setExtendDays] = useState(7);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const handleExtendChange = (_: Event, newValue: number | number[]) => {
    setExtendDays(newValue as number);
  };

  return (
    <Card
      sx={{
        p: 0,
        width: {
          xs: "calc(100dvw - 30px)",
          sm: "450px",
          md: hasPosition ? "800px" : "450px",
        },
        borderRadius: { sm: "16px" },
        minHeight: "500px",
        position: "relative",
      }}
    >
      {!hasPosition ? (
        isTransactionOccuring ? (
          <Box p="20px">
            <LoadingScreen />
          </Box>
        ) : (
          <Stack
            sx={{
              py: { xs: "24px", sm: 4, md: 6 },
              px: { xs: "24px", sm: 6, md: 8 },
            }}
            spacing={3}
          >
            <BorrowInputs
              borrowAmount={borrowAmount}
              setBorrowAmount={setBorrowAmount}
              duration={duration}
              setDuration={setDuration}
              onMaxClick={handleMaxBorrow}
              balance={balance}
            />
            <Box>
              <CollateralDisplay
                collateralRequired={collateralRequired || 0}
                borrowAmount={borrowAmount}
              />

              <FeesDisplay fees={fees} duration={duration} />
            </Box>
            <BorrowActions
              isValid={isValid}
              errorMessage={errorMessage}
              onBorrow={handleBorrow}
            />
          </Stack>
        )
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
            gap: 0,
          }}
        >
          {/* Borrow More Section */}

          <LendingTabs />

          {/* Close Position Dialog */}
          <Dialog
            open={showCloseDialog}
            onClose={() => setShowCloseDialog(false)}
          >
            <DialogTitle>Confirm Close Position</DialogTitle>
            <DialogContent>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Closing your position will incur a 1% fee on the total position
                value.
              </Alert>
              <Typography>
                Are you sure you want to close your position? This action cannot
                be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowCloseDialog(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  onClose();
                  setShowCloseDialog(false);
                }}
                color="error"
                variant="contained"
              >
                Close Position
              </Button>
            </DialogActions>
          </Dialog>

          <Box
            sx={{
              //borderLeft: { xs: "none", md: 1 },
              //borderTop: { xs: 1, md: "none" },
              //borderRadius: { sm: "0 16px 16px 0" },
              //m: "1px",
              //borderColor: `${theme.palette.primary.dark} !important`,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
              px: { xs: 0, sm: 4, md: 2 },
              pt: { xs: 3, md: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <LoanMetrics />
          </Box>
        </Box>
      )}
    </Card>
  );
};
