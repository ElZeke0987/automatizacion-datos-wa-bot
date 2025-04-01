
import { localidades } from "../localidades.js";
import { compareListList, filteringText, } from "../mods/getText.js";
import { infiniteVerify, queryTerminal } from "../mods/inOut.js";
let API_KEY;

import fs from "fs";
import { loadNlp, processText } from "../mods/nlpConfs/nlpMods.js";
import { response } from "express";


function setSandboxKey(key){
    fs.writeFileSync('./src/endpoints/json/api_sandbox_key.json',JSON.stringify({key}))
}
function getSandboxKey(){
    const data = fs.readFileSync('./src/endpoints/json/api_sandbox_key.json', 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.key;
}
export async function setWebhookD360(req, res){
    const body = req.body;
    if(!body){
        console.error("No se proporciono un body para poner el webhook en d360")
        return
    }
    setSandboxKey(body.API_KEY)
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

export async function sendMessageD360(numberTo, msg){
    const sendMsgBody={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": getSandboxKey(),
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": numberTo,
            "type": "text",
            "text": {
                "body": msg
            }
        })
    }
    console.log("sending ", msg)
    await fetch("https://waba-sandbox.360dialog.io/v1/messages", sendMsgBody)
    .then(response=>{
        console.log("RESPUESTA: ", response.status, response.statusText)
    })
    .catch(err=> console.error("Hubo un error >>>",err))
}

let userMessages = {};
let cooldownToProcces = false;
let userTimers={};
const cooldownTime=5000;

function getResponseData(responseNLP){
    let dataObj={
        nombres: "",
        localidades: ""
    }
    responseNLP.entities.forEach(entity => {
        dataObj[entity.entity]=entity.option
    });
    return dataObj
}

async function processStep(textMsg, numberFrom, toResetMessagesList){
    const manager = await loadNlp();
    const response = await processText(manager, textMsg);
    

    if(!textMsg|| textMsg==null||filteringText(textMsg)||textMsg==" ") {
        console.log("El usuario envio un mensaje poco entendible")
        return
    }
    console.log("response: ", response)
    console.log("DATA: ", getResponseData(response))
    if(response?.classifications[0].intent==="cliente.multi.info"){//Si se obtienen los dos datos, recien ahi se resetea el proceso de preguntas
        toResetMessagesList=[];
    }



    await sendMessageD360(numberFrom, response.answers[0]?.answer||`Perdone, no hay respuestas predefinidas, valores:  ${response.entities[0].option} , ${response.entities[1]&&response.entities[1].option}`)
}

export async function messagesEnd(req, res){
    const entryInfoObj=req.body.entry[0].changes[0].value;

    
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
            clearTimeout(userTimers[numberFrom]);
        }
        userTimers[numberFrom]=setTimeout(()=>{//Funcion cuando se termine el cooldown
            //console.log("procesando el mensaje: ",entryInfoObj)
            //userMessages[numberFrom].push("endmsg");
            //console.log("mensajes: ",userMessages[numberFrom])
            /*userMessages[numberFrom].push("endmsg");*/
            processStep(userMessages[numberFrom].join(" "), numberFrom, userMessages)//Separacion de mensajes mandados en diferentes tiempos
            
            delete userTimers[numberFrom];
        }, cooldownTime)
        
        
    }else if( entryInfoObj.statuses){
        
    }

    res.status(200).send("OK")
}