import Hero from '../components/Landing/Hero'
import Features from '../components/Landing/Features'
import Comparison from '../components/Landing/Comparison'
import Navbar from '../components/Landing/Navbar'
import Team from '../components/Landing/Team'
import Footer from '../components/Landing/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage