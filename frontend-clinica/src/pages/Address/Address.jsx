import { Footer } from "../../components/Footer/Footer";
import { FormAddress } from "../../components/FormAddress/FormAddress";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from './Address.module.css';
export function Address(){
    return(
        <>
        <Header/>
        <Navbar/>
        <div className={styles.principal}>
            <FormAddress/>
        </div>
        <Footer/>
        </>
    )
}