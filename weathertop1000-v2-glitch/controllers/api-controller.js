import axios from "axios";
import { apiKey } from "../config.js";
import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { readingStore } from "../models/reading-store.js";
import { readingConversions } from "../utils/reading-conversions.js";

export const apiController = {
    async index(request, response) {
        const viewData = {
          title: "API Weather Report",
        };
        console.log("API rendering");
        response.render("api-view", viewData);
      },
    
    async addreport(request, response) {
    
        console.log("rendering new api call");
        let report = {};
        const lat = request.body.lat;
        const lng = request.body.lng;
        
        
        const date = new Date(); // Add Current Date
        let dateTime = date.toLocaleString("en-uk", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey.getapiKey()}`
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            //console.log(result.data);
            const reading = result.data.current;
            const timezone = result.data.timezone;
            report.code = readingConversions.roundDownWeatherCode(reading.weather[0].id);
            report.temperature = reading.temp;
            report.windSpeed = reading.wind_speed;
            report.pressure = reading.pressure;
            report.windDirection = reading.wind_deg;
            report.timeStamp = String(dateTime);
            report.timezone = String(timezone);

            report.tempTrend = [];
            report.trendLabels = [];
            const trends = result.data.daily;
            for (let i=0; i<trends.length; i++) {
                report.tempTrend.push(trends[i].temp.day);
                const date = new Date(trends[i].dt * 1000);
                report.trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` );
            }
            
        };
        // Add new openweather station and readings to user database
        {
            const loggedInUser = await accountsController.getLoggedInUser(request);
            
            const newOpenWeatherStation = {
              name: result.data.timezone,
              latitude: request.body.lat,
              longitude: request.body.lng,
              userid: loggedInUser._id,
              
            };
            console.log(`adding openweatherstation ${newOpenWeatherStation.name}`);
            const openstation = await stationStore.addStation(newOpenWeatherStation);
            await readingStore.addReading(openstation._id, report);
            console.log("test1");
        };
        console.log(report);
        
        const viewData = {
        title: "API Weather Report",
        reading : report
        };
        response.render("api-view", viewData);

    },

};