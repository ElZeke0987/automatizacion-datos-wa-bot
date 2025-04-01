import {PythonShell} from "python-shell"

export async function detectNamesSpaCy(text){
    const body={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            text
        })
    }
    const response = await fetch("http://localhost:5000/detect-names", body)
    const data = await response?.json();
    console.log("Respusta de python: ", data)
}