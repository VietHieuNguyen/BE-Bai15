const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('express-flash');
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const slug = require('mongoose-slug-updater');
const multer = require('multer')
const moment = require("moment")
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

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");

// Flash
app.use(cookieParser('DFASFDSAFDS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// END Flash

// TinyMCE  
app.use('/tinymce',
  express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE 

// AppLocal Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment

route(app);
routeAdmin(app);


app.use(express.static(`${__dirname}/public`));
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
