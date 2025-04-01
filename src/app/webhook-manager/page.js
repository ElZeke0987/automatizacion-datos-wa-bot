import { useState } from "react";
import InputNormal from "./comps/inputNormal";
import SetWebhookBtn from "./comps/setWebhook";

function WebhookManager() {

    const [url, setUrl] = useState();
    const [apiKey, setApiKey] = useState();
    const [sandbox, setSandbox] = useState(true);


    return ( 
        <div>
            <InputNormal setter={setUrl} text={"New URL"} defVal={url}/>
            <InputNormal setter={setApiKey} text={"API KEY"} defVal={apiKey}/>
            <InputNormal setter={setSandbox} text={"Sandbox Mode"} defVal={sandbox} type="checkbox"/>

            <SetWebhookBtn newUrl={url} API_KEY={apiKey} sandbox={sandbox}/>
        </div>
     );
}

export default WebhookManager;