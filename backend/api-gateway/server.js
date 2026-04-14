require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes
require("./routes/authRoutes")(app);
require("./routes/user/userRoutes")(app);
require("./routes/admin/productsAdmin")(app);
require("./routes/public/productsPublic")(app);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});
