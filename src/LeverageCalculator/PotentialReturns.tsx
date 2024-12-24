import React, { useState } from "react";
import { Box, Stack, Typography, Slider, LinearProgress } from "@mui/material";
import { nFormatter } from "../utils/formatters";
import { TrendingUp } from "lucide-react";
import chroma from "chroma-js";

interface PotentialReturnsProps {
  scenarios: Array<{
    label: string;
    profit: number;
    roi: number;
  }>;
  borrowAmount: Number;
  leverageX: Number;
  fee: Number;
}

export const PotentialReturns = ({
  scenarios,
  leverageX,
  borrowAmount,
  fee,
}: PotentialReturnsProps) => {
  const [priceIncrease, setPriceIncrease] = useState(100);
  const leveragePercentage = scenarios[2].roi / 100; // Calculate leverage from 100% scenario

  // Create color scale
  const colorScale = chroma
    .scale(["#ef5350", "#ffb74d", "#66bb6a"])
    .mode("lch");

  // Calculate custom scenario based on slider
  const customScenario =
    scenarios.find((s) => Number(s.label.replace("%", "")) >= priceIncrease) ||
    scenarios[2];

  const scaledProfit = borrowAmount * (priceIncrease / 100) - fee;
  const scaledROI = (borrowAmount * (priceIncrease / 100)) / fee;
  return (
    <Box sx={{ p: 3, pt: 6, minWidth: "100%" }}>
      <Stack spacing={4}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Leverage
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {leverageX ? leverageX.toFixed(2) + "X" : "--"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Position Multiplier
          </Typography>
        </Box>

        <Box>
          <Typography gutterBottom>Price Increase: {priceIncrease}%</Typography>
          <Slider
            value={priceIncrease}
            onChange={(_, value) => setPriceIncrease(value as number)}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            sx={{
              "& .MuiSlider-thumb": {
                backgroundColor: colorScale(priceIncrease / 1000).hex(),
              },
              "& .MuiSlider-track": {
                backgroundColor: colorScale(priceIncrease / 1000).hex(),
              },
            }}
          />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Estimated Return
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: scaledProfit > 0 ? "success.main" : "error.main" }}
          >
            {scaledProfit > 0 ? "+" : ""}
            {nFormatter(scaledProfit, 2)} SONIC
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            ROI: {scaledROI > 0 ? "+" : ""}
            {scaledROI.toFixed(1)}%
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(Math.abs(scaledROI), 1000) / 10}
            sx={{
              height: 8,
              borderRadius: 1,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: colorScale(priceIncrease / 1000).hex(),
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
