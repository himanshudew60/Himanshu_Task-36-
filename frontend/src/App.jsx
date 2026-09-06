import { BrowserRouter,Routes,Route } from 'react-router-dom'

import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import Navbar from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
         <Navbar />
       

         <div className='pages'>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
            </Routes> 
          </div> 
          
     
      </div>
  )
}

export default App
