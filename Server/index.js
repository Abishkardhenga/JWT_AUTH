const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
require("./utilis/db")();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser()); // Move this line up

app.use(express.json());

require("./Routes/index")(app);

app.listen(port, () => {
  console.log("Server running at ", port);
});
