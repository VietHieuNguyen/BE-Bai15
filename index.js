const express = require('express');

require("dotenv").config();



const app = express();
const port = process.env.PORT;
const database = require("./config/database")

database.connect();

const route = require("./routes/client/index.route");

const routeAdmin = require("./routes/admin/index.route");


app.set("views","./views");
app.set("view engine","pug");


route(app);
routeAdmin(app);

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
