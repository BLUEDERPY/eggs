import { Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { ethers } from "ethers";
import useAccountWithBalance from "../hooks/useAccountWithBalance";

const WrapSonic = () => {
  const [isWrapping, setWrapping] = useState(false);

  const { data, isConnected } = useAccountWithBalance();

  const sonicAmount = Number(ethers.formatEther(data?.value || 0));

  const [wrappingAmount, setWrappingAmount] = useState(0);

  const wrapWidths = { xs: 200, sm: 300 };

  const _setWrapAmount = (value: number) => {
    if (value > sonicAmount) setWrappingAmount(sonicAmount);
    else if (value < 0) setWrappingAmount(0);
    else return setWrappingAmount(value);
  };

  return (
    <>
      {!isWrapping && (
        <Button variant="contained" onClick={() => setWrapping(!isWrapping)}>
          {" "}
          Wrap Sonic{" "}
        </Button>
      )}
      {isWrapping && (
        <>
          <Box display="flex" flexDirection="column" alignItems={"center"}>
            <Button
              variant="contained"
              onClick={() => setWrapping(!isWrapping)}
            >
              {" "}
              Close{" "}
            </Button>
            <Typography> Wrap </Typography>
            <Box
              my={2}
              gap={2}
              display="flex"
              flexDirection="column"
              alignItems={"center"}
              sx={{ borderRadius: "16px" }}
              width={wrapWidths}
              height={225}
              padding={2}
            >
              {isConnected && (
                <Typography> SONIC: {sonicAmount.toFixed(2)} </Typography>
              )}
              {!isConnected || sonicAmount === 0 ? (
                <>
                  <TextField
                    value={0}
                    error
                    id="wrap-sonic-error"
                    helperText="You do not have enough SONIC for gas"
                    type="number"
                  >
                    {" "}
                  </TextField>
                  <Button variant="contained" disabled>
                    {" "}
                    wrap{" "}
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    value={wrappingAmount}
                    onChange={(event) =>
                      _setWrapAmount(Number(event.target.value))
                    }
                    type="number"
                  >
                    {" "}
                  </TextField>
                  <Button variant="contained"> wrap </Button>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default WrapSonic;
