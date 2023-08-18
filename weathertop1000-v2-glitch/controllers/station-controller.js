import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { readingConversions } from "../utils/reading-conversions.js";
import { latestReadings } from "../utils/latest-readings.js";


export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    
    let stationReadings = await latestReadings(request.params.id);
    
    const viewData = {
      title: "Station Readings",
      station: station,
    
    };
    
    Object.assign(viewData, stationReadings.reading);
    
    response.render("station-view", viewData);
  },
  
  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
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
                                       
    const newReading = {
      code: Number(request.body.code),
      timeStamp: String(dateTime),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
  
  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(request.params.readingId);
    response.redirect("/station/" + stationId);
  },
};