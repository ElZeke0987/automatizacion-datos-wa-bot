import { processStep } from "../../../src/endpoints/dialogEnds";
import { wSetSandboxKey } from "./keySavers.js"
import { CooldownDO } from "./timers.js";

let userMessages = {};
let cooldownToProcces = false;
let userTimers={};
const cooldownTime=5000;

export async function wMessagesEnd(req, env){
    const body =  await req.json();
    const iDCooldownDO= env.COOLDOWN_DO.idFromName('cooldow_durable_object');
    const CooldownDOStub= env.COOLDOWN_DO.get(iDCooldownDO);
    await CooldownDOStub.fetch(request)
    
    const entryInfoObj=body.entry[0].changes[0].value;

    
    if(entryInfoObj.messages){
        const msgObj=entryInfoObj?.messages[0]
    
        const textMsg= msgObj.text.body;
        const numberFrom= msgObj.from;//Tel Number
        const nameWa=entryInfoObj.contacts[0].profile.name//Name in WhatsApp
        const regex = /\b(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+))(?:-(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+)))*(?:(?:\s+(?:(?:de|del|la|las|los)|(?:DE|DEL|LA|LAS|LOS))\s+)?\s*(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+))(?:-(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+)))*?)*\b/g
        
        if(!userMessages[numberFrom]){
            userMessages[numberFrom]=[];
            cooldownToProcces=true;
             
        }
        userMessages[numberFrom].push(textMsg)
        //console.log("ADDED: ", textMsg)
        if(userTimers[numberFrom]){
            console.log("Deleting timer")
            clearTimeout(userTimers[numberFrom]);
        }
        const cooldownTimer = new CooldownDO()
        userTimers[numberFrom]= setTimeout(()=>{//Funcion cuando se termine el cooldown
            console.log("procesando el mensaje: ",entryInfoObj)
            //userMessages[numberFrom].push("endmsg");
            //console.log("mensajes: ",userMessages[numberFrom])
            /*userMessages[numberFrom].push("endmsg");*/

        
            processStep(userMessages[numberFrom].join(" "), numberFrom, userMessages, env)//Separacion de mensajes mandados en diferentes tiempos
            
            delete userTimers[numberFrom];
        }, cooldownTime)
        console.log("Timers: ", userTimers)
        
    }else if( entryInfoObj.statuses){
        
    }
    return new Response("OK")
}
export async function wSetWebhookD360(req, env){
    const body = {};
    body.API_KEY="MDgh1r_sandbox";
    body.newUrl= "https://9489c7546fa0138ed54ca44376b7c543.serveo.net/api";
    if(!body){
        console.log("No pusiste body al enviar la peticion para hacer un webhook D360")
        return new Response("No pusiste body al enviar la peticion para hacer un webhook D360",{status: 404})
        
    }
    
    let newUrlObject = new URL(body.newUrl);
    newUrlObject.pathname="/api/messages";

    const setWebhookBody={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": body.API_KEY,
        },
        body:  JSON.stringify({
            "url":  newUrlObject.href,
        })
    }
    console.log("Sending fetch: API_KEY:", body.API_KEY, "Body to fetch: ", setWebhookBody);
    try{
        const res = await fetch("https://waba-sandbox.360dialog.io/v1/configs/webhook", setWebhookBody)
        console.log("response of setting webhook: ", res.status, res.statusText)
        return new Response("OK",{status: 200})
    }catch(err){
        console.log("Hubo un error con el webhook: ", err)
        return new Response("Hubo un error: ",{status: 404})
    }

}
