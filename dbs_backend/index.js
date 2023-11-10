require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const connection = require("./db");

//import routes
const userRouter = require("./src/routes/userRoute");
const colisRouter = require("./src/routes/colisRoute");
const tarifRouter = require("./src/routes/tarifRoute");
const eventRouter = require("./src/routes/eventRoute");
const simulationRouter = require("./src/routes/simulationRoute");

//Use all parser utilities
// Increase the limit to handle larger payloads (e.g., 10MB)
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use( bodyParser.json({limit: 'Infinity'}) );
app.use(bodyParser.urlencoded({
  limit: 'Infinity',
  extended: true,
  parameterLimit:500000000000
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "./build/web")));
app.use(express.static(path.join(__dirname, "./public")));

//allows multiple http request anywhere
app.use(cors());

// All router app
app.use("/api/users", userRouter);
app.use("/api/colis", colisRouter);
app.use("/api/tarif", tarifRouter);
app.use("/api/event", eventRouter);
app.use("/api/simulation", simulationRouter);

//Public files
app.use(express.static(path.join(__dirname, "../public")));
//app.use(express.static(path.join(__dirname, "/upload")));

//connection to databse and create default super admin
connection()
  .then(() => {
    //App listener
    app.listen(process.env.APP_PORT, () =>
      console.log(`your server is running on port ${process.env.APP_PORT}`)
    );
  })
  .catch((err) => console.log(err.message));
