export function reformatData(data, intervalInSeconds) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Sort data by time to ensure correct grouping
  data.sort((a, b) => a.time - b.time);

  let result = [];
  let currentGroup = {
    time: null,
    open: null,
    high: -Infinity,
    low: Infinity,
    close: null,
  };

  for (let item of data) {
    let groupTime =
      Math.floor(item.time / intervalInSeconds) * intervalInSeconds;

    if (currentGroup.time === null || currentGroup.time !== groupTime) {
      // If this is a new interval, push the previous group (if it exists) to results
      if (currentGroup.time !== null) {
        result.push({ ...currentGroup, close: currentGroup.close });
      }
      // Start a new group
      currentGroup = {
        time: groupTime,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      };
    } else {
      // Update the existing group
      currentGroup.high = Math.max(currentGroup.high, item.high);
      currentGroup.low = Math.min(currentGroup.low, item.low);
      currentGroup.close = Math.max(currentGroup.close, item.close);
      currentGroup.open = Math.min(currentGroup.open, item.open);
    }
  }

  // Add the last group if there's any data left
  if (currentGroup.time !== null) {
    result.push({ ...currentGroup, close: currentGroup.close });
  }

  return result;
}
