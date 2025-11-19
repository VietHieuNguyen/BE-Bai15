const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

require("dotenv").config();



const app = express();
const port = process.env.PORT;
const database = require("./config/database")

database.connect();

const route = require("./routes/client/index.route");

const routeAdmin = require("./routes/admin/index.route");

const systemConfig = require("./config/system")

app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

app.set("views","./views");
app.set("view engine","pug");

// AppLocal Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin


route(app);
routeAdmin(app);

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
