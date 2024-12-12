//@ts-expect-error
import { ChartComponent } from "../ChartComponents/ChartComponents";
import { Grid, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Grid item xs={12} alignSelf={"center"}>
        <Typography padding={1} align="center" variant="h5">
          {" "}
          LOOP{" "}
        </Typography>
      </Grid>

      <Grid item xs={12} mb={"30px"}>
        <ChartComponent data={{}}></ChartComponent>
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
export default HomePage;
