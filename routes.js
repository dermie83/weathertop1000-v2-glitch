import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { readingController } from "./controllers/reading-controller.js";
import { apiController } from "./controllers/api-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);
router.get("/profile", accountsController.profile);
router.post("/profile/update/:_id", accountsController.updateUser);

router.get("/api", apiController.index);
router.post("/api/generatereport", apiController.generateReport);

router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);
router.post("/dashboard/addstation", dashboardController.addStation)
router.get("/station/:id", stationController.index);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.get("/station/:stationid/deletereading/:readingid", stationController.deleteReading);

router.post("/station/:id/addreading", stationController.addReading);

router.get("/station/:stationid/editreading/:readingid", readingController.index);
router.post("/station/:stationid/updatereading/:readingid", readingController.update);
