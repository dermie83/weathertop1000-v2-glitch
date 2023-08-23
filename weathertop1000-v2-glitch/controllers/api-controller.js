import axios from "axios";

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
        let dateTime = date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=77a354dbf26826603c06866a44c6d753`
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            const reading = result.data.current;
            const timezone = result.data.timezone;
            report.code = reading.weather[0].id;
            report.temperature = reading.temp;
            report.windSpeed = reading.wind_speed;
            report.pressure = reading.pressure;
            report.windDirection = reading.wind_deg;
            report.timeStamp = String(dateTime);
            report.timezone = String(timezone);
            
        };
        console.log(report);
        
        const viewData = {
        title: "API Weather Report",
        reading : report
        };
        response.render("api-view", viewData);
    },
};