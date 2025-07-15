import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section id="home" className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-16 bg-black text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl tracking-tighter">
        Welcome to Noteflux.
      </h1>

      <TypeAnimation
        sequence={['Effortless Blogging. Organized',
            2000,
            '',
            500,
        ]}
        speed={50}
        repeat={Infinity}
        wrapper="p"
        className="text-[#898989] max-w-2xl text-5xl md:text-5xl font-bold tracking-tighter mt-1"
      />

      <div className="flex flex-col gap-y-1 md:flex-row md:gap-4">
        <Link to="/create"><button className="mt-8 px-6 py-2 bg-white text-black text-md md:text-lg rounded-full font-bold hover:bg-gray-200 cursor-pointer transition">
          Start Writing
        </button></Link>
        <button className="mt-3 md:mt-8 px-6 py-2 bg-[#2b2b2b] text-white text-md md:text-lg rounded-full font-bold cursor-pointer transition">
          Learn more
        </button>
      </div>
    </section>
  )
}

export default HeroSection
