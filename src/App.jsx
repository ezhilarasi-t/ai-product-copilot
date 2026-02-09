import { useState } from 'react'
import CustomerRegisterForm from './components/CustomerRegisterForm'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='min-h-screen px-4 py-8 bg-black text-white'>
    <CustomerRegisterForm />
   </div>
  )
}

export default App
