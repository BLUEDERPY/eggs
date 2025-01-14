import { Grid, Typography } from "@mui/material";

import LoanWidget from "../components/UnwindWidget";

const UnwindPage = () => {
  return (
    <>
      <Grid item xs={12} alignSelf={"center"}>
        <Typography padding={1} align="center" variant="h5">
          {" "}
          UNWIND{" "}
        </Typography>
        <Typography variant="subtitle1"> FROM ZE GRIND </Typography>
      </Grid>

      <Grid item xs={12} alignSelf={"center"}>
        <LoanWidget />
      </Grid>
    </>
  );
};

export default UnwindPage;
