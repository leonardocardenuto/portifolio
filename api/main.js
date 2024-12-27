require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.NODE_ENV == "production" ? process.env.REACT_APP : process.env.REACT_LOCAL_URL, 
  credentials: true,
}));

app.use(express.json());

const visitors = [];
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

app.post("/check-visitor", (req, res) => {
  const visitorId = req.body.visitorId || `${Date.now()}-${Math.random()}`;

  const existingVisitor = visitors.find(visitor => visitor.id === visitorId);

  if (existingVisitor) {
    return res.json({ position: `#${existingVisitor.position}` });
  }

  const visitorPosition = visitors.length + 1;
  visitors.push({ id: visitorId, position: visitorPosition });

  cleanupVisitors();

  return res.json({ position: `#${visitorPosition}` });
});

app.listen(port, () => {
  console.log(`Visitors Counter running at http://localhost:${port}`);
});