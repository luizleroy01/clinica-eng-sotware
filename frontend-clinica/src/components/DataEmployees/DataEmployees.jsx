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
                    <th>Salário</th>
                    <th>Data de inicio</th>
            </tr>
            {(
                employees.map((e)=>(
                    <tr key={e.person.codigo}>
                        <td>{e.person.nome}</td>
                        <td>{e.person.telefone}</td>
                        <td>{e.person.email}</td>
                        <td>{e.employee.salario}</td>
                        <td>{e.employee.data_contrato}</td>
                    </tr>
                ))
            )}
        </table>)}
        </div>
    </div>
    )
}