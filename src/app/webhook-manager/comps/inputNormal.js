function InputNormal({ setter, text, placeholder, defVal, type="text"}) {
    return ( 

        <div>
            <label>{text}</label>
            <input onChange={(e)=>setter(type=="checkbox"?!defVal:e.target.value)} placeholder={placeholder} value={defVal} type={type}/>
        </div>
     );
}

export default InputNormal;