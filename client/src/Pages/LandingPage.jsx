import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import BlogSection from '../components/BlogSection'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div>
      {/* Navbar */}
        <Navbar/>
      {/* Hero Section */}
        <HeroSection/>
      {/* Blog Posts */}
        <BlogSection/>

      {/* Getting started */}
        <GetStarted/>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default LandingPage
