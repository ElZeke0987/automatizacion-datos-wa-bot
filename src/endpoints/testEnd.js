
import axios from "axios";
import WhatsApp from "whatsapp";
import { getHeaders } from "./boundaryAndHeaders.js";
import { queryTerminal } from "../mods/inOut.js";



const wa = new WhatsApp(576306482236751);

const toNumber = 5493548554182;


async function send_test_msg(){
    try{
        const send_msg = wa.messages.text({ "body": "testeo smir"}, toNumber);
        fetch("https://graph.facebook.com/v22.0/576306482236751/messages")
        await send_msg.then(res=>{
            console.log("succesfully send test msg!: ", res.statusCode())
        })


    }catch(e){
        console.error("Error sending test mesage: ", e)
    }
}



export function subscribeService(req, res){
    const mode = req?.query["hub.mode"];
    const token = req?.query["hub.verify_token"];
    const challenge = req?.query["hub.challenge"];
    
    if(mode ==="subscribe"&&token==="1234"){
        console.log("Suscrito al servicio!")
        res.status(200).send(challenge);
    }else{
        console.log("Error verificando")
        res.status(403).send("Error de verificacion");
    }
    
   
}

export function recibeMsgEvents(req, res){
    const data = req.body.entry[0].changes[0];

    console.log("evento recibido: ", data)
    res.status(200).send("OK");
}

export function testMsgEndPoint(req, res){
    const fieldBasic=req.body.entry[0].changes[0];
    console.log("body test: ", fieldBasic)
    send_test_msg()
    
}


const ACCESS_TOKEN = "EAAOYMmDaE1cBO3cJxUlqJk1gnnk6fiPZBkQ2iOSGmWiZCCXEdZCtYykSVnJ04rYks4CWcMyx8l3ZCbnVatXdquQqKOcdfs1WDHG1a3SEnh0lqt3aoXijCMKkH0AI4PGnRKxiZAHidsNCITkbThIbxI1p4r4ElWx963EjfTqbHNkSrCDEBKYCSIIQ5gCAcT1RY3ZCtryx0yTtsQ6v5T2KCsqmnr69sZCPyvQL28ZD";
const CLOUD_API_VERSION = "v22.0";
const PHONE_SENDER_ID = "576306482236751";


export async function registerNumberPoint(){

    const form = new FormData();
    form.append("code_method", "SMS");
    form.append("language", "en");
    form.append("locale", "en_US");

    
    
    const headers={
        'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
    console.log(headers)
    const verifyPassCode= await queryTerminal("Seguro de mandar la peticion a API Graph? (Y)/(N)");
    if(verifyPassCode.toLowerCase()!=="y")return
    
    axios.post(`https://graph.facebook.com/${CLOUD_API_VERSION}/${PHONE_SENDER_ID}/request_code`, form, { headers }).then(async (res)=>{
        console.log("res: ", res.data)
        const code = await queryTerminal("Codigo de verificacion: ");
        const verifyAction = await queryTerminal(`Es correcto  --${code}--?\n Si(y) No(n)`);
        if(verifyAction[0].toLowerCase()!=='y'){
            return
        }
        const formDataCode= new FormData();
        formDataCode.append("code", code);
       
        const newHeaders={
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        }

        axios.post(`https://graph.facebook.com/${CLOUD_API_VERSION}/${PHONE_SENDER_ID}/verify_code`, formDataCode,{headers: newHeaders}).then(res2=>{
            console.log("res2: ", res2.data);
        }).catch(err=>{
            console.log("Hubo un error al verificar el codigo---->");
            console.log("code: ",err.status,err.response.data);

        })

    }).catch(error=>{
        console.log("Hubo un error al pedir codigo de verificacion---->")
        console.error("code: ",error.status,error.response.data)

    })
}