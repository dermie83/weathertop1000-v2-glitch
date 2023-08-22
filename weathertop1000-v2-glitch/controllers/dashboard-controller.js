import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { latestReadings } from "../utils/latest-readings.js";

export const dashboardController = {
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

    let viewDataString = JSON.stringify(viewData); // Debug Remove Later
    let viewDateObject = JSON.parse(viewDataString); // Debug Remove Later
    console.dir(viewDateObject, { depth: null, colors: true }); // Debug Remove Later

    console.log("dashboard rendering 1");
    response.render("dashboard-view", viewData);
  },

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

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
