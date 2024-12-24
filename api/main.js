const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 4000;

app.use(cors());

const visitors = [];


// IN-MEMORY FOR NOW!
const MAX_VISITORS = 1000;

function cleanupVisitors() {
  if (visitors.length > MAX_VISITORS) {
    console.log("Visitor memory limit reached, cleaning up...");
    visitors.length = 0; 
  }
}

app.get("/", (req, res) => {
  res.send({
    message: "🚀 Welcome to our API! 🌟",
    tips: "Use the endpoints wisely and enjoy your coding journey! 🧑‍💻",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

app.get("/check-visitor", (req, res) => {
  const visitorIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const existingVisitor = visitors.find(visitor => visitor.ip === visitorIp);

  if (existingVisitor) {
    return res.json({ position: `#${existingVisitor.position}` });
  }

  const visitorPosition = visitors.length + 1;

  visitors.push({ ip: visitorIp, position: visitorPosition });

  cleanupVisitors();

  return res.json({ position: `#${visitorPosition}` });
});

app.listen(port, () => {
  console.log(`Visitors Counter running at ${port}`);
});
