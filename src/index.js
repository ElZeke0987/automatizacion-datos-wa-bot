

import { ExpressServer } from './mods/expressServer.js';
import express from "express";

const PORT = 3030;




/*
nextApp.prepare().then(()=>{*/
    const server = express()

    ExpressServer(PORT, server)

    /*server.all("*", (req, res)=>{
        return handle(req, res)
    })*/

    server.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`)
    })
//})

