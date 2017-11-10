// Bring in our required modules
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");
const dotenv = require("dotenv");
const { Client } = require("pg");

require("dotenv").load();

// App Declaration
const app = express();
const router = express.Router();
app.use("/api", router);

app.use(json());

app.use(express.static(`${__dirname}/../client/build`));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

require("./passport")(passport);

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

const massiveConnection = massive({
  scripts: "server/db",
  connectionString: process.env.DATABASE_URL
})
  .then(db => {
    console.log(db);
    app.set("db", db);
  })
  .catch(err => {
    console.log(err);
  });

// Route files, grouped by primary database table
const userCtrl = require("./routes/userCtrl");
const emplCtrl = require("./routes/emplCtrl");
const carsCtrl = require("./routes/carsCtrl");
const garageCtrl = require("./routes/garageCtrl");
const companyCtrl = require("./routes/companyCtrl");
const chartCtrl = require("./routes/chartCtrl");

// User Endpoints
app.get("/api/user", userCtrl.getUser);
app.post("/api/user", userCtrl.postUser);

// Employee Endpoints
app.get("/api/empl", emplCtrl.getEmpl);
app.put("/api/empl", emplCtrl.putEmpl);
app.get("/api/emplGarage", emplCtrl.getEmplGarage);
app.post("/api/empl", emplCtrl.postEmpl);

// Car Endpoints
app.get("/api/cars", carsCtrl.getCars);
app.get("/api/carnotes", carsCtrl.getCarNotes);
app.put("/api/cars", carsCtrl.updateCarsSpace);
app.post("/api/cars", carsCtrl.postCars);
app.post("/api/usercar", carsCtrl.postUserCar);
app.post("/api/carnotes", carsCtrl.postCarNotes);

// Garage & parking Spot Endpoints
app.get("/api/parkingspot", garageCtrl.getParkingSpot);
app.get("/api/parkingspottype", garageCtrl.getParkingSpotType);
app.get("/api/parkinglotstatus", garageCtrl.getParkingLotStatus);

// Company Endpoints
app.post("/api/company", companyCtrl.postCompany);

// Chart Endpoints c
app.get("/api/chartHourlyParks", chartCtrl.getHourlyParks);
app.get("/api/chartHourlyRetrievals", chartCtrl.getHourlyRetrievals);
app.get("/api/chartHourlyEmplWork", chartCtrl.getHourlyEmplWork);

// Authentication
app.post("/auth/login", passport.authenticate("local"), (req, res) => {
  //{ successRedirect: '/' }
  console.log("res status", res.status);
  console.log(req.user);
  res.status(200).json(req.user);
});

// Check if logged in
app.get("/auth/me", (req, res) => {
  if (!req.user) return res.status(401).json({ err: "User Not Authenticated" });
  res.status(200).json(req.user);
});

// remove user from session
app.get("/auth/logout", (req, res, next) => {
  console.log("Logging User Out");
  req.logout();
  return res.json({ success: true });
});

// garage signup
app.post("/api/garage", garageCtrl.garageSignup);
app.post("/api/garageinfo", garageCtrl.garageInfo);

// listen on port
app.listen(process.env.PORT, () => {
  console.log(`LISTENING ON PORT: ${process.env.PORT}`);
});
