import logoClinica from '../../assets/clinic.svg'
import styles from './Header.module.css'
import {Link} from 'react-router-dom'
export function Header(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.principal}>
                     <img src={logoClinica} alt="Clinica Médica" />  
                     <h1>HealthCare</h1>
                </div>
                <div className={styles.login}>
                    <button><Link className={styles.funcao} to="/login">Login</Link></button>
                </div>
            </header>
        </>
    )
}