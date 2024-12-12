import { Grid, Typography } from "@mui/material";
import Widget from "../LoopComponents/Widget";

const LoopPage = () => {
  return (
    <>
      <Grid item xs={12} alignSelf={"center"}>
        <Typography align="center" variant="h5">
          {" "}
          LOOP{" "}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Widget />
      </Grid>
    </>
  );
};

/*
<Grid item xs={12} alignSelf={"center"}> 
      <WrapSonic> </WrapSonic>
    </Grid>
    <Grid item xs={12} alignSelf={"center"}> 
      <BridgeSonic> </BridgeSonic>
      </Grid> 
 */
export default LoopPage;
