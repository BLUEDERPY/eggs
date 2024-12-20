import { Box, Typography, TextField } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../providers/global-provider";
import useEggsToSonic from "../hooks/useEggsToSonic";
import useSonicToEggs from "../hooks/useSonicToEggs";

interface Props {
  sonicBorrow: number;
  setSonicBorrow: (amt: number) => void;
}

const BorrowBox = ({ sonicBorrow, setSonicBorrow }: Props) => {
  const { balance } = useContext(GlobalContext);
  const { data: eggsData } = balance;

  const eggsBal = eggsData ? Number(eggsData).toFixed(2).toString() : "0";

  const { data: max } = useEggsToSonic(eggsBal);

  const { data } = useSonicToEggs(Number(sonicBorrow).toFixed(2).toString());

  const bal = max ? Number(max).toFixed(2).toString() : "0";

  const borrowBoxRestrictions = (value: number) => {
    if (value < 0) setSonicBorrow(0);
    else if (value > Number(bal) * 0.99) setSonicBorrow(Number(bal) * 0.99);
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
      <Typography> EGGs Collateral required: {data}</Typography>
    </Box>
  );
};

export default BorrowBox;
