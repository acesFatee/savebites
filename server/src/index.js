const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = require("./App");
const getMockCoordinates = require('./generateMockData')
const cors = require('cors')

const port = 9001;

function initializeExpress() {
  const expressApp = express();

  expressApp.use(cors({
    origin: "*"
  }))
  expressApp.use(express.static("public"));

  // add & configure middleware
  expressApp.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  expressApp.use(bodyParser.json());

  // Subscription example
  expressApp.post("/subscribe", (req, res) => {
    app.subscribeToTopic("SomeTopic");
    res.status(200).send('{"result":"ok"}');
  });

  
  expressApp.post("/publish/:id", async (req, res) => {
    const { startLat, startLon, endLat, endLon } = req.body;
  
    // Validate the required fields
    if (
      startLat == null ||
      startLon == null ||
      endLat == null ||
      endLon == null
    ) {
      return res.status(400).send('{"error":"Missing required fields"}');
    }
  
    const topic = `orders/track/${req.params.id}`;
  
    // Generate the mock coordinates
    const mockCoordinates = await getMockCoordinates(startLat, startLon, endLat, endLon);
  
    // Publish coordinates at regular intervals
    let step = 0;
    const interval = setInterval(() => {
      if (step >= mockCoordinates.length) {
        clearInterval(interval);
        console.log("Finished sending mock coordinates.");
        return;
      }
  
      const [lon, lat] = mockCoordinates[step]; // Extract longitude and latitude
      const message = JSON.stringify({ lon, lat });
  
      // Publish the message to the MQTT topic
      app.publishMessage(topic, message);
      console.log(`Published to ${topic}:`, message);
  
      step++;
    }, 500); // Send a message every 1 second
  
    res.status(200).send('{"result":"ok"}');
  });
  
  

  var server = http.createServer(expressApp);

  server.listen(port, () => {
    console.log("server starting on port : " + port);
  });
}

function initializeApplication() {
  app.initialize();
}

// initialize our application code
initializeApplication();

// initialize the express server
initializeExpress();
