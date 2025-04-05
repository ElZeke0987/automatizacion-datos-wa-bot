export class CooldownDO extends DurableObject{
    constructor(state){
        this.state = state;
        this.lastMessageTime = 0;
    }
    async fetch(request){

        let url = new URL(request.url);

        if(url.pathname=="/api/messages"){
            this.lastMessageTime = Date.now()
            this.state.setAlarm(this.lastMessageTime >= 10_000)
            console.log("Reiniciando cooldown por mensaje recibido")
        }
            
    }
    async alarm(){
        const now = Date.now();
        if (now - this.lastMessageTime >= 10_000){
            console.log("Procesando mensaje");
        } else{
            const remaining = 10_000 - (now - this.lastMessageTime);
            this.state.setAlarm(now+remaining)
        }
    }
}