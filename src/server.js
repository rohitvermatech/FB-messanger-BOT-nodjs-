require('dotenv').config();

const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    initWebRoutes = require('./routes/route')

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Messenger bot is running at the port ${port}`);
});