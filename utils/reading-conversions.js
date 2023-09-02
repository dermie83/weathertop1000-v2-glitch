/**
 * This class handles things related to the reading conversions
 *
 */
export const readingConversions = {
    
   /**
     * This method converts celsius temp to fahrenheit temp
     * @param celsius
     * 
     *  @return rounded number
     */
  convertTemp(celsius) {
    const fahrenheitTemp =((celsius*9)/5)+32;
    return Math.round(fahrenheitTemp);
  },

   /**
     * This method floors the weathercode number to the nearest hundreth
     * @param code
     * 
     * @return integer
     */
  roundDownWeatherCode(code){
    const nearestHundred = Math.floor(code/100)*100;
    return nearestHundred;
  },
  
   /**
     * This method converts the weathercode to a descriptive text
     * @param latestWeatherCode
     * 
     * @return string
     */
  convertWeatherCodeToText(latestWeatherCode) {

        switch (latestWeatherCode) {
            case 100:
                return "Clear";
            case 200:
                return "Partial Clouds";
            case 300:
                return "Cloudy";
            case 400:
                return "Light Showers";
            case 500:
                return "Heavy Showers";
            case 600:
                return "Rain";
            case 700:
                return "Snow";
            case 800:
                return "Thunder";
            default:
                return "No Code Number";
        }

    },
  
    /**
     * This method converts the weathercode to a svg icon
     * @param latestWeatherCode
     * 
     * @return svg icon
     */
  convertWeatherToIcon(latestWeatherCode) {

        switch (latestWeatherCode) {
            case 100:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-800.svg?v=1690975955616";
            case 200:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-801.svg?v=1690975953124";
            case 300:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-804.svg?v=1690975954603";
            case 400:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-520.svg?v=1690975917468";
            case 500:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-522.svg?v=1690975918393";
            case 600:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-501.svg?v=1690975922765";
            case 700:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-600.svg?v=1690975938579";
            case 800:
                return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-211.svg?v=1690975903178";
            default:
                return "No Icon";
        }

    },
  
    /**
     * This method converts the windspeed range to an index integer
     * @param windSpeed
     * 
     *  @return integer
     */
  convertWindSpeedToBeaufortIndex(windSpeed) {

        if (windSpeed == 1)
        {
            return 0;
        }
        else if ((windSpeed > 1) && (windSpeed <= 5))
        {
            return 1;
        }
        else if ((windSpeed > 5) && (windSpeed <= 11))
        {
            return 2;
        }
        else if ((windSpeed > 11) && (windSpeed <= 19))
        {
            return 3;
        }
        else if ((windSpeed > 19) && (windSpeed <= 28))
        {
            return 4;
        }
        else if ((windSpeed > 28) && (windSpeed <= 38))
        {
            return 5;
        }
        else if ((windSpeed > 38) && (windSpeed <= 49))
        {
            return 6;
        }
        else if ((windSpeed > 49) && (windSpeed <= 61))
        {
            return 7;
        }
        else if ((windSpeed > 61) && (windSpeed <= 74))
        {
            return 8;
        }
        else if ((windSpeed > 74) && (windSpeed <= 88))
        {
            return 9;
        }
        else if ((windSpeed > 88) && (windSpeed <= 102))
        {
            return 10;
        }
        else if ((windSpeed > 102) && (windSpeed <= 117))
        {
            return 11;
        }
        else
        {
            return -1;
        }
    },
  
    /**
     * This method converts the beaufort code index to descriptive text
     * @param bftCode 
     * 
     *  @return string
     */
  convertBFTCodeToText(bftCode) {

        switch (bftCode) {
            case 0:
                return "Calm";
            case 1:
                return "Light Air";
            case 2:
                return "Light Breeze";
            case 3:
                return "Gentle Breeze";
            case 4:
                return "Moderate Breeze";
            case 5:
                return "Fresh Breeze";
            case 6:
                return "Strong Breeze";
            case 7:
                return "Near Gale";
            case 8:
                return "Gale";
            case 9:
                return "Severe Gale";
            case 10:
                return "Strong Storm";
            case 11:
                return "Violent Storm";
            default:
                return "No wind conditions";
        }
    },
  
    /**
     * This method calculates windchill
     * Takes in 2 parameters
     * @param latestTemp is the stations most recent temperature in celcius
     * @param latestWindSpeed is the stations most recent windSpeed
     * 
     * @return rounded number
     */
  calculateWindChill(latestTemp, latestWindSpeed){
        let windChill = 13.12 +0.6215*(latestTemp)-11.37*Math.pow(latestWindSpeed,0.16)+0.3965*(latestTemp*Math.pow(latestWindSpeed,0.16));
        return Math.round(windChill);
    },
  
    /**
     * This method converts winddirection number to compass text
     * @param windDirection
     * 
     * @return string
     */
   convertWindDirectionToText(windDirection) {

        if (((windDirection >= 0.0) && (windDirection <= 11.25))
            || ((windDirection > 348.75) && (windDirection <= 360.0)))
        {
            return "N";
        }
        else if ((windDirection > 11.25) && (windDirection <= 33.75))
        {
            return "NNE";
        }
        else if ((windDirection > 33.75) && (windDirection <= 56.25))
        {
            return "NE";
        }
        else if ((windDirection > 56.25) && (windDirection <= 78.75))
        {
            return "ENE";
        }
        else if ((windDirection > 78.75) && (windDirection <= 101.25))
        {
            return "E";
        }
        else if ((windDirection > 101.25) && (windDirection <= 123.25))
        {
            return "ESE";
        }
        else if ((windDirection > 123.25) && (windDirection <= 146.25))
        {
            return "SE";
        }
        else if ((windDirection > 146.25) && (windDirection <= 168.75))
        {
            return "SSE";
        }
        else if ((windDirection > 168.75) && (windDirection <= 191.25))
        {
            return "S";
        }
        else if ((windDirection > 191.25) && (windDirection <= 213.75))
        {
            return "SSW";
        }
        else if ((windDirection > 213.75) && (windDirection <= 236.25))
        {
            return "SW";
        }
        else if ((windDirection > 236.25) && (windDirection <= 258.75))
        {
            return "WSW";
        }
        else if ((windDirection > 258.75) && (windDirection <= 281.25))
        {
            return "W";
        }
        else if ((windDirection > 281.25) && (windDirection <= 303.75))
        {
            return "WNW";
        }
        else if ((windDirection > 303.75) && (windDirection <= 326.25))
        {
            return "NW";
        }
        else if ((windDirection > 326.25) && (windDirection <= 348.75))
        {
            return "NNW";
        }
        else
        {
            return "No Wind Direction";
        }

    },
  
    /**
     * This method converts latest trend text to fontawasome icon
     * @param latestTrend
     * 
     * @return fontawasome icon
     */
  convertTrendToIcon(latestTrend)
    {
        if (latestTrend == "Increasing"){
            return "fa-solid fa-arrow-up";
        } else if (latestTrend == "Decreasing") {
            return "fa-solid fa-arrow-down";
        } else if (latestTrend == "Steady") {
            return "fa-solid fa fa-arrows-h";
        }
        else if (latestTrend == "No Trend Yet") {
            return "No Trend Yet";
        }

        return "No Trend Yet";
    }
  
}

