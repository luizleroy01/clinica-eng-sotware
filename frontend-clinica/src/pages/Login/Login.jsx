import {useState} from 'react'
import styles from './Login.module.css'
import { getUserLogin,baseURL } from '../../configuration.js'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer.jsx'
import { Header } from '../../components/Header/Header.jsx'
import { Navbar } from '../../components/Navbar/Navbar.jsx'

export function Login({onLogin}){
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailIsValid = validarEmail(email)
        if(!emailIsValid){
            return
        }
        const login ={
            email:email,
            password:password,
        }
        console.log(login)
        async function fetchData(){
            console.log("chamou")
            console.log(getUserLogin)
            const url = getUserLogin
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)

            data.forEach((d)=>{
                if(d.email == email && d.password == password){
                    onLogin(true)
                    window.open(baseURL + 'menu',"_blank");
                    navigate("/");
                }
            })
            
        }
        fetchData()
        setEmail("")
        setPassword("")
    }
    function validarEmail(email) {
        // Define a expressão regular para validar o formato do e-mail
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    return(
        <>
        <Header/>
        <Navbar/>
        <div className={styles.principal}>
            <form onSubmit={handleSubmit}>
            <h2>Bem vindo !</h2>
            <label>
                    Email:
                    <input type="email"
                     name="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     placeholder='Digite seu email'
                     required/>
                </label>
                <label>
                    Senha:
                    <input type="password"
                        name="senha"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                        />
                </label>
                <input className={styles.submit} type="submit" value="Entrar"/>
            </form>
        </div>
        <Footer/>
        </>
    )
}