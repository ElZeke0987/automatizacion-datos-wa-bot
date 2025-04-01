import fs from "fs";

export function getReferencesByProp(propToSeek){
    const data = fs.readFileSync('./src/mods/referenceJson/places.json', 'utf8');
    const jsonData = JSON.parse(data[propToSeek]||data);
    return jsonData
}

export function verifyReference(text){

}