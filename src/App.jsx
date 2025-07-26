import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles.css'

// Import hooks
import useMobileOptimization from './hooks/useMobileOptimization'

// Import components
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Story from './components/Story'
import Statistics from './components/Statistics'
import Vision from './components/Vision'
import Mission from './components/Mission'
import Services from './components/Services'
import Footer from './components/Footer'

function App() {
  // Initialize mobile optimizations
  useMobileOptimization()

  return (
    <Router basename="/thara3">
      <div className="App">
        <LoadingScreen />
        <Navigation />
        <main>
          <Hero />
          <Story />
          <Statistics />
          <Vision />
          <Mission />
          <Services />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
