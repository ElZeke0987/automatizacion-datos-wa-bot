import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

export function queryTerminal(msg){
    return new Promise(resolve=>{
        rl.question(msg, answer=>{
            resolve(answer)
        })
    })
}

export async function infiniteVerify(condNegative, msg){
    const valToVerifyByUser = await queryTerminal(msg)
    const verified= await await condNegative(valToVerifyByUser);
    if(verified===false){//Verifica de que el usuario este seguro del valor a ingresar, si es true la funcion, se re-verifica
        infiniteVerify(condNegative, msg);
        return
    }
    return verified
}