import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { latestReadings } from "../utils/latest-readings.js";

  /**
   * This class renders dashboard page
   *
   */

export const dashboardController = {

     /**
     * The index method renders the dashboard view.
     * The current user by ID stations and latest station readings
     * are displayed alphabetically.
     * 
     */
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    console.log("loggedInUser " + loggedInUser._id);
    
    //If logged in user, render dashboard view
    let sortStations = await stationStore.getStationsByUserId(loggedInUser._id);
    sortStations.sort((a, b) => (a.name > b.name ? 1 : -1));
    
    //Add latest readings to each station
    for (const station of sortStations) {
      const readingObject = await latestReadings(station._id);
      Object.assign(station, readingObject.reading);
    };

    const viewData = {
      title: "Station Dashboard",
      stations: sortStations,
    };  

    // let viewDataString = JSON.stringify(viewData); // Debug Remove Later
    // let viewDateObject = JSON.parse(viewDataString); // Debug Remove Later
    // console.dir(viewDateObject, { depth: null, colors: true }); // Debug Remove Later

    console.log("dashboard rendering 1");
    response.render("dashboard-view", viewData);
  },

     /**
     * This method allows the logged in user to add a new station to the stationStore database.
     * A newStation object is created with 4 new parameters.
     * The parameters are added from the add-staion view.
     * The dashboard is then rendered with a new staion list view.
     * 
     */
  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
      
    };
    console.log(`adding station ${newStation.name}`);
    const station = await stationStore.addStation(newStation);
    //console.log("test1");
    response.redirect("/dashboard");
  },

    /**
     * This method allows the user to delete a station from the stationStore database.
     * The dashboard is then rendered with a new staion list.
     * 
     */
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
