import React from 'react'

const extra = () => {
  return (
    <div className='m-5'>
      <div className="text-white container flex flex-col">
        <h2 className='text-xl text-center font-bold'>Your Well Wisher can buy you a coffee</h2>
        <div className="flex items-center justify-around gap-2 md:gap-0 mt-7">
            <div className="flex flex-col items-center ">
                <img className='' src="/man.gif" width={66} alt="" />
                <p className='my-2 font-bold text-center'>Help Others</p>
            <p className='hidden md:inline text-center  '>Lets Help Each Other to Grow Together!</p>
            </div>
            <div className="flex flex-col items-center">
                <img src="/coin.gif" width={66} alt="" />
                <p className='my-2 font-bold text-center'>Fund Yourself</p>
            <p className='hidden md:inline text-center '>Lets Help Each Other to Grow Together!</p>
            </div>
            <div className="flex flex-col items-center">
                <img src="/group.gif" width={66} alt="" />
                <p className='my-2 font-bold text-center'>Build Community</p>
            <p className='hidden md:inline text-center  '>Lets Help Each Other to Grow Together!</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default extra
