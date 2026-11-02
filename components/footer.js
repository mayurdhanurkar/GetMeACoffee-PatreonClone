import React from 'react'

const footer = () => {
  return (
    <footer className='bg-gray-900 text-white md:p-4 p-3 flex text-center justify-center items-center  gap-4'>
      <div className="md:text-lg text-sm font-bold">Get Me a Coffee</div>
      <div className="text-sm  ">
        <span className='text-[20px]'>&copy;</span> {new Date().getFullYear()} Get Me a Coffee.<span > All rights reserved.</span>
      </div>
    </footer>
  )
}

export default footer
