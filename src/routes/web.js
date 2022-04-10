import express from "express";
import chatbotController from "../controllers/chatbotController";

let router = express.Router();

//init all web routes
let initWebRoutes = (app) => {
  router.get("/", chatbotController.index);

  router.get("/webhook", chatbotController.getWebhook);
  router.post("/webhook", chatbotController.postWebhook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
