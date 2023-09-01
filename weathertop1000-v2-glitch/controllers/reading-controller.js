import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

  /**
   * This class renders the edit readings page
   *
   */
export const readingController = {

    /**
     * The index method renders the edit reading view.
     * A viewData object takes in 2 parameters (station ID and reading ID) 
     * to displays the reading details in the editreading-view
     * 
     */
  async index(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: await stationStore.getStationById(stationId),
      reading: await readingStore.getReadingById(readingId),
    };
    response.render("editreading-view", viewData);
  },

    /**
     * The update method allows the user to update the stations reading.
     * An updateReading object takes 5 inputs from the edit-reading view.
     * The reading is updated by calling the updateReading method in the readingStore.
     * The user is then redirected back to the station view.
     * 
     */
  async update(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
   
    const updateReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    
    // let updateReadingString = JSON.stringify(updateReading); // Debug Remove Later
    // let updateReadingObject = JSON.parse(updateReadingString); // Debug Remove Later
    // console.dir(updateReadingObject, { depth: null, colors: true }); // Debug Remove Later

    console.log(`Updating Reading ${readingId} from Station ${stationId}`);
    await readingStore.updateReading(readingId, updateReading);
    response.redirect("/station/" + stationId);
  },
};