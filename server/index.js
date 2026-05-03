require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/regions", require("./routes/region"));
app.use("/api/info", require("./routes/infoItems"));
app.use("/api/contact", require("./routes/contact"));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(process.env.PORT, () => {
  console.log(`Server on ${process.env.PORT}`);
});
