import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Authform from './components/Authform'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='bg-blue-950 w-full h-[100vh] flex flex-col justify-center items-center'>
        <Authform 
        headerText="Sign up" 
        userAction="Sign up" 
        action="sign up"/>
     </div> 
    </>
  )
}

export default App
