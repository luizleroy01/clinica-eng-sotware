import {useState,useEffect} from 'react'
import styles from './DataPatients.module.css'

export function DataPatients(){
    const dados = [
        {
          "id":1,
          "nome":"João Souza",
          "telefone":"3330-9090",
          "email":"joao@gmail.com",
          "altura":"1.78",
          "peso":"80.0",
          "tipo_sanguineo":"AB+"
        },
        {
            "id":2,
            "nome":"Luiz",
            "telefone":"3331-9090",
            "email":"luiz@gmail.com",
            "altura":"1.80",
            "peso":"90.0",
            "tipo_sanguineo":"o+"
        },
        {
            "id":3,
            "nome":"Eduardo",
            "telefone":"3330-9091",
            "email":"edu@gmail.com",
            "altura":"1.90",
            "peso":"67.0",
            "tipo_sanguineo":"A-"
        }
      ]
    const[patients,setPatients] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const url = ""
            const res = await fetch(url)
            const data = await res.json()
            setPatients(data);
            console.log(getDoctorRoles)
          }
          fetchData()
    })
    return(
        <div className={styles.conteudo}>
        <div className={styles.titulo}>
                <h1 className={styles.titulo}>Pacientes</h1> 
        </div>
        <div className={styles.principal}>
            {!dados.length && (<div><h1>Ainda não há dados cadastrados</h1></div>)} 
            
            {(dados.length!= 0) && (<table className={styles.table}>
            <thead>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>altura</th>
                    <th>peso</th>
                    <th>Tipo sanguineo</th>
            </thead>
            {dados && (
                dados.map((p)=>(
                    <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>{p.telefone}</td>
                        <td>{p.email}</td>
                        <td>{p.altura}</td>
                        <td>{p.peso}</td>
                        <td>{p.tipo_sanguineo}</td>
                    </tr>
                ))
            )}
        </table>)}
        </div>
    </div>
    )
}