import { filteringText } from "../getters/getText.js";
import { loadNlp, processText } from "../nlpConfs/nlpMods.js";
import { sendMessageD360, sendMessageMeta } from "../sendersMessages.js";

let userMessages = {};
let cooldownToProcces = false;
let userTimers={};
const cooldownTime=5000;

export async function preProcessStep(req, res, bsp){
    const entryInfoObj=req.body.entry[0].changes[0].value;
    
    
    if(entryInfoObj.messages){
        const msgObj=entryInfoObj?.messages[0]
        const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    
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
            processStep(msgObj,userMessages[numberFrom].join(" "), numberFrom, business_phone_number_id, userMessages,  bsp, env)//Separacion de mensajes mandados en diferentes tiempos
            
            delete userTimers[numberFrom];
        }, cooldownTime)
        
        
    }else if( entryInfoObj.statuses){
        
    }

    res.status(200).send("OK")
}

export async function processStep(msgObj ,textMsg, numberFrom, business_phone_number_id, toResetMessagesList, bsp){
    
    console.log("Loading NLP");
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

    const responseMsg=response.answers[0]?.answer||`Perdone, no hay respuestas predefinidas, valores:  ${response.entities[0].option} , ${response.entities[1]&&response.entities[1].option}`

    bsp==="meta"? await sendMessageMeta(msgObj, business_phone_number_id, responseMsg):await sendMessageD360(numberFrom, responseMsg, env);
}