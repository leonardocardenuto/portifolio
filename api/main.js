const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());

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

app.get("/check-visitor", (req, res) => {
  const visitorId = req.cookies.visitorId || `${Date.now()}-${Math.random()}`;

  const existingVisitor = visitors.find(visitor => visitor.id === visitorId);

  if (existingVisitor) {
    return res
      .cookie("visitorId", visitorId, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ position: `#${existingVisitor.position}` });
  }

  const visitorPosition = visitors.length + 1;
  visitors.push({ id: visitorId, position: visitorPosition });

  cleanupVisitors();

  return res
    .cookie("visitorId", visitorId, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ position: `#${visitorPosition}` });
});

app.listen(port, () => {
  console.log(`Visitors Counter running at http://localhost:${port}`);
});