/**
 * This class handles the analytics
 *
 */
export const stationAnalytics = {
  
  /**
   * This method gets the minimum reading
   * for any reading type in the reading array
   * 
   * @param stationReadings 
   * 
   * @return minreading
   */
  getMinReading(stationReadings) {
  let readingMin = Math.min(...stationReadings);
    return readingMin;
  },
  
  /**
   * This method gets the maximum reading
   * for any reading type in the reading array
   * 
   * @param stationReadings 
   * 
   * @return maxreading
   */
  getMaxReading(stationReadings) {
    let maxReading = Math.max(...stationReadings);
      return maxReading;
    },
  
    /**
   * This method checks the reading type lastest trends
   * in the reading array 
   * 
   * @param readings
   * 
   * @return string
   */
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