import {useState,useEffect} from 'react'
import styles from './MySchedule.module.css'

export function MySchedule(){
    const[schedule,setSchedule] = useState([])

    const dados = [
        {
          "id":1,
          "especialidade":"cardiologista",
          "medico":"Souza",
          "data":"2023-12-15",
          "hora":"8",
          "paciente":"João Souza"
        },
        {
          "id":2,
          "especialidade":"cardiologista",
          "medico":"Souza",
          "data":"2023-12-15",
          "hora":"9",
          "paciente":"João Souza"
        }
    ]
    useEffect(()=>{
        async function fetchData(){
            const url = "http://localhost:5000/endereco"
            const res = await axios.get(url)
            const {data} = res.data;
            setSchedule(data);
          }
          fetchData();
    },[]);
    return(
        <div className={styles.conteudo}>
        <div className={styles.titulo}>
                <h1 className={styles.titulo}>Agendamentos</h1> 
        </div>
        <div className={styles.principal}>
            {!dados.length && (<div><h1>Ainda não há dados cadastrados</h1></div>)}
            {(dados.length != 0) && (<table className={styles.table}>
            <tr>
                
                    <th>Especialidade</th>
                    <th>Medico</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Paciente</th>
            </tr>
            {dados && (
                dados.map((a)=>(
                    <tr key={a.id}>
                        <td>{a.especialidade}</td>
                        <td>{a.medico}</td>
                        <td>{a.data}</td>
                        <td>{a.hora}</td>
                        <td>{a.paciente}</td>
                    </tr>
                ))
            )}
        </table>)}
        </div>
    </div>
    )
}