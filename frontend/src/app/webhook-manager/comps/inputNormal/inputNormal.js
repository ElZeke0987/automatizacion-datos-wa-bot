
import "./inputNormal.scss";



function InputNormal({ setter, text, placeholder, defVal, type="text"}) {
    return ( 

        <div className="flex flex-col items-start input-normal ">
            <label>{text}</label>
            <input onChange={(e)=>setter(type=="checkbox"?!defVal:e.target.value)} className="w-full" placeholder={placeholder} value={defVal} type={type} defaultChecked={defVal}/>
        </div>
     );
}

export default InputNormal;