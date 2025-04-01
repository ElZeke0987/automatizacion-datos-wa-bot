function SetWebhookBtn({newUrl, API_KEY, sandbox=true}) {

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

        fetch("/set-webhook-d360", bdyReq)
    }

    return ( <button onClick={()=>handleRequestToSetWebhook()}>
        Set new Webhook
    </button> );
}

export default SetWebhookBtn;