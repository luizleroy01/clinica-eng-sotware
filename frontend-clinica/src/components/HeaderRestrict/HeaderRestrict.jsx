import logoClinica from '../../assets/clinic.svg'
import styles from './HeaderRestrict.module.css'

export function HeaderRestrict(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.principal}>
                     <img src={logoClinica} alt="Clinica Médica" />  
                     <h1>HealthCare</h1>
                </div>
            </header>
        </>
    )
}