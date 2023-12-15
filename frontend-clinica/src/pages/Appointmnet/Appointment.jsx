import { Footer } from '../../components/Footer/Footer';
import { FormAppointment } from '../../components/FormAppointment/FormAppointment';
import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Navbar/Navbar';
import styles from './Appointment.module.css';

export function Appointment(){
    return(
        <>
        <Header/>
        <Navbar/>
        <div className={styles.pincipal}>
            <FormAppointment/>
        </div>
        <Footer/>
        </>
    )
}