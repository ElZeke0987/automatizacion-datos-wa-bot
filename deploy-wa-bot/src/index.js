/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { DurableObject } from 'cloudflare:workers'
import { wMessagesEnd, wSetWebhookD360 } from "./mods/wranglerAPIs";
import { wranglerRESTapi } from "./mods/wranglerPages";
const redirects = {
    "/webhook-manager": "/out/webhook-manager",
    "/webhook-manager/out/webhook-manager": "/out/webhook-manager",
    "/": "/out/sindex",
	"/sindex": "/out/sindex",
	"/api/messages/set-webhook-d360": "/api/set-webhook-d360"
	
}

//import { WranglerServer } from "../../src/mods/expressSe
export class CooldownDO{
    constructor(state){
        this.state = state;
        this.lastMessageTime = 0;
    }
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if(redirects[url.pathname]){
			return Response.redirect(url.origin + "/" + redirects[url.pathname], 302)
		   
		}
		
		switch (url.pathname) {
			case '/out/webhook-manager'||'/out/sindex':
				wranglerRESTapi(url);
				return
			case '/api/messages':
				this.lastMessageTime = Date.now()
            	this.state.setAlarm(this.lastMessageTime >= 10_000)
            	console.log("Reiniciando cooldown por mensaje recibido")
				await wMessagesEnd(request, env)
				return new Response("OK")
			case '/api/set-webhook-d360':
				await wSetWebhookD360(request, env)
				return
			default:
				return new Response('Not Found', { status: 404 });
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
};
