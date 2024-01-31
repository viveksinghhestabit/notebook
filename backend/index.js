require("./db");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const socket = require("./middleware/socket");

const app = express();
const port = 5000;

app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve("./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const authenticateUser = require("./middleware/authenticateUser");

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", authenticateUser, require("./routes/notes"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/users", authenticateUser, require("./routes/users"));
app.use(
  "/api/productCategory",
  authenticateUser,
  require("./routes/productCategory")
);
app.use("/api/products", authenticateUser, require("./routes/products"));
app.use("/api/orders", authenticateUser, require("./routes/payment"));
const server = require("http").createServer(app);
socket(server);
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
