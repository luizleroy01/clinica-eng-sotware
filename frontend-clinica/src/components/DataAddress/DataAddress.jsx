import {useState,useEffect} from 'react'
import styles from './DataAdress.module.css'
import axios from 'axios'

export function DataAddress(){
    const[address,setAdress] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const url = "http://localhost:5000/endereco"
            const res = await axios.get(url)
            const {data} = res.data;
            setAdress(data);
            console.log(data)
          }
          fetchData();
    },[]);
    return(
        <div className={styles.conteudo}>
        <div className={styles.titulo}>
                <h1 className={styles.titulo}>Endereço</h1> 
        </div>
        <div className={styles.principal}>
            {!address.length && (<div><h1>Ainda não há dados cadastrados</h1></div>)}
            {(address.length != 0) && (
            
            <table className={styles.table}>
               
            <tr>
                
                    <th>CEP</th>
                    <th>Logradouro</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>Estado</th>
            </tr>
            {address && (
                address.map((a)=>(
                    <tr key={a.id}>
                        <td>{a.cep}</td>
                        <td>{a.logradouro}</td>
                        <td>{a.bairro}</td>
                        <td>{a.cidade}</td>
                        <td>{a.estado}</td>
                    </tr>
                ))
            )}
        </table>)}
        </div>
        </div>
    )
}