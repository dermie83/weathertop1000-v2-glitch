import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js";

const db = initStore("stations");

/**
 * This class handles things related to the Station Store
 *
 */
export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  /**
   * This method adds a station to the station store
   *
   */
  async addStation(station) {
    await db.read();
    console.log("add station test1");
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  /**
   * This method gets a station by a stationID from the station store.
   * The station readings are also listed by the getReadingByStationid 
   * method in the reading store.
   *
   */
  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    if (list) {
      list.readings = await readingStore.getReadingsByStationId(list._id);
    }
    return list;
  },
  
  /**
   * This method gets a station by a userID from the station store.
   *
   */
  async getStationsByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userid === userid);
  },


  /**
   * This method deletes a station by a stationID from the station store.
   *
   */
  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  /**
   * This method deletes all stations from the station store.
   *      ****Unused method****
   *
   */
  // async deleteAllStations() {
  //   db.data.stations = [];
  //   await db.write();
  // },
  
};
