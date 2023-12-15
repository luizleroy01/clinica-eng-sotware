import styles from './NavBar.module.css'
import {Link} from 'react-router-dom'

export function Navbar(){
    return(
        <div>
            <nav className={styles.principal}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/galeria">Galeria</Link></li>
                    <li><Link to="/consulta">Agendar Consulta</Link></li>
                    <li><Link to="/enderecos">Cadastrar Endereços</Link></li>
                </ul>
            </nav>
        </div>
        
    )
}