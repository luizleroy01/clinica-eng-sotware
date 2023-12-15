import {useState} from 'react';
import styles from './FormAddress.module.css';
import {saveDataAddress} from '../../configuration.js';
export function FormAddress(){
    const[logradouro,setLogradouro] = useState("")
    const[bairro,setBairro] = useState("")
    const[cidade,setCidade] =useState("")
    const[estado,setEstado] = useState("")
    const[cep,setCep] = useState("")
    const[message,setMessage]=useState(false)
    
    const siglas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
        'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
      ];

    const sendAddress = async(address)=>{
        const url = saveDataAddress;
        const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(address)
        })
        return res.json()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let cepIsValid = validarCEP(cep)
        if(!cepIsValid){
            return
        }
        const address ={
            cep:cep,
            logradouro:logradouro,
            bairro:bairro,
            cidade:cidade,
            estado:estado
        }
        
        console.log(address);
        const response = sendAddress(address)
        console.log(response)

        setMessage(true)
        setCep("")
        setLogradouro("")
        setBairro("")
        setCidade("")
        setEstado("")

    }

    function validarCEP(cep) {
        const cepLimpo = cep.replace(/\D/g, '')
      
        if (cepLimpo.length !== 8) {
          return false
        }
      
        const regexNumerico = /^[0-9]+$/
      
        if (!regexNumerico.test(cepLimpo)) {
          return false
        }
        return true;
    }
    return(
        <div>
            
            <form onSubmit={handleSubmit}>
            <h3>Cadastro de endereço</h3>
                <label>
                    CEP:
                    <input type="text"
                     name="cep"
                     value={cep}
                     onChange={(e)=>setCep(e.target.value)}
                     placeholder='Digite o cep'
                     required/>
                </label>
                <label>
                    Logradouro:
                    <input type="text"
                        name="logradouro"
                        value={logradouro}
                        onChange={(e)=>setLogradouro(e.target.value)}
                        placeholder="Nome da Rua ou Avenida"
                        required
                        />
                </label>

                <label>
                    Bairro:
                    <input type="text"
                        name="bairro"
                        value={bairro}
                        onChange={(e)=>setBairro(e.target.value)}
                        placeholder="Nome do bairro"
                        required
                        />
                </label>

                <label>
                    Cidade:
                    <input type="text"
                        name="cidade"
                        value={cidade}
                        onChange={(e)=>setCidade(e.target.value)}
                        placeholder="Nome da Cidade"
                        required
                        />
                </label>

                <label>
                    Estado:
                    <select name="medico" value={estado} onChange={(e)=>setEstado(e.target.value)}>
                        {siglas.map((sigla,i)=>(
                            <option key={i} value={sigla}>{sigla}</option>
                        ))}
                    </select>
                </label>
                <input className={styles.submit} type="submit" value="Cadastrar"/>

            </form>
            {message && (
                <div className={styles.sucess}>
                    <h1>Endereço cadastrado com sucesso</h1>
                    <button onClick={(e)=>setMessage(false)}>OK</button>
                </div>
            )}
        </div>
    )
}