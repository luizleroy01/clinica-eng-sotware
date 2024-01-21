import styles from './Form.module.css';
import { useState, useEffect} from 'react';
import {getDoctorRoles,getDoctorNames,getSchedule,saveDataSchedule,getDoctors} from '../../configuration.js';
import axios from 'axios';
export function FormAppointment(){

    const hoursDay =[8,9,10,11,12,13,14,15,16,17]

    const [doctorCode,setDoctorCode] = useState("")
    const[doctorName,setDoctorName] = useState("")
    const[doctorRole,setDoctorRole] = useState("cardiologista")
    const[date,setDate] = useState("")
    const[chooseHour,setChooseHour] = useState("")
    const[nomePaciente,setNomePaciente] = useState("")
    const[emailPaciente,setEmailPaciente] = useState("")
    const[telefonePaciente,setTelefonePaciente] = useState("")

    const[roles,setRoles] = useState([])
    const[doctors,setDoctors] = useState([])
    const[hours,setHours] = useState([])

    useEffect(()=>{
        async function fetchData(){
          const url = getDoctorRoles
          const res = await axios.get(url);
          const {data} = res.data;
          setRoles(data);
          console.log(data);
          console.log(getDoctorRoles)
        }
        fetchData()
      },[])

      const searchDoctors = (value) =>{
        setDoctorRole(value);
        console.log(value)
        async function fetchData(){
            const url = getDoctorNames+value;
            const res = await axios.get(url)
            const {data} = res.data;
            
            setDoctors(data)
            console.log(doctors);
        }
        fetchData();
      }

      const searchHours = (value)=>{
        setDate(value);
        const info = {
            data:date,
            nome:doctorName,
            especialidade:doctorRole
        }
        async function fetchData(){
            const url = getSchedule;

            const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(info)
            })
            
            const {data} = await res.json()

            console.log(data);

            let validHours = hoursDay.filter(h =>!data.includes(h))
            console.log(validHours);
            setHours(validHours);
        }
        fetchData()

      }
      const saveSchedule = async(schedule)=>{
        const url = saveDataSchedule
        const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(schedule)
        })
        return res.json()
    }

    const setDoctorData = (value)=>{
        setDoctorName(value);
        const info = {
            nome:value,
            especialidade:doctorRole
        }
       
        async function fetchData(){
            const url = getDoctors
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(info)
            });
            const {data} = res;
            console.log(data);
            return null;
        }
        const doctor = fetchData()
       
        setDoctorCode(doctor[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let emailIsValid = validarEmail(emailPaciente)
        if(!emailIsValid){
            return
        }
        const schedule ={
            medico:doctorName,
            date:date,
            hour:chooseHour,
            name:nomePaciente,
            phone:telefonePaciente,
            email:emailPaciente,
            codigo_medico:doctorCode
        }
        

        //const resposta = saveSchedule(schedule);
        console.log(schedule)
        
        setDoctorRole(roles[0])
        setDoctorName("")
        setDoctors([])
        setDate("")
        setChooseHour("")
        setHours([])
        setNomePaciente("")
        setEmailPaciente("")
        setTelefonePaciente("")
    }
    function validarEmail(email) {
        // Define a expressão regular para validar o formato do e-mail
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    //criar função para quando selecionar o médico, utilizar o codigo da pessoa para buscar o código do médico
    const searchDoctorCode = ()=>{
        //implementar
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Agendamento de consulta</h3>
                <label>
                    Especialidade:
                    <select name="especialidade" value={doctorRole} onChange={(e)=>searchDoctors(e.target.value)}>
                        {roles.map((role,i)=>(
                            <option key={i} value={role}>{role}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Medico:
                    <select name="medico" value={doctorName} onChange={(e)=>setDoctorData(e.target.value)}>
                        <option value="">Selecione o nome do médico</option>
                        {doctors.map((doctor)=>(
                            <option key={doctor.codigo} value={JSON.stringify({nome:doctor.nome,codigo:doctor.codigo})}>{doctor.nome}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Data da consulta:
                    <input type="date" 
                    name="data-consulta" 
                    value={date} onChange={(e)=>searchHours(e.target.value)} placeholder="Selecione a data da consulta"/>
                </label>
                <label>
                    Horário da consulta:
                    <select name="horario" value={chooseHour} onChange={(e)=>setChooseHour(e.target.value)}>
                        {hours.map((hour,i)=>(
                            <option key={i} value={hour}>{`${hour}:00`}</option>
                        ))} 
                    </select>
                </label>
                <label>
                    Nome:
                    <input type="text"
                     name="nome"
                     value={nomePaciente}
                     onChange={(e)=>setNomePaciente(e.target.value)}
                     placeholder='Digite seu nome'
                     required/>
                </label>
                <label>
                    Telefone:
                    <input type="text"
                     name="telefone"
                     value={telefonePaciente}
                     onChange={(e)=>setTelefonePaciente(e.target.value)}
                     placeholder='Digite seu telefone (xx)xxxxx-xxxx'
                     required/>
                </label>
                <label>
                    Email:
                    <input type="text"
                     name="email"
                     value={emailPaciente}
                     onChange={(e)=>setEmailPaciente(e.target.value)}
                     placeholder='Digite seu email'
                     required/>
                </label>
                <input className={styles.submit} type="submit" value="Agendar"/>
                
            </form>
        </div>
    )
}