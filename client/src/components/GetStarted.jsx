import React from 'react'
import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <>
   <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-16 bg-black text-white">
         <h1 className="text-3xl md:text-4xl font-bold max-w-3xl tracking-tighter">
        Get started now.
      </h1>  
      <p className="text-[#898989] max-w-3xl text-2xl md:text-3xl font-bold tracking-tighter mt-1">Create your own blog today.</p>
    <div className="">
        <Link to="/register"><button className="mt-6 px-4 py-1 bg-white text-black text-md md:text-lg rounded-full font-bold hover:bg-gray-200 cursor-pointer transition">
          Sign Up</button>
        </Link>
    </div>
   </section>
    <hr className="border-[0.1px] border-[#898989] mx-auto w-9/10 mt-[-1px]" />
    </>
  )
}

export default GetStarted
