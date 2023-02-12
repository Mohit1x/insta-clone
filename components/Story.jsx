import React from 'react'

function Story({img,name}) {
  return (
    <div>
         <img
          src={img}
          alt="avatar"
          className="h-14 w-14 object-cover p-[1.5px] border-red-500 border 
           rounded-full border-2 cursor-pointer hover:scale-110 transition transfer
           duration-200 ease-out"
        />
        <p className=' text-xs w-14 truncate
        text-center'>{name}</p>
    </div>
  )
}

export default Story