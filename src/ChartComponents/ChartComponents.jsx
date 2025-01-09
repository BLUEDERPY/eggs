import Card from "@mui/material/Card/Card";
import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Button, ButtonGroup, useMediaQuery } from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useVisibilityChange } from "@uidotdev/usehooks";

import { useTheme } from "@mui/material/styles";
const WS_URL = "wss://eggs-64815067aa3c.herokuapp.com/"; // "ws://localhost:8000"; //"wss://eggs-64815067aa3c.herokuapp.com/"; //
import { reformatData } from "./FormatData";

export const ChartComponent = (props) => {
  const xs = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const documentVisible = useVisibilityChange();

  const [ready, setReady] = useState(0);

  const wS_URL =
    (!documentVisible && ready === 1) || documentVisible ? WS_URL : "wss://";
  // ////console.log((!documentVisible && ready === 1) || documentVisible);

  const { lastMessage, readyState } = useWebSocket(wS_URL, {
    share: true,

    shouldReconnect: () => {
      return documentVisible;
    },

    heartbeat: true,
  });

  useEffect(() => {
    setReady(readyState);
  }, [readyState]);

  const [series, setSeries] = useState(null);
  const [chart, setChart] = useState(null);
  const [updatedata, setData] = useState([]);
  const chartContainerRef = useRef();
  const [candelSize, setCandleSize] = useState(60);
  const setChartInterval = useCallback(
    (interval) => {
      const _data = reformatData(updatedata, interval);
      series.setData(_data);

      chart.timeScale().fitContent();
      setCandleSize(interval);
    },
    [updatedata, chart, series]
  );
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;
  useEffect(() => {
    if (series && chart && lastMessage && lastMessage.data !== "ping") {
      const rawData = JSON.parse(lastMessage.data).data;

      //const val = _data[candelSize][0];

      if (rawData.length > 1) {
        const _data = reformatData(rawData, candelSize);
        series.setData(_data);

        ready === 1 &&
          setData((data) => {
            if (data.length === 0) {
              chart.timeScale().fitContent();
              return rawData;
            } else {
              return data;
            }
          });
      }
    }
  }, [series, chart, lastMessage, candelSize, ready]);
  useEffect(() => {
    if (series && chart && lastMessage && lastMessage.data !== "ping") {
      const rawData = JSON.parse(lastMessage.data).data;

      //const val = _data[candelSize][0];

      if (rawData.length === 1 && updatedata.length > 0) {
        if (
          rawData[0].high != updatedata[updatedata.length - 1].high ||
          rawData[0].time > updatedata[updatedata.length - 1].time
        ) {
          try {
            let _newData = updatedata;
            _newData[_newData.length - 1] = rawData[0];
            const __data = reformatData(_newData, candelSize);
            series?.update(__data[__data.length - 1]);
            setData((s) => [...s, rawData[0]]);
          } catch {
            // ////console.log("Chart Lag");
          }
        }
      }

      //series?.update(val);
    }
  }, [series, chart, lastMessage, updatedata, candelSize]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#222" },
        textColor: "#DDD",
        borderRadius: "10px",
      },

      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartContainerRef.current.clientWidth,
      height: xs
        ? window.innerHeight - 410
        : window.innerHeight - 432 > 406
        ? window.innerHeight - 432
        : 406,
    });
    chart.timeScale().applyOptions({
      barSpacing: 10,
      timeVisible: true,
    });

    const series = chart.addCandlestickSeries({
      upColor: theme.palette.primary.main,
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: theme.palette.primary.main,
      wickDownColor: "#ef5350",
      priceFormat: {
        minMove: 0.0000001,
        precision: 7,
      },
    });

    // simulate real-time data
    setSeries(series);
    setChart(chart);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, []);
  const candleRanges = [
    { text: "1m", time: 1 * 60 },
    { text: "5m", time: 5 * 60 },
    { text: "30m", time: 30 * 60 },
    { text: "1h", time: 60 * 60 },
    { text: "4h", time: 4 * 60 * 60 },
    { text: "1D", time: 60 * 60 * 24 },
    { text: "1W", time: 60 * 60 * 24 * 7 },
    { text: "1M", time: 60 * 60 * 24 * 30 },
  ];

  return (
    <Card
      sx={{
        width: {
          xs: "calc(100dvw - 10px)",
          sm: "600px",
          md: "500px",
          lg: "700px",
          xl: "900px",
        },
        borderRadius: { sm: "16px" },
        position: "relative",
      }}
    >
      <Box
        ref={chartContainerRef}
        borderRadius={"8px"}
        overflow={"hidden"}
        border={"1px solid #555"}
      />
      <Box sx={{ position: "absolute", top: "35px", left: "35px", zIndex: 10 }}>
        {!xs && (
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            {candleRanges.map((range) => (
              <Button
                sx={{
                  background:
                    range.time === candelSize ? "#161616 !important" : "",
                }}
                onClick={() => {
                  setChartInterval(range.time);
                }}
              >
                {range.text}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>
    </Card>
  );
};
