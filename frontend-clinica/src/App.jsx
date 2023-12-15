
import './App.module.css';

import { Footer } from './components/Footer/Footer'

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import {useState} from 'react'

import {Home} from './pages/Home/Home'
import {Galery} from './pages/Galery/Galery'
import {Address} from './pages/Address/Address'
import {Appointment} from './pages/Appointmnet/Appointment'
import { Login } from './pages/Login/Login'
import { Menu } from './pages/Menu/Menu';

function App() {
  const[isLogged,setIsLogged] = useState(true);
  const onLogin = (estado)=>{
    setIsLogged(estado);
  }
  return (
    <div>
      {/*rotas que podem ser acessadas*/} 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/galeria" element={<Galery/>}/>
          <Route path="/consulta" element={<Appointment/>}/>
          <Route path="/enderecos" element={<Address/>}/>
          <Route path="/login" element={<Login onLogin={onLogin}/>}/>
          <Route path="/menu" element={isLogged === true ? <Menu/> : <Navigate to='/login' replace={true}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
