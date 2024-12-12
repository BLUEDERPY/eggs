import { Grid, Typography } from "@mui/material";
import BorrowWidget from "../BorrowComponents/BorrowWidget";

const BorrowPage = () => {
  return (
    <>
      <Grid item xs={12} alignSelf={"center"}>
        <Typography padding={1} align="center" variant="h5">
          {" "}
          BORROW
        </Typography>
        <Typography variant="subtitle1"> BUY, LOCK, BORROW, REPEAT </Typography>
      </Grid>

      <Grid item xs={12}>
        <BorrowWidget />
      </Grid>
    </>
  );
};

export default BorrowPage;
