import { userStore } from "../models/user-store.js";

  /**
   * This class handles user Accounts pages
   * 
   */

export const accountsController = {

    /**
   * The index method renders
   * the viewData object on the Landing page i.e. index view.
   * 
   */
  async index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

    /**
   * This method renders
   * the viewData object in the login view.
   * 
   */
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

    /**
   * This method renders
   * the viewData object in the login view.
   * 
   */
  logout(request, response) {
    response.cookie("LoggedInUser", "");
    response.redirect("/");
  },

    /**
   * This method renders
   * the viewData object in the signup view.
   * 
   */
  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  /**
   * This method registers any new user through the 
   * signup-view. It takes user inputs and redirects to landing page
   * i.e. index page - which is controlled by the index method.
   * 
   */
  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  /**
   * This method authenticates if a registered users is in the user-store.
   * If user is true it redirects login view to dashboard view and creates a cookie
   * If user is false it redirects user back to login view.
   * 
   */
  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("LoggedInUser", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  /**
   * This method returns/gets the current user via the stored cookie on console.
   * 
   */
  async getLoggedInUser(request) {
    const userEmail = request.cookies.LoggedInUser;
    console.log("getLoggedInUser " + userEmail);
    return await userStore.getUserByEmail(userEmail);
  },

  /**
   * This method allows to update the user profile details
   * by calling the getLoggedInUser method.
   * The updateUser object is updated with 4 new parameters 
   * obtained from updateprofile-view.
   * The userStore is then updated with new parameters/details.
   * The user is then redirected back to their dashboard.
   * 
   */
  async updateUser(request, response) {

    let loggedInUser = await accountsController.getLoggedInUser(request);
    let updateUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
      email: request.body.email,
    };

    await userStore.updateUser(loggedInUser._id, updateUser);
    response.redirect("/dashboard");
  },

  async profile(request, response)
    /**
    * This method gets all user details for user profile view
    *
    */
    {
     const loggedInUser = await accountsController.getLoggedInUser(request);

    const viewData = {
      title: "User Profile",
      user: loggedInUser,
      //UserLoggedIn: loggedInUser,
    };
    console.log("Rendering: Profile-View");

    response.render("updateprofile-view", viewData);
  },
};
