import {useState} from 'react'
import styles from './FormPatient.module.css'
export function FormPatient(){
    const[nome,setNome] = useState("")
    const[email,setEmail] = useState("")
    const[telefone,setTelefone] = useState("")
    const[cep,setCep] = useState("")
    const[logradouro,setLogradouro] = useState("")
    const[bairro,setBairro] = useState("")
    const[cidade,setCidade] =useState("")
    const[estado,setEstado] = useState("")
    const[peso,setPeso] = useState("")
    const[altura,setAltura] = useState("")
    const[tipoSanguineo,setTipoSanguineo] = useState("")

    const siglas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
        'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
      ];

    const tipo = [
        { tipo: "A", rh: "+" },
        { tipo: "A", rh: "-" },
        { tipo: "B", rh: "+" },
        { tipo: "B", rh: "-" },
        { tipo: "AB", rh: "+" },
        { tipo: "AB", rh: "-" },
        { tipo: "O", rh: "+" },
        { tipo: "O", rh: "-" }
      ];

      const sendPatient = async(patient)=>{
        const url = saveDataAddress;
        const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Patient)
        })
        return res.json()
    }

      const handleSubmit = (e) => {
        e.preventDefault()
        let cepIsValid = validarCEP(cep)
        if(!cepIsValid){
            return
        }
        const patient ={
            nome:nome,
            email:email,
            telefone:telefone,
            cep:cep,
            logradouro:logradouro,
            bairro:bairro,
            cidade:cidade,
            estado:estado,
            peso:peso,
            altura:altura,
            tipoSanguineo:tipoSanguineo
        }
        

        const response = sendPatient(patient)
        
        setNome("")
        setEmail("")
        setTelefone("")
        setCep("")
        setLogradouro("")
        setBairro("")
        setCidade("")
        setEstado("")
        setPeso("")
        setAltura("")
        setTipoSanguineo("")

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
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text"
                     name="nome"
                     value={nome}
                     onChange={(e)=>setNome(e.target.value)}
                     placeholder='Digite seu nome'
                     required/>
                </label>
                <label>
                    Telefone:
                    <input type="text"
                     name="telefone"
                     value={telefone}
                     onChange={(e)=>setTelefone(e.target.value)}
                     placeholder='Digite seu telefone (xx)xxxxx-xxxx'
                     required/>
                </label>
                <label>
                    Email:
                    <input type="text"
                     name="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     placeholder='Digite seu email'
                     required/>
                </label>
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
                        value={bairro}
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
                <label>
                    Peso:
                    <input type="text"
                     name="peso"
                     value={peso}
                     onChange={(e)=>setPeso(e.target.value)}
                     placeholder='Digite o peso do paciente'
                     required/>
                </label>
                <label>
                    Altura:
                    <input type="text"
                     name="nome"
                     value={nome}
                     onChange={(e)=>setAltura(e.target.value)}
                     placeholder='Digite a altura do paciente'
                     required/>
                </label>
                <label>
                    Tipo Sanguineo:
                    <select name="horario" value={tipoSanguineo} onChange={(e)=>setTipoSanguineo(e.target.value)}>
                        {tipo.map((t,i)=>(
                            <option key={i} value={t.tipo +t.rh}>{t.tipo +t.rh}</option>
                        ))} 
                    </select>
                </label>
                <input className={styles.submit} type="submit" value="Confirmar"/>
            </form>
        </div>
    )
}