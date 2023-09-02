import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { latestReadings } from "../utils/latest-readings.js";


    /**
     * This class renders the station readings page
     * 
     */
export const stationController = {

    /**
     * The index method renders the station readings view
     * 
     */
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
  
    /**
     * This method creates a newReading object for a selected station.
     * The newReading object takes in 6 parameters from the add-reading view.
     * The addReading method in the readingStore adds the object to the database.
     * 
     */
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
  
    /**
     * This method allows the user to delete a reading from the readingStore database.
     * The station is then rendered with a new reading list.
     * 
     */
  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(request.params.readingId);
    response.redirect("/station/" + stationId);
  },
};