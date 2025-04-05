export async function wSetSandboxKey(key, env){
   await env.SANDBOX_KEY.put("SANDBOX_KEY", JSON.stringify({sandbox_key: key}))
}
export async function wGetSandboxKey(env){
    return await env.SANDBOX_KEY.get("SANDBOX_KEY", { type: "json"})
}