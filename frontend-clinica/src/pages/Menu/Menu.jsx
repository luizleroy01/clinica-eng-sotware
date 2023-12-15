import { DataAddress } from '../../components/DataAddress/DataAddress';
import { DataEmployees } from '../../components/DataEmployees/DataEmployees';
import { DataPatients } from '../../components/DataPatients/DataPatients';
import { Footer } from '../../components/Footer/Footer';
import { FormEmployee } from '../../components/FormEmployee/FormEmployee';
import { FormPatient } from '../../components/FormPatient/FormPatient';
import { FormRecord } from '../../components/FormRecord/FormRecord';
import { HeaderRestrict } from '../../components/HeaderRestrict/HeaderRestrict';
import { NavbarRestrict } from '../../components/NavbarRestrict/NavbarRestrict';

import {useState} from 'react'

import styles from './Menu.module.css';
import { DataAppointments } from '../../components/DataAppointments/DataAppointments';
import { MySchedule } from '../../components/MySchedule/MySchedule';
export function Menu(){
    const[cadastoProntuario,setCadastroProntuario] = useState(true);
    const[cadastoFuncionario,setCadastroFuncionario] = useState(false);
    const[cadastoPaciente,setCadastroPaciente] = useState(false);
    const[funcionarios,setFuncionarios] = useState(false);
    const[pacientes,setPacientes] = useState(false);
    const[enderecos,setEnderecos] = useState(false);
    const[agendamentos,setAgendamentos] = useState(false);
    const[consultas,setConsultas] = useState(false);

    const applyCadastroProntuario = () =>{
        setCadastroProntuario(true);
        setCadastroFuncionario(false);
        setCadastroPaciente(false);
        setFuncionarios(false);
        setPacientes(false);
        setEnderecos(false);
        setAgendamentos(false);
        setConsultas(false);
    }
    const applyCadastroFuncionario = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(true);
        setCadastroPaciente(false);
        setFuncionarios(false);
        setPacientes(false);
        setEnderecos(false);
        setAgendamentos(false);
        setConsultas(false);
    }
    const applyCadastroPaciente = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(false);
        setCadastroPaciente(true);
        setFuncionarios(false);
        setPacientes(false);
        setEnderecos(false);
        setAgendamentos(false);
        setConsultas(false);
    }
    const applyFuncionario = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(false);
        setCadastroPaciente(false);
        setFuncionarios(true);
        setPacientes(false);
        setEnderecos(false);
        setAgendamentos(false);
        setConsultas(false);
    }
    const applyPaciente = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(false);
        setCadastroPaciente(false);
        setFuncionarios(false);
        setPacientes(true);
        setEnderecos(false);
        setAgendamentos(false);
        setConsultas(false);
    }
    const applyEndereco = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(false);
        setCadastroPaciente(false);
        setFuncionarios(false);
        setPacientes(false);
        setEnderecos(true);
        setAgendamentos(false);
        setConsultas(false);
    }
    const applyAgendamento = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(false);
        setCadastroPaciente(false);
        setFuncionarios(false);
        setPacientes(false);
        setEnderecos(false);
        setAgendamentos(true);
        setConsultas(false);
    }
    const applyConsulta = () =>{
        setCadastroProntuario(false);
        setCadastroFuncionario(false);
        setCadastroPaciente(false);
        setFuncionarios(false);
        setPacientes(false);
        setEnderecos(false);
        setAgendamentos(false);
        setConsultas(true);
    }
    return(
        <>
            <HeaderRestrict/>
            <NavbarRestrict
                applyCadastroProntuario={applyCadastroProntuario}
                applyCadastroFuncionario={applyCadastroFuncionario}
                applyCadastroPaciente={applyCadastroPaciente}
                applyFuncionario={applyFuncionario}
                applyPaciente={applyPaciente}
                applyEndereco={applyEndereco}
                applyAgendamento={applyAgendamento}
                applyConsulta={applyConsulta}
            />
            <div className={styles.principal}>
              {cadastoPaciente && (<FormPatient/>)}
              {cadastoFuncionario && (<FormEmployee/>)}
              {cadastoProntuario && (<FormRecord/>)}
              {funcionarios && (<DataEmployees/>)}
              {pacientes && (<DataPatients/>)}
              {enderecos && (<DataAddress/>)}
              {agendamentos && (<DataAppointments/>)}
              {consultas && (<MySchedule/>)}
            </div>
            <Footer/>
        </>
    )
}