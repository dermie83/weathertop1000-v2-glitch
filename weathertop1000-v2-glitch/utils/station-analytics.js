export const stationAnalytics = {
  
  getMinReading(stationReadings) {
  let readingMin = Math.min(...stationReadings);
    return readingMin;
  },
  
  getMaxReading(stationReadings) {
    let maxReading = Math.max(...stationReadings);
      return maxReading;
    },
  
  checkReadingTrend(readings) {
    if (readings.length >= 3) {
      if (
        readings[readings.length - 1] > readings[readings.length - 2] &&
        readings[readings.length - 2] > readings[readings.length - 3]
      ) {
        return "Increasing";
      } else if (
        readings[readings.length - 1] < readings[readings.length - 2] &&
        readings[readings.length - 2] < readings[readings.length - 3]
      ) {
        return "Decreasing";
      } else {
        return "Steady";
      }
    } else {
      return "No Trend Yet";
    }
  },
  
  
};