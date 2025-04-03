import { resolve } from "path"

export function returnPage(req, res){
    if(req.url=="/"){
        res.sendFile(resolve("./frontend/out/sindex.html"))
        return
    }
    
    res.sendFile(resolve("./frontend/out" + req.url + ".html"))
}
