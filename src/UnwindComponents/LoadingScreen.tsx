import { Typography, Button, Stack } from "@mui/material";
import { GlobalContext } from "../providers/global-provider";
import { useContext, useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useWriteContract } from "wagmi";

const LoadingScreen = () => {
  const { status, message, setStatus } = useContext(GlobalContext);
  const { reset } = useWriteContract();

  const click = () => {
    setStatus("NONE", "");
    reset;
  };

  const [isErrorOrSuccess, setIsErrorOrSuccess] = useState(false);

  useEffect(() => {
    if (status == "ERROR" || status == "SUCCESS") {
      setIsErrorOrSuccess(true);
    } else {
      setIsErrorOrSuccess(false);
    }
  }, [status]);

  return (
    <>
      <Stack alignItems="center">
        {message != "" && (
          <Typography pb="120px" variant="h5">
            {" "}
            {message}{" "}
          </Typography>
        )}
        {!isErrorOrSuccess && <HashLoader color="#1876d1" size={80} />}
        {status == "ERROR" && (
          <Button fullWidth variant="contained" onClick={click}>
            {" "}
            Reset Transaction{" "}
          </Button>
        )}
      </Stack>
    </>
  );
};

export default LoadingScreen;
