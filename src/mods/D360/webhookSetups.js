import { setSandboxKey } from "../../endpoints/dialogEnds.js";

export async function setWebhookD360POST(req, res){
    const body = req.body;
    if(!body){
        console.error("No se proporciono un body para poner el webhook en d360")
        return
    }
    setSandboxKey(body.API_KEY)
    let newUrlObject = new URL(body.newUrl);
    newUrlObject.pathname="/api/messages";
    const setWebhookBody={
        method: body.sandbox ? "POST" : "PUT",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": body.API_KEY,
        },
        body:  JSON.stringify({
            "url":  newUrlObject.href,
            "headers": {
                "Authorization": "Basic",
            }
        })
    }
    console.log("Sending fetch: BODY:", newUrlObject.href);
    const urlToFetch = body.sandbox ? "https://waba-sandbox.360dialog.io/v1/configs/webhook" : "https://waba.360dialog.io/v1/configs/webhook"

    fetch(urlToFetch, setWebhookBody).then(response=>{
        console.log("response of setting webhook: ", response.status, response.statusText)
        res.status(200).send("OK")
    })
    .catch(err=>{
        console.error("Hubo un error: ", err)
    })
}

export async function setWebhookD360GET(req, res){//Not working yet
    const body = req.body;
    const verifyToken='CCC_Token_360';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];


    if(!body){
        console.error("No se proporciono un body para poner el webhook en d360")
        return
    }
    
    const setWebhookBody={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": body.API_KEY,
        },
        body:  JSON.stringify({
            "url":  body.newUrl,
        })
    }
    console.log("Sending fetch: API_KEY:", body.API_KEY);
    fetch("https://waba-sandbox.360dialog.io/v1/configs/webhook", setWebhookBody).then(response=>{
        console.log("response of setting webhook: ", response.status, response.statusText)
        res.status(200).send("OK")
    })
    .catch(err=>{
        console.error("Hubo un error: ", err)
    })
}
