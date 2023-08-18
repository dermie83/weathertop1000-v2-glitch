import { readingStore } from "../models/reading-store.js";
import { readingConversions } from "../utils/reading-conversions.js";
import { stationAnalytics } from "../utils/station-analytics.js";


export const latestReadings = async (id) => {
  let stationReadings = await readingStore.getReadingsByStationId(id);
  let latestReading = null;
  const reading = {
    latestCode: null,
    latestCodeText: null,
    latestCodeIcon: null,
    latestTimeStamp: null,
    latestTemp: null,
    latestTempFahrenheit: null,
    minTemp: null,
    maxTemp: null,
    trendTemperatureToIcon: null, 
    latestWindSpeed: null,
    latestWindSpeedBFT: null,
    BFTCodeToText: null,
    windSpeedLabel: null,
    minWindSpeed: null,
    maxWindSpeed: null,
    windDirection: null,
    windDirectionText: null,
    windDirectionIcon: null,
    WindChill: null,
    latestPressure: null,
    minPressure: null,
    maxPressure: null,
    trendTemperature: null,
    trendWindSpeed: null,
    trendPressure: null,
  };
  
  if (stationReadings.length > 0) {
    latestReading = stationReadings.length - 1;
    reading.latestCode = stationReadings[latestReading].code;
    reading.latestCodeText = readingConversions.convertWeatherCodeToText(reading.latestCode);
    reading.latestCodeIcon = readingConversions.convertWeatherToIcon(reading.latestCode);
    
    reading.latestTimeStamp = stationReadings[latestReading].timeStamp;
    
    reading.latestTemp = stationReadings[latestReading].temperature;
    reading.latestTempFahrenheit = readingConversions.convertTemp(reading.latestTemp);
    reading.minTemp = stationAnalytics.getMinReading(stationReadings.map((stationReadings) => stationReadings.temperature));
    reading.maxTemp = stationAnalytics.getMaxReading(stationReadings.map((stationReadings) => stationReadings.temperature));
    reading.trendTemperature = stationAnalytics.checkReadingTrend(stationReadings.map((stationReadings) => stationReadings.temperature));
    reading.trendTemperatureToIcon = readingConversions.convertTrendToIcon(reading.trendTemperature);
    
    reading.latestWindSpeed = stationReadings[latestReading].windSpeed;
    reading.latestWindSpeedBFT = readingConversions.convertWindSpeedToBeaufortIndex(reading.latestWindSpeed);
    reading.BFTCodeToText = readingConversions.convertBFTCodeToText(reading.latestWindSpeedBFT)
    reading.minWindSpeed = stationAnalytics.getMinReading(stationReadings.map((stationReadings) => stationReadings.windSpeed));
    reading.maxWindSpeed = stationAnalytics.getMaxReading(stationReadings.map((stationReadings) => stationReadings.windSpeed));
    reading.windDirection = stationReadings[latestReading].windDirection;
    reading.windDirectionText = readingConversions.convertWindDirectionToText(reading.windDirection);
    reading.WindChill = readingConversions.calculateWindChill(reading.latestTemp, reading.latestWindSpeed);
    reading.trendWindSpeed = stationAnalytics.checkReadingTrend(stationReadings.map((stationReadings) => stationReadings.windSpeed));
    reading.trendWindSpeedToIcon = readingConversions.convertTrendToIcon(reading.trendWindSpeed);
    
    reading.latestPressure = stationReadings[latestReading].pressure;
    reading.minPressure = stationAnalytics.getMinReading(stationReadings.map((stationReadings) => stationReadings.pressure));
    reading.maxPressure = stationAnalytics.getMaxReading(stationReadings.map((stationReadings) => stationReadings.pressure));
    reading.trendPressure = stationAnalytics.checkReadingTrend(stationReadings.map((stationReadings) => stationReadings.pressure));
    reading.trendPressureToIcon = readingConversions.convertTrendToIcon(reading.trendPressure);
      
  }
  return {
    latestReading: latestReading,
    reading: reading,
  };
};