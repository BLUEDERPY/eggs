import Slider from "@mui/material/Slider";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const LoopSlider = () => {
  const [currentValue, setCurrentValue] = useState<number>(1);
  const minLoop = 1;
  const maxLoop = 69;

  const handleChange = (_: Event, newValue: number | number[]) => {
    setCurrentValue(newValue as number);
  };

  return (
    <>
      <Box width={"100%"}>
        <Typography> {"Number of LOOPS: " + currentValue} </Typography>
        <Stack
          spacing={1}
          direction="row"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography>{minLoop}</Typography>
          <Slider
            defaultValue={1}
            min={minLoop}
            max={maxLoop}
            step={1}
            size="small"
            value={currentValue}
            onChange={handleChange}
          />
          <Typography>{maxLoop}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default LoopSlider;
