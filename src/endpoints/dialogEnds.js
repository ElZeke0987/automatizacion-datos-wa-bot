
import { localidades } from "../localidades.js";
import { compareListList, filteringText, } from "../mods/getters/getText.js";
import { infiniteVerify, queryTerminal } from "../mods/inOut.js";
let API_KEY;

import fs from "fs";
import { loadNlp, processText } from "../mods/nlpConfs/nlpMods.js";
import { response } from "express";
import { wGetSandboxKey } from "../../deploy-wa-bot/src/mods/keySavers.js";
import { setWebhookD360GET, setWebhookD360POST } from "../mods/D360/webhookSetups.js";
import { sendMessageD360 } from "../mods/sendersMessages.js"
import { preProcessStep } from "../mods/messagesStep/processTextStep.js";

export function setSandboxKey(key){
    fs.writeFileSync('./src/endpoints/json/api_sandbox_key.json',JSON.stringify({key}))
}
export function getSandboxKey(){
    const data = fs.readFileSync('./src/endpoints/json/api_sandbox_key.json', 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.key;
}

export async function setWebhookD360(req, res){
    console.log("Setting webhook")

        setWebhookD360POST(req, res);

   // setWebhookD360GET(req, res)
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


export async function messagesEnd(req, res){
    preProcessStep(req, res, "d360")
}