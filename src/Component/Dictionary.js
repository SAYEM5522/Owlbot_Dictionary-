import React, { useState } from 'react'
import Layout from './Layout'
import { data } from './Data'
const Dictionary = () => {
  const [acttiveIndex,setACtiveIndex]=useState(0)
  const ItemSelect=(index)=>{
    setACtiveIndex(index)
  }
  return (
    <div className='w-[60%] h-full bg-[whitesmoke] flex flex-col items-start'>
      <div className='flex border w-fit flex-row  mt-2 mx-auto rounded-md'>
      {
          data.map((item,index)=>{
            return(
             <div key={index} onClick={()=>ItemSelect(index)} className={`flex ${index===acttiveIndex?"bg-black text-white ":""} p-2 rounded-md cursor-pointer items-center`}>
              <p className=' px-8 font-medium text-md' >{item.name}</p>
             </div>
            )
          })
          
        }
      </div>
      <div>
        <Layout index={acttiveIndex}/>
      </div>
     
    </div>
  )
}

export default Dictionary