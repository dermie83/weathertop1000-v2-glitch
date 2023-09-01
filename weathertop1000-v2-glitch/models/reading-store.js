import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("readings");

/**
 * This class handles things related to the reading Store
 *
 */
export const readingStore = {

  /**
   * This method gets all readings from the reading store
   *
   */
  async getAllReadings() {
    await db.read();
    return db.data.readings;
  },

  /**
   * This method adds a reading to a station,
   * then adds that reading to the reading store.
   *
   */
  async addReading(stationId, reading) {
    await db.read();
    reading._id = v4();
    reading.stationid = stationId;
    db.data.readings.push(reading);
    await db.write();
    return reading;
  },

  /**
   * This method gets a reading/s from the store by a stationID
   *
   */
  async getReadingsByStationId(id) {
    await db.read();
    return db.data.readings.filter((reading) => reading.stationid === id);
  },

  /**
   * This method gets a reading from the store by a readingID
   *
   */
  async getReadingById(id) {
    await db.read();
    return db.data.readings.find((reading) => reading._id === id);
  },

  /**
   * This method deletes a reading from store by readingID
   *
   */
  async deleteReading(id) {
    await db.read();
    const index = db.data.readings.findIndex((reading) => reading._id === id);
    db.data.readings.splice(index, 1);
    await db.write();
  },

  /**
   * This method deletes all readings from the store
   *      ****Unused method****
   * 
   */
  // async deleteAllReadings() {
  //   db.data.readings = [];
  //   await db.write();
  // },
  
  /**
   * This method updates a reading from the store by readingID
   * All new reading parameters are updated 
   * through the edit-reading view.
   * 
   */
  async updateReading(readingId, updatedReading) {
    
    const reading = await this.getReadingById(readingId);
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.windDirection = updatedReading.windDirection;
    reading.pressure = updatedReading.pressure;
    await db.write();
  },

};