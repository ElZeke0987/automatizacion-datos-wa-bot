"use client";

import { useState } from "react";
import InputNormal from "./comps/inputNormal/inputNormal";
import SetWebhookBtn from "./comps/setWebhookBtn/setWebhook";
import "./styles/generalPage.scss";


function WebhookManager() {

    const [url, setUrl] = useState();
    const [apiKey, setApiKey] = useState();
    const [sandbox, setSandbox] = useState(true);


    return ( 
        <div className="webhook-page flex flex-col items-center justify-center">
            <div className="bg-gray-100 fields-to-send flex flex-col items-center">
                <InputNormal setter={setUrl} text={"New URL"} defVal={url}/>
                <InputNormal setter={setApiKey} text={"API KEY"} defVal={apiKey}/>
                <InputNormal setter={setSandbox} text={"Sandbox Mode"} defVal={sandbox} type="checkbox"/>
            </div>
            

            <SetWebhookBtn newUrl={url} API_KEY={apiKey} sandbox={sandbox}/>
        </div>
     );
}

export default WebhookManager;