import styles from './NavBarRestrict.module.css'


export function NavbarRestrict({applyCadastroProntuario,applyCadastroPaciente,applyCadastroFuncionario,applyFuncionario,applyPaciente,applyEndereco,applyAgendamento,applyConsulta}){
    return(
        <div>
            <nav className={styles.principal}>
                <ul>
                    <li><button onClick={()=>applyCadastroProntuario()}>Cadastrar prontuário</button></li>
                    <li><button onClick={()=>applyCadastroFuncionario()}>Cadastrar funcionario</button></li>
                    <li><button onClick={()=>applyCadastroPaciente()}>Cadastrar paciente</button></li>
                    <li><button onClick={()=>applyFuncionario()}>Funcionários</button></li>
                    <li><button onClick={()=>applyPaciente()}>Pacientes</button></li>
                    <li><button onClick={()=>applyEndereco()}>Endereços</button></li>
                    <li><button onClick={()=>applyAgendamento()}>Agendamentos</button></li>
                    <li><button onClick={()=>applyConsulta()}>Minhas Consultas</button></li>
                </ul>
            </nav>
        </div>
        
    )
}