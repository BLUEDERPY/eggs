import React from "react";
import { Box } from "@mui/material";
import { AnimatedEgg } from "./AnimatedEgg";
import { createGridPositions } from "../utils/gridUtils";

export const BackgroundOverlay = () => {
  // Create a 6x4 grid for 24 eggs
  const gridPositions = createGridPositions(6, 4);

  // Create three different sizes for visual hierarchy
  const sizes = [32, 48, 64];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {gridPositions.map((position, index) => (
        <AnimatedEgg
          key={index}
          position={position}
          size={sizes[index % sizes.length]}
          color="#fc9c04"
          delay={index * 0.2}
        />
      ))}
    </Box>
  );
};
