import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Search, 
  Clock, 
  Shield, 
  ArrowRight,
  Stethoscope,
  Activity,
  Settings,
  Lock
} from 'lucide-react'

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-20, 20],
      transition: {
        y: {
          yoyo: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }
    }
  }

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Doctor Search",
      description: "Find the right doctor for your needs with our intelligent search system"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Book appointments instantly with real-time availability"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-level security"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health Monitoring",
      description: "Track your health journey with comprehensive monitoring tools"
    }
  ]


  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full opacity-20"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary-100 rounded-full opacity-20"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-primary-200 rounded-full opacity-30"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="container mx-auto px-6 z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Your Health,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  Our Priority
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Connect with healthcare professionals instantly. 
                From symptom checking to appointment booking, we've got you covered.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              variants={itemVariants}
            >
              <motion.button
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Scroll to bottom and open chatbot
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  setTimeout(() => {
                    const chatButton = document.querySelector('[data-chatbot-toggle]');
                    if (chatButton) chatButton.click();
                  }, 500);
                }}
              >
                <Activity className="w-5 h-5 mr-2" />
                Check Your Symptoms
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <Link to="/search">
                <motion.button
                  className="bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find a Doctor Near You
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* Floating Medical Icons */}
        <motion.div
          className="absolute top-20 left-20 text-primary-300"
          animate={{ 
            y: [-10, 10],
            rotate: [-5, 5]
          }}
          transition={{
            y: { yoyo: Infinity, duration: 4 },
            rotate: { yoyo: Infinity, duration: 3 }
          }}
        >
          <Stethoscope className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-20 text-secondary-300"
          animate={{ 
            y: [10, -10],
            rotate: [5, -5]
          }}
          transition={{
            y: { yoyo: Infinity, duration: 3 },
            rotate: { yoyo: Infinity, duration: 4 }
          }}
        >
          <Heart className="w-12 h-12" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediMate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience healthcare like never before with our innovative platform
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card text-center group hover:scale-105 transition-transform duration-300"
                variants={itemVariants}
              >
                <div className="text-primary-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Create your account to get started.
            </p>
            <Link to="/register">
              <motion.button
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg flex items-center justify-center mx-auto group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Admin Access Section */}
      <section className="py-8 bg-gray-100 border-t">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Healthcare Professionals</h3>
              <p className="text-gray-600 text-sm">Manage your practice and patient appointments</p>
            </div>
            
            <div className="flex space-x-4">
              <Link to="/admin">
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin Portal</span>
                </motion.button>
              </Link>
              
              <Link to="/search">
                <motion.button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Find Doctors</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Admin Access - Floating Button */}
      <Link to="/admin">
        <motion.div
          className="fixed bottom-4 left-4 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Admin Portal"
          >
            <Lock className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </motion.div>
      </Link>
    </div>
  )
}

export default HomePage