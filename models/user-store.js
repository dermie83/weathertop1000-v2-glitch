import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("users");

/**
 * This class handles things related to the user store
 *
 */
export const userStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  /**
   * This method adds a user to the user store
   *
   */
  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  /**
   * This method gets a user by a userID from the user store.
   *
   */
  async getUserById(id) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },

  /**
   * This method gets a user by email from the user store.
   * Used to authenticate user in accounts controller.
   *
   */
  async getUserByEmail(email) {
    await db.read();
    
    console.log("getUserByEmail " + email);
    return db.data.users.find((user) => user.email === email);
  },

  /**
   * This method deletes a user by a userID from the user store.
   *      ****Unused method****
   */
  // async deleteUserById(id) {
  //   await db.read();
  //   const index = db.data.users.findIndex((user) => user._id === id);
  //   db.data.users.splice(index, 1);
  //   await db.write();
  // },

  /**
   * This method deletes all stations from the station store.
   *      ****Unused method****
   *
   */
  // async deleteAll() {
  //   db.data.users = [];
  //   await db.write();
  // },
  
  /**
   * This method updates a user from the user by userID
   * All new user parameters are updated 
   * through the edit-profile view.
   * 
   */
  async updateUser(userId, updateUser) {    
    const user = await this.getUserById(userId);
    user.firstName = updateUser.firstName;
    user.lastName = updateUser.lastName;
    user.email = updateUser.email;
    user.password = updateUser.password;
    await db.write();
  },
};