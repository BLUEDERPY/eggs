import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../providers/global-provider";
import useAccountWithBalance from "../hooks/useAccountWithBalance";

export interface Props {
  eggsAmount: number;
  setEggsAmount: (val: number) => void;
}

const EggsDeposit = (props: Props) => {
  //const {data} = useAccountWithBalance();

  //const sonicAmount = Number(sonicers.formatEther(data?.value || '0'));

  const { balance } = useContext(GlobalContext);
  const { data, isPending } = balance;
  const { eggsAmount, setEggsAmount } = props;
  const { isConnected } = useAccountWithBalance();

  const bal = data ? Number(data).toFixed(2).toString() : "0";

  const _setEggsAmount = (value: number) => {
    if (value > Number(bal)) setEggsAmount(Number(bal));
    else if (value < 0) setEggsAmount(0);
    else return setEggsAmount(value);
  };

  return (
    <Box width={"100%"} alignSelf={"center"}>
      <Stack direction="row" justifyContent={"space-between"}>
        {" "}
        <Typography> Deposit EGGS </Typography>
        {!isConnected ? (
          <Typography> EGGS: -- </Typography>
        ) : isPending ? (
          <Typography> Loading...</Typography>
        ) : (
          <Typography> EGGS: {bal} </Typography>
        )}
      </Stack>
      <FormControl fullWidth>
        <TextField
          type="number"
          value={eggsAmount}
          onChange={(event) => _setEggsAmount(Number(event.target.value))}
        ></TextField>
        {!isConnected ? (
          <Stack direction="row" marginY={1} spacing={1} width={"100%"}>
            <Button
              size="small"
              style={{ borderWidth: "3px" }}
              fullWidth
              disabled
              variant="contained"
              onClick={() => setEggsAmount(Number(bal) * 0.25)}
            >
              {" "}
              <Typography> 25% </Typography>{" "}
            </Button>
            <Button
              size="small"
              style={{ borderWidth: "3px" }}
              fullWidth
              disabled
              variant="contained"
              onClick={() => setEggsAmount(Number(bal) * 0.5)}
            >
              {" "}
              <Typography> 50% </Typography>{" "}
            </Button>
            <Button
              size="small"
              style={{ borderWidth: "3px" }}
              fullWidth
              disabled
              variant="contained"
              onClick={() => setEggsAmount(Number(bal))}
            >
              {" "}
              <Typography> 100% </Typography>
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" marginY={1} spacing={1} width={"100%"}>
            <Button
              style={{ borderWidth: "2px", borderColor: "#87CEEB" }}
              size="small"
              fullWidth
              variant="contained"
              onClick={() => setEggsAmount(Number(bal) * 0.25)}
            >
              {" "}
              <Typography> 25% </Typography>
            </Button>
            <Button
              style={{ borderWidth: "2px", borderColor: "#87CEEB" }}
              size="small"
              fullWidth
              variant="contained"
              onClick={() => setEggsAmount(Number(bal) * 0.5)}
            >
              {" "}
              <Typography> 50% </Typography>{" "}
            </Button>
            <Button
              style={{ borderWidth: "2px", borderColor: "#87CEEB" }}
              size="small"
              fullWidth
              variant="contained"
              onClick={() => setEggsAmount(Number(bal))}
            >
              {" "}
              <Typography> 100% </Typography>{" "}
            </Button>
          </Stack>
        )}
      </FormControl>
    </Box>
  );
};

export default EggsDeposit;
