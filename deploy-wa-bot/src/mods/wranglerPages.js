


export function wranglerRESTapi(url){
   
    

    const key = url.pathname.substring(1);
    const obj = env.MY_BUCKET.get(key)

           
    if(!obj){
        
        return new Response("Archivo no encontrado")
    }
    return new Response("hola: "+obj.httpMetadata.contentType)


}