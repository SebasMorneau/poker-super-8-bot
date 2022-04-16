require("dotenv").config();
import request from "request";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

let index = (req, res) => {
  return res.render("homepage");
};

let getWebhook = (req, res) => {
  let VERIFY_TOKEN = MY_VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

let postWebhook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

function handleMessage(sender_psid, received_message) {
  let response = "null";
  const message = received_message.text;

  const endOfGameKeywords = ["Final"];

  const setupTournament = ["Tournament"];

  const helpKeyword = ["Help", "help"];

  const words = message.split("\n");

  switch (message) {
    case endOfGameKeywords.includes(message):
      response = {
        text: `Alright! What is the results?`,
      };
      break;
    case setupTournament.includes(message):
      response = {
        text: `Alright! Let's setup this new tournament`,
      };
      break;
    case helpKeyword.includes(message):
      response = {
        text: "You can say Final to post a result about a game, and update the current toournament. Otherwise, you can setup a new tournament by saying Tournament!",
      };

    default:
      break;
  }

  // get message keyword

  // seperate name - position

  // know what month is it

  // post to db the game results winner

  // save name, positon, created_at

  // get from the db, the current standings

  // RETURN standings in message, position, name, points

  // Sends the response message
  callSendAPI(sender_psid, response);
}
function handlePostback(sender_psid, received_postback) {}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v7.0/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

module.exports = {
  index: index,
  getWebhook: getWebhook,
  postWebhook: postWebhook,
};
