const express = require("express");
const path = require("path");
const http = 
require("http");
const cors = require("cors"); // Add this line to import the cors package
const cookieParser  = require("cookie-parser");

const { routesInit } = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS for all routes
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
   })
  );
routesInit(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port);
