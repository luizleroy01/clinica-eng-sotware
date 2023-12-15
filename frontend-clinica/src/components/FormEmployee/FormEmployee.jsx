import {useState} from 'react'
import styles from './FormEmployee.module.css'
export function FormEmployee(){
    const[nome,setNome] = useState("")
    const[email,setEmail] = useState("")
    const[telefone,setTelefone] = useState("")
    const[logradouro,setLogradouro] = useState("")
    const[bairro,setBairro] = useState("")
    const[cidade,setCidade] =useState("")
    const[estado,setEstado] = useState("")
    const[cep,setCep] = useState("")
    const[typeEmployee,setTypeEmployee] = useState("")
    const[doctorRole,setDoctorRole] = useState("")
    const[crm,setCrm] = useState("")
    const[dataInicio,setDataInicio] = useState("")
    const[password,setPassword] = useState("")
    const[salario,setSalario] = useState("")

    const roles = ['comum','médico'];

    const sendEmployee = async(employee)=>{
        const url = "http://localhost:5000/funcionario";
        const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(employee)
        })
        return res.json()
    }

    const fetchAddress = (value) =>{
        setCep(value);
        if(value.length == 8){
            //const address = searchAddress(value);
            console.log("chamou fetch")
            let address =null
            if(address){
                setLogradouro(address.logradouro)
                setBairro(address.bairro)
                setCidade(address.cidade)
                setEstado(address.estado)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let cepIsValid = validarCEP(cep)
        if(!cepIsValid){
            return
        }
        const employee ={
            nome:nome,
            email:email,
            telefone:telefone,
            cep:cep,
            logradouro:logradouro,
            bairro:bairro,
            cidade:cidade,
            estado:estado,
            tipo:typeEmployee,
            especialidade:doctorRole,
            crm:crm,
            data:dataInicio,
            senha:password,
        }
        

        const response = sendEmployee(employee)
        
        setNome("")
        setEmail("")
        setTelefone("")
        setCep("")
        setLogradouro("")
        setBairro("")
        setCidade("")
        setEstado("")
        setTypeEmployee("")
        setDoctorRole("")
        setDataInicio("")
        setPassword("")
        setCrm("")
        

    }
    const siglas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
        'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
      ];
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
                <h3>Cadastro de funcionário</h3>
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
                     onChange={(e)=>fetchAddress(e.target.value)}
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
                    Data de início:
                    <input type="date" 
                    name="dataInicio" 
                    value={dataInicio} 
                    onChange={(e)=>setDataInicio(e.target.value)} />
                </label>
                <label>
                    Salário:
                    <input type="text"
                        name="salario"
                        value={salario}
                        onChange={(e)=>setSalario(e.target.value)}
                        placeholder="Salário do funcionário"
                        required
                        />
                </label>
                <label>
                    Senha:
                    <input type="text"
                        name="senha"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Salário do funcionário"
                        required
                        />
                </label>
                <label>
                    Tipo de funcionario:
                    <select name="tipoFuncionario" value={typeEmployee} onChange={(e)=>setTypeEmployee(e.target.value)}>
                        {roles.map((role,i)=>(
                            <option key={i} value={role}>{role}</option>
                        ))}
                    </select>
                </label>
                {typeEmployee == "médico" && (
                    <label>
                        Especialidade:
                        <input type="text"
                            name="especialidade"
                            value={doctorRole}
                            onChange={(e)=>setDoctorRole(e.target.value)}
                            placeholder="Especialidade do médico"
                            />
                    </label>
                )}
                {typeEmployee == "médico" && (
                    <label>
                        CRM:
                        <input type="text"
                            name="crm"
                            value={crm}
                            onChange={(e)=>setCrm(e.target.value)}
                            placeholder="CRM do médico"
                            />
                    </label>
                )}
                <input className={styles.submit} type="submit" value="Confirmar"/>
            </form>
        </div>
    )
}