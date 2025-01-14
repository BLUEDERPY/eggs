import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Typography,
} from "@mui/material";

interface BorrowActionsProps {
  isValid: boolean;
  errorMessage: string;
  onBorrow: () => Promise<void>;
}

export const BorrowActions: React.FC<BorrowActionsProps> = ({
  isValid,
  errorMessage,
  onBorrow,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = async () => {
    setConfirmOpen(false);
    await onBorrow();
  };

  return (
    <>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Button
        variant="contained"
        fullWidth
        disabled={!isValid}
        onClick={() => setConfirmOpen(true)}
      >
        Borrow SONIC
      </Button>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Borrow</DialogTitle>
        <DialogContent>
          <Typography>
            Please confirm that you want to proceed with this borrowing
            position. Make sure you understand the risks involved.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm Borrow
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
