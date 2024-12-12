import { Box, Typography, Link } from "@mui/material";

const PositionsBox = () => {
  return (
    <Box>
      <Typography align="center" variant="subtitle1">
        {" "}
        You do not have an open position{" "}
      </Typography>
      <Typography align="center" variant="subtitle1">
        {" "}
        Go to{" "}
        <Link color="inherit" href="/loop">
          {" "}
          loop
        </Link>{" "}
        to open one{" "}
      </Typography>
    </Box>
  );
};

export default PositionsBox;
