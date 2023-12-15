import styles from './FormRecord.module.css'
import {useState} from 'react'
export function FormRecord(){
    const[anamenese,setAnamenese] = useState("");
    const[medicamentos,setMedicamentos] = useState("");
    const[atestados,setAtestados] = useState("");
    const[exames,setExames] = useState("");
    const[nomePaciente,setNomePaciente] = useState("");

    const saveRecord = (record)=>{
        async function fetchData(){
            const url = ""
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(record)
            })
            return res.json();
        }
        fetchData();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let emailIsValid = validarEmail(emailPaciente)
        if(!emailIsValid){
            return
        }
        const record ={
            name:nomePaciente,
            anamenese:anamenese,
            medicamentos:medicamentos,
            atestados:atestados,
            exames:exames
        }
        

        const resposta = saveRecord(record);
        console.log(schedule)
        
        
        setNomePaciente("");
        setMedicamentos("");
        setAtestados("");
        setExames("");
        setAnamenese("");
    }
    return(
        <div>
                <form onSubmit={handleSubmit}>
                <h3>Cadastro de prontuário</h3>
                <label>
                    Nome:
                    <input type="text"
                     name="nome"
                     value={nomePaciente}
                     onChange={(e)=>setNomePaciente(e.target.value)}
                     placeholder='Digite o nome do paciente'
                     required/>
                </label>
                <label>
                    Anamnese:
                    <textarea  name="w3review"
                     value={anamenese}
                     onChange={(e)=>setAnamenese(e.target.value)}
                     rows="7" 
                     cols="50"></textarea>
                </label>
                <label>
                    Medicamentos:
                    <textarea  name="w3review"
                     value={medicamentos}
                     onChange={(e)=>setMedicamentos(e.target.value)}
                     rows="7" 
                     cols="50"></textarea>
                </label>
                <label>
                    Atestados:
                    <textarea  name="w3review"
                     value={atestados}
                     onChange={(e)=>setAtestados(e.target.value)}
                     rows="7" 
                     cols="50"></textarea>
                </label>
                <label>
                    Exames:
                    <textarea  name="w3review"
                     value={exames}
                     onChange={(e)=>setExames(e.target.value)}
                     rows="7" 
                     cols="50"></textarea>
                </label>
                <input className={styles.submit} type="submit" value="Agendar"/>
                </form>
            </div>
    )
}