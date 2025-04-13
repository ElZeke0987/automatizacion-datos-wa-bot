import { getSandboxKey } from "../endpoints/dialogEnds.js"
const { GRAPH_API_TOKEN } = process.env;

export async function sendMessageD360(numberTo, msg, env){
    const sendMsgBody={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": getSandboxKey(),//Se obtiene la API-key guardada
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

export async function sendMessageMeta(message, business_phone_number_id, textToSend){
    // log incoming messages
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
      
    // check if the webhook request contains a message
    // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    //const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  
    // check if the incoming message contains text
    if (message?.type === "text") {
      // extract the business number to send the reply from it
      
  
      // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,//Token de acceso brindado en App > Productos > WhatsApp > Configuracion de API
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          text: { body: textToSend },
          context: {
            message_id: message.id, // shows the message as a reply to the original user message
          },
        },
      });
  
      // mark incoming message as read
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        },
      })
    }
  
    res.sendStatus(200);
}