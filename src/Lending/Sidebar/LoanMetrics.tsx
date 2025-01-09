import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  Button,
} from "@mui/material";
import { formatCurrency, nFormatter } from "../../utils/formatters";
import useLoanByAddress from "../../hooks/useLoanByAddress";
import useEggsToSonic from "../../hooks/useEggsToSonic";
import { formatEther, parseEther } from "viem";
import { TrendingUp, Clock, Settings } from "lucide-react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useVisibilityChange } from "@uidotdev/usehooks";
import chroma from "chroma-js";
import useRefresh from "../../hooks/useRefresh";
import useSonicToEggs from "../../hooks/useSonicToEggs";

const WS_URL = "wss://eggs-64815067aa3c.herokuapp.com/"; // "ws://localhost:8000";

export const LoanMetrics: React.FC = () => {
  const theme = useTheme();

  const { data: loanData } = useLoanByAddress();

  const { data: _conversionRate, isSuccess } = useRefresh(
    loanData ? loanData[0] : parseEther("0")
  );
  const { data: covert } = useEggsToSonic();
  const _conversionRate2 =
    (covert && loanData ? covert * loanData[0] : parseEther("0")) /
    parseEther("1");

  const [conversionRate, setConversionRate] = useState(undefined);

  useEffect(() => {
    console.log(_conversionRate);
    if (!conversionRate) {
      setConversionRate(_conversionRate2);
    }
    if (_conversionRate) {
      setConversionRate(_conversionRate);
    }
  }, [_conversionRate, _conversionRate2, conversionRate]);

  console.log(_conversionRate2);

  // Calculate values
  const collateralEggs = loanData ? Number(formatEther(loanData[0])) : 0;
  const borrowedSonic = loanData ? Number(formatEther(loanData[1])) : 0;
  const borrowedSonicRaw = loanData ? loanData[1] : 0;
  //// console.log(conversionRate);
  //// console.log(borrowedSonicRaw);
  //console.log(isSuccess);
  const positionValue =
    conversionRate && borrowedSonicRaw
      ? Number(formatEther(conversionRate - borrowedSonicRaw))
      : 0;

  // Calculate health factor (collateral ratio)

  // Format expiration date
  const expirationDate = loanData
    ? new Date(Number(loanData[2]) * 1000).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }) +
      " " +
      new Date(Number(loanData[2]) * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--/--/----";

  function dateDiff(date1) {
    const msDiff = date1.getTime() - new Date().getTime();
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (msDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.round(((msDiff % 86400000) % 3600000) / 60000);
    return { days, hours, minutes };
  }

  const healthFactor = loanData
    ? dateDiff(new Date(Number(loanData[2]) * 1000))
    : { days: 0, hours: 0, minutes: 0 };
  // ////console.log(healthFactor.minutes);

  const scale = chroma
    .scale([
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.success.main,
    ])
    .domain([0, 30, 365]);

  const healthColor = scale(healthFactor.days).hex();

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 3,
      }}
    >
      {/* Position Value */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Position Value
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {positionValue < 1
            ? positionValue.toFixed(4)
            : nFormatter(positionValue, 4)}{" "}
          SONIC
        </Typography>
      </Box>

      {/* Health Factor Indicator */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={
              ((365 * 24 - (healthFactor.days * 24 + healthFactor.hours)) /
                (365 * 24)) *
              100
            }
            size={80}
            thickness={4}
            sx={{ color: healthColor }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {healthFactor.days > 0
                ? `${healthFactor.days} Days`
                : `${healthFactor.hours} Hrs`}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {healthFactor.days > 0
                ? `${healthFactor.hours} Hrs`
                : `${healthFactor.minutes} Mins`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <MetricSection
        icon={<TrendingUp size={20} />}
        items={[
          {
            label: "Total Collateral",
            value: `${nFormatter(collateralEggs, 2)} EGGS`,
          },
          {
            label: "Borrowed Amount",
            value: `${nFormatter(borrowedSonic, 2)} SONIC`,
          },
        ]}
      />

      <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
        <MetricSection
          icon={<Clock size={20} />}
          items={[{ label: "Expires", value: expirationDate }]}
        />
      </Box>
    </Box>
  );
};

interface MetricSectionProps {
  icon: React.ReactNode;
  items: Array<{ label: string; value: string }>;
}

const MetricSection: React.FC<MetricSectionProps> = ({ icon, items }) => (
  <Box>
    {items.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          "&:last-child": { mb: 0 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {index === 0 && icon}
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {item.value}
        </Typography>
      </Box>
    ))}
  </Box>
);
