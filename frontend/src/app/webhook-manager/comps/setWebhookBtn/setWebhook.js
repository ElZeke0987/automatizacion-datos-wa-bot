"use client";
import {useEffect, useState} from "react";
import "./styles.scss";


function SetWebhookBtn({newUrl, API_KEY, sandbox=true}) {
    const [res, setRes]=useState();
    function handleRequestToSetWebhook(){
        const bdyReq={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                newUrl,
                API_KEY,
                sandbox,
            })
        }
        setRes({status: "loading", msg: "Cargando respuesta"});
        fetch(`${newUrl}/set-webhook-d360`, bdyReq).then(response=>{
            
            response.json()
        }).then(data=>{
            setRes({status: "success",msg: "Tu webhook ahora recibira mensajes de Whatsapp"})
        })
        .catch(err=>{
            console.error("Hubo un error: ", err)
            setRes({status: "error",msg: "Error al cargar webhook"})
        })
    }

    useEffect(()=>{
        setTimeout(()=>setRes(),5000)
    },[res])

    return ( <div className="flex flex-col items-center">
        <button onClick={()=>handleRequestToSetWebhook()} className="webhook-btn">
            Set new Webhook: 
        </button> 
        <div className={`status-${res?.status}`}>{res?.msg}</div>
    </div>);
}

export default SetWebhookBtn;