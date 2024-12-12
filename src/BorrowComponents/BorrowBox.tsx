import { Box, Typography, TextField } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../providers/global-provider";
import useEggsToSonic from "../hooks/useEggsToSonic";

interface Props {
  sonicBorrow: number;
  setSonicBorrow: (amt: number) => void;
}

const BorrowBox = ({ sonicBorrow, setSonicBorrow }: Props) => {
  const { balance } = useContext(GlobalContext);
  const { data: eggsData } = balance;

  const eggsBal = eggsData ? Number(eggsData).toFixed(2).toString() : "0";

  const { data } = useEggsToSonic(eggsBal);

  const bal = data ? Number(data).toFixed(2).toString() : "0";

  const borrowBoxRestrictions = (value: number) => {
    if (value < 0) setSonicBorrow(0);
    else if (value > Number(bal) * 0.95) setSonicBorrow(Number(bal) * 0.95);
    else setSonicBorrow(value);
  };

  return (
    <Box width="300">
      <Typography> Borrow SONIC </Typography>
      <TextField
        type="number"
        value={sonicBorrow}
        fullWidth
        onChange={(event) => borrowBoxRestrictions(Number(event.target.value))}
      ></TextField>
    </Box>
  );
};

export default BorrowBox;
