import axios from "axios";

import { preProcessStep } from "../mods/messagesStep/processTextStep.js";
import { setWebhookMeta } from "../mods/D360/webhookSetups.js";


export function metaEnds(app){
   
   
    app.post("/webhook-meta", (req, res)=> preProcessStep(req, res, "meta"));
      
      // accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
      // info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
      app.get("/webhook-meta", setWebhookMeta);
}