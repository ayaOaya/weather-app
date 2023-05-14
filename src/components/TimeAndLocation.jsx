import React from 'react'

const TimeAndLocation = () => {
  return (
    <>
       <div className="flex items-center justify-center my-6">
           <p className="text-white text-xl font-extralight">
            tuesday, 14 May 2022 | Local time : 13:55 PM
           </p>
       </div>

       <div className="flex items-center justify-center my-3">
          <p className='text-white text-3xl font-medium'>
            Berlin, DE
          </p>
       </div>
    </>
  )
}

export default TimeAndLocation