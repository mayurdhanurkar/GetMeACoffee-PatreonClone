import React from 'react'

const about = () => {
  return (
    <div id="about" className='m-5'>
      <div className="text-white container flex flex-col">
        <h2 className='text-xl text-center font-bold'>Learn More About Us</h2>
       <div className="mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-xl">
  <iframe
    className="h-full w-full"
    src="https://www.youtube.com/embed/QtaorVNAwbI?si=uTx5QnQUDOdXe3yk"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</div>
      </div>
    </div>
  )
}

export default about
 