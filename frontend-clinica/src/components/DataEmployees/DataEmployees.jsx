import {useState,useEffect} from 'react'
import styles from './DataEmployees.module.css'
import { dataEmployee } from '../../configuration'
import axios from 'axios'

export function DataEmployees(){
    const[employees,setEmployees] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const url = dataEmployee;
            const res = await axios.get(url)
            const {data} = res.data;
            setEmployees(data);
            console.log(data)
          }
          fetchData()
    },[])
    return(
        <div className={styles.conteudo}>
        <div className={styles.titulo}>
                <h1 className={styles.titulo}>Funcionários</h1> 
        </div>
        <div className={styles.principal}>
           {!employees.length && (<div><h1>Ainda não há dados cadastrados</h1></div>)} 
           {(employees.length != 0) && (<table className={styles.table}>
            <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Data de inicio</th>
            </tr>
            {(
                employees.map((e)=>(
                    <tr key={e.id}>
                        <td>{e.nome}</td>
                        <td>{e.telefone}</td>
                        <td>{e.typeEmployee}</td>
                        <td>{e.dataInicio}</td>
                    </tr>
                ))
            )}
        </table>)}
        </div>
    </div>
    )
}