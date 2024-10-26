import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(() => setLoading(false))
}, [])

  return !loading ? (
    <div className = 'min-h-screen flex-auto flex-wrap content-between  rounded-xl '>
      <div className='w-full block rounded-xl backdrop-blur-md bg-white/30'>
        <Header />
        <main>
        <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
