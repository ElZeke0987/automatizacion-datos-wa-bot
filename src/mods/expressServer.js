import { messagesEnd, setWebhookD360 } from "../endpoints/dialogEnds.js"
import { recibeMsgEvents, registerNumberPoint, subscribeService ,testMsgEndPoint } from '../endpoints/testEnd.js'
import express from "express";
import { twilioMsgEndPoint } from '../endpoints/twilioEnd.js';
import bodyParser from 'body-parser';
import cors from "cors";
import { join, resolve} from "path";
import { setupNlp } from "./nlpConfs/nlpMods.js";
import { returnPage } from "./pagesReturner.js";
import { metaEnds } from "../endpoints/metaEnds.js";

const corsOptionsDef = {
    origin: "http://localhost:3000",
}

export function ExpressServer(port=3000, server, corsOptions = corsOptionsDef){

    setupNlp()
    
    server.use(cors(corsOptions))
    server.use(express.json())
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(express.static(resolve("./frontend/out")))
    /*
    app.get('/', subscribeService);
    app.post('/', recibeMsgEvents)*/
    server.get("/", returnPage)
    server.get("/webhook-manager", returnPage)


    server.post("/api/messages", messagesEnd)
    server.get("/test-ngrok", (req, res)=>{console.log("Test Ngrok"); res.status(200).send("OK")})


    server.post('/twilio_end_msg', twilioMsgEndPoint)
    server.get("/api/set-webhook-d360", setWebhookD360)

    server.post("/api/set-webhook-d360", setWebhookD360)

    metaEnds(server);
   
    

}
