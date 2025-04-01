
import { dockStart } from "@nlpjs/basic";
import { getReferencesByProp } from "../getters/getReferences.js";
import { NlpManager } from "node-nlp";
import fs from "fs";
import { detectNamesSpaCy } from "./pyMods/connectorPy.js";

/**
 * 1 - Se debe hacer setup del NLP y entrenarlo (mas a futuro se podra guardar el entrenamiento en json y guardar y cargar directamente)
 * 2 - Para procesar texto, loadNlp y se ejecutara cada que llegue un mensaje
 * 
 */

const pathModelJSON = './src/mods/referenceJson/modeloNlp.json';

export async function saveNlpJSON(nlp){
    fs.writeFileSync(pathModelJSON, JSON.stringify(nlp.toJSON()));
}

export async function setSaveNlpJSON(nlp){

    if(fs.existsSync(pathModelJSON)){
        console.log("Cargando modelo NLP JSON guardado...");
        const data = fs.readFileSync(pathModelJSON, 'utf-8');
        nlp.fromJSON(JSON.parse(data));
        return true
    }
    console.log("No hay modelo JSON guardado")
    return false
}

export async function loadNlp(){
    
    const manager = new NlpManager({"languages": 'es'})
    await manager.load()
    console.log("loaded NLP")
    return manager
}

export async function processText(managerNlp, text){

    return await managerNlp.process('es', `${text}`);
}


export async function trainNlp(nlp){

    nlp.addDocument('es', 'wacho', 'correcion')

    nlp.addAnswer('es', 'correcion', 'Habla bien gil')

    const places = getReferencesByProp();
    console.log(nlp)
    places.localidades.forEach((localidad)=>{
        nlp.addNamedEntityText('place', localidad.place, ['es'], localidad.vars)
    })
    
    nlp.addDocument('es', 'soy de %place%', 'cliente.ubi')
    nlp.addDocument('es', '%place%', 'cliente.ubi')
    nlp.addDocument('es', 'vivo en %place%', 'cliente.ubi')
    nlp.addDocument('es', 'resido en %place%', 'cliente.ubi')

    nlp.addAnswer('es', 'cliente.ubi', "asi que sos de {{place}}, mira vos")



    await nlp.train()

    await nlp.save()

    await saveNlpJSON(nlp);
}

export async function setupNlp(){
    
    const dock = await dockStart({ 
        "use":["Basic", "LangEs"],
        "settings": {
            "nlp": {
                "languages": ["es"],
                "forceNER": true,
                "corpora": ["./src/mods/nlpConfs/corpus.json"]
            }
        }
        
    })
    
    const nlp = dock.get('nlp');
    await nlp.train()
    await nlp.save()
    await saveNlpJSON(nlp);
    //const responseToSpacy = await detectNamesSpaCy("Me llamo Natalia Ferreyra");
    //const testResponse = await nlp.process("es", "me llamo martin /-/ de virrey del pino /-/ quiero precio");
    //console.log("Respuesta: ",testResponse)
    //console.log("testeando respuestas: ", testResponse)
    //await trainNlp(nlp)
    
    
    console.log("Setup of NLP ended")

}


