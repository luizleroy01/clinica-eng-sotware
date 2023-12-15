
import {Link} from 'react-router-dom';
import styles from './Home.module.css';
import clinica1 from '../../assets/img5.jpg';
import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

export function Home(){

    
    return(
        <>
        <Header/>
        <Navbar/>
        <div className={styles.corpo}>
            <div className={styles.mensagem_principal}>
                <h2 className={styles.titulo}>Bem-estar em cada consulta, sorriso em cada paciente</h2>
            </div>
            <div className={styles.principal}>
                <div className={styles.painel}>
                    <img src={clinica1} className={styles.img_principal} />
                </div>
                <div className={styles.texto}>
                    <p className={styles.texto_principal}>
                    Bem-vindo à nossa clínica médica dedicada a oferecer cuidado especializado a pessoas de todas as idades. 
                    Aqui, valorizamos a saúde integral e buscamos proporcionar um ambiente acolhedor, 
                    onde cada paciente se sinta cuidado e compreendido. 
                    Nossa equipe altamente qualificada de profissionais de saúde está comprometida em proporcionar um 
                    atendimento personalizado e eficaz,
                    utilizando as mais recentes tecnologias e abordagens médicas.
                    </p>
                </div> 
            </div>
            <div className={styles.mensagem}>
                <h3>Missão</h3>
            </div>
            <div className={styles.mensagem}>
                <p>Nossa missão é promover a saúde e o bem-estar ao oferecer 
                    serviços médicos de alta qualidade, 
                    centrados no paciente e atendimento</p>
            </div>
            <div className={styles.mensagem}>
                <h3>Valores</h3>
            </div>
            <div className={styles.mensagem}>
                <p >Na HealthCare, comprometemo-nos a ser um farol de integridade e empatia na busca contínua 
                    pela excelência em serviços de saúde. Guiados pelos princípios da inovação, colaboração e acessibilidade, 
                    buscamos não apenas tratar sintomas, mas nutrir relacionamentos duradouros com nossos pacientes.</p>
            </div>
            <div className={styles.mensagem}>
                <button className={styles.botao}>
                    <Link className={styles.link} to='/consulta'>Agende sua consulta agora</Link>
                </button>
            </div>
        </div>
        <Footer/>
        </>
        
    )
}