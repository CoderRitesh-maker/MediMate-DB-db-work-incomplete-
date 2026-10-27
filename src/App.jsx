import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import DemoModeNotification from './components/DemoModeNotification'

// Pages
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import DoctorProfile from './pages/DoctorProfile'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EmergencyPage from './pages/EmergencyPage'
import AdminPage from './pages/AdminPage'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancelled from './pages/PaymentCancelled'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
}

function App() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false)
  const [showDemoNotification, setShowDemoNotification] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Notification */}
      {showDemoNotification && (
        <DemoModeNotification onClose={() => setShowDemoNotification(false)} />
      )}
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content with page transitions */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="home"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <HomePage />
                </motion.div>
              } 
            />
            <Route 
              path="/search" 
              element={
                <motion.div
                  key="search"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <SearchPage />
                </motion.div>
              } 
            />
            <Route 
              path="/doctor/:id" 
              element={
                <motion.div
                  key="doctor"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <DoctorProfile />
                </motion.div>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <motion.div
                  key="dashboard"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Dashboard />
                </motion.div>
              } 
            />
            <Route 
              path="/login" 
              element={
                <motion.div
                  key="login"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <LoginPage />
                </motion.div>
              } 
            />
            <Route 
              path="/register" 
              element={
                <motion.div
                  key="register"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <RegisterPage />
                </motion.div>
              } 
            />
            <Route 
              path="/emergency" 
              element={
                <motion.div
                  key="emergency"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <EmergencyPage />
                </motion.div>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <motion.div
                  key="admin"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <AdminPage />
                </motion.div>
              } 
            />
            <Route 
              path="/payment-success" 
              element={
                <motion.div
                  key="payment-success"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <PaymentSuccess />
                </motion.div>
              } 
            />
            <Route 
              path="/payment-cancelled" 
              element={
                <motion.div
                  key="payment-cancelled"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <PaymentCancelled />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating ChatBot */}
      <ChatBot 
        isOpen={isChatBotOpen} 
        onToggle={() => setIsChatBotOpen(!isChatBotOpen)} 
      />
    </div>
  )
}

export default App