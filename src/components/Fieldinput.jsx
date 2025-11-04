import React from 'react'

const Fieldinput = ({label,typeInput}) => {
  return (
    <div className='flex flex-col gap-1'>
        
        <p className='text-white font-semibold'>{label}</p>
        
            <input  
            required
  type={typeInput} 
  className='rounded-lg w-[25vw] border border-blue-700 bg-blue-900 px-3 py-1 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'  
/>
        
        
        
    </div>
  )
}

export default Fieldinput;