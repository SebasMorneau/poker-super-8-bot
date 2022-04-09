import express from "express";
import chatbotController from "../controllers/chatbotController";


let router = express.Router();

//init all web routes
let initWebRoutes = (app) => {
    router.get('/', chatbotController.test)
    // router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);
    // router.post('/setup', homepageController.handleSetupInfor); //set up the persistent menu & get started button
    // router.get('/get-survey', homepageController.handleGetSurveyPage); //webview
    // router.post('/post-survey', homepageController.handlePostSurvey);
    // router.post('/write-data', homepageController.writeDataToGoogleSheet);
    return app.use("/", router);
};

module.exports = initWebRoutes;