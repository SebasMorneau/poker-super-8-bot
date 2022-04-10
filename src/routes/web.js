import express from "express";
import chatbotController from "../controllers/chatbotController";
import playerModel from "../models/players";

let router = express.Router();

//init all web routes
let initWebRoutes = (app) => {
  router.get("/", chatbotController.index);

  router.post("/add_player", async (request, response) => {
    const player = new playerModel(request.body);

    try {
      await player.save();
      response.send(player);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  router.get("/players", async (request, response) => {
    const players = await playerModel.find({});

    try {
      response.send(players);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  router.get("/webhook", chatbotController.getWebhook);
  router.post("/webhook", chatbotController.postWebhook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
