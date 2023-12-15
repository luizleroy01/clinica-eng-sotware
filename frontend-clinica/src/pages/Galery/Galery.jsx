import clinica1 from '../../assets/img1.jpg';
import clinica2 from '../../assets/img2.jpg';
import clinica3 from '../../assets/img3.jpg';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Navbar/Navbar';

import styles from './Galery.module.css';
export function Galery(){
    return(
        <>
        <Header/>
        <Navbar/>
        <div className={styles.principal}>
            <div className={styles.titulo}>
                <h2>Conheça mais a nossa clínica</h2> 
            </div>
            <div className={styles.images}>
                <img src={clinica1} />
            </div>
            <div className={styles.images}>
                <img src={clinica2} />
            </div>
            <div className={styles.images}>
                <img src={clinica3} />
            </div>
        </div>
        <Footer/>
        </>
    )
}