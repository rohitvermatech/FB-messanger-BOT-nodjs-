const express = require('express')
const fbwebhook = require('../FB/controller/fbwebhook')

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/webhook", fbwebhook.getwebhook);
    router.post("/webhook", fbwebhook.postwebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;