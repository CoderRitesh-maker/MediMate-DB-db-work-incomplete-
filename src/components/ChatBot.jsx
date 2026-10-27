import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  AlertCircle,
  ArrowRight,
  Loader
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { medicalTrainingData } from '../data/medicalTrainingData'

const ChatBot = ({ isOpen, onToggle }) => {
  // Enhanced Medical Knowledge Base with comprehensive training data
  const medicalKnowledgeBase = {
    symptoms: {
      // Merge original symptoms with training data
      ...medicalTrainingData.symptoms,
      // Keep important emergency symptoms
      chestPain: {
        description: 'Discomfort or pain in the chest area',
        commonCauses: ['Heart problems', 'Lung issues', 'Muscle strain', 'Acid reflux'],
        medications: ['Nitroglycerin (if prescribed)', 'Aspirin (if advised by doctor)', 'Antacids (for reflux)'],
        homeRemedies: ['Sit up and rest', 'Loosen tight clothing', 'Take slow, deep breaths'],
        emergency: ['Severe crushing pain', 'Pain radiating to arm/jaw', 'Shortness of breath', 'Sweating and nausea'],
        specialist: 'cardiologist'
      }
    },
    firstAid: {
      // Merge original first aid with training data
      ...medicalTrainingData.firstAid,
      bleeding: {
        steps: ['Apply direct pressure', 'Elevate if possible', 'Use clean bandages', 'Call 911 if severe'],
        emergency: ['Spurting blood', 'Soaked bandages', 'Signs of shock']
      },
      choking: {
        steps: ['Encourage coughing', 'Back blows', 'Abdominal thrusts', 'Call 911 if unconscious'],
        emergency: ['Cannot speak or breathe', 'Blue lips or face', 'Unconsciousness']
      }
    },
    emergencySignals: [
      ...medicalTrainingData.emergencySignals,
      'chest pain',
      'heart attack symptoms',
      'stroke symptoms'
    ]
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your virtual health assistant powered by medical knowledge. I can help you understand symptoms, provide first-aid guidance, and connect you with the right healthcare professionals. What symptoms are you experiencing?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [currentStep, setCurrentStep] = useState('initial')
  const [isTyping, setIsTyping] = useState(false)
  const [userSymptoms, setUserSymptoms] = useState('')
  const [symptomDuration, setSymptomDuration] = useState(null)
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addBotMessage = (content, delay = 1000) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      addMessage(content, 'bot')
    }, delay)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addMessage(inputValue)
    processUserInput(inputValue)
    setInputValue('')
  }

  const analyzeSymptoms = (symptoms) => {
    const lowerSymptoms = symptoms.toLowerCase()
    let matchedSymptoms = []
    let emergencyDetected = false

    // Check for emergency signals
    for (const signal of medicalKnowledgeBase.emergencySignals) {
      if (lowerSymptoms.includes(signal)) {
        emergencyDetected = true
        break
      }
    }

    // Match symptoms with knowledge base
    Object.keys(medicalKnowledgeBase.symptoms).forEach(symptomKey => {
      const symptom = medicalKnowledgeBase.symptoms[symptomKey]
      if (lowerSymptoms.includes(symptomKey.toLowerCase()) || 
          symptom.commonCauses.some(cause => lowerSymptoms.includes(cause.toLowerCase()))) {
        matchedSymptoms.push({ key: symptomKey, ...symptom })
      }
    })

    return { matchedSymptoms, emergencyDetected }
  }

  const processUserInput = (input) => {
    switch (currentStep) {
      case 'initial':
        setUserSymptoms(input)
        const analysis = analyzeSymptoms(input)
        
        if (analysis.emergencyDetected) {
          setCurrentStep('emergency')
          addBotMessage(
            `🚨 **EMERGENCY DETECTED** 🚨\n\nBased on your symptoms, this could be a medical emergency.\n\n**CALL 911 IMMEDIATELY**\n\nDo not wait - seek immediate medical attention. While waiting for emergency services:\n\n• Stay calm\n• Do not leave the person alone\n• Follow basic first aid if trained\n• Have someone meet the ambulance\n\n**This is not a substitute for professional medical care.**`,
            1000
          )
          return
        }

        if (analysis.matchedSymptoms.length > 0) {
          setCurrentStep('symptom-analysis')
          const symptom = analysis.matchedSymptoms[0]
          addBotMessage(
            `I understand you're experiencing ${symptom.key.toLowerCase()}. ${symptom.description}\n\nFor how many days have you been experiencing these symptoms? Please provide a number (e.g., 1, 3, 7).`,
            1500
          )
        } else {
          setCurrentStep('duration')
          addBotMessage(
            "Thank you for describing your symptoms. For how many days have you been experiencing these symptoms? Please provide a number (e.g., 1, 3, 7)."
          )
        }
        break
      
      case 'duration':
      case 'symptom-analysis':
        const duration = parseInt(input)
        setSymptomDuration(duration)
        
        if (isNaN(duration)) {
          addBotMessage("Please provide the number of days as a number (e.g., 1, 2, 5).")
          return
        }

        const symptomAnalysis = analyzeSymptoms(userSymptoms)
        
        if (duration <= 2) {
          setCurrentStep('short-term')
          let advice = `Since you've been experiencing these symptoms for ${duration} day(s), here are some suggestions:\n\n`
          
          if (symptomAnalysis.matchedSymptoms.length > 0) {
            const symptom = symptomAnalysis.matchedSymptoms[0]
            advice += `**For ${symptom.key.charAt(0).toUpperCase() + symptom.key.slice(1)}:**\n${symptom.description}\n\n`
            
            // Add medications (limit to 2-3 as requested)
            if (symptom.medications && symptom.medications.length > 0) {
              advice += `**Medications (consult physician first):**\n`
              symptom.medications.slice(0, 3).forEach(med => {
                advice += `• ${med}\n`
              })
              advice += `\n`
            }
            
            // Add home remedies
            if (symptom.homeRemedies && symptom.homeRemedies.length > 0) {
              advice += `**Home Remedies:**\n`
              symptom.homeRemedies.slice(0, 4).forEach(remedy => {
                advice += `• ${remedy}\n`
              })
              advice += `\n`
            } else if (symptom.firstAid) {
              advice += `**Home Care:**\n`
              symptom.firstAid.forEach(aid => {
                advice += `• ${aid}\n`
              })
              advice += `\n`
            }
            
            advice += `**Watch for these emergency signs:**\n`
            symptom.emergency.forEach(sign => {
              advice += `• ${sign}\n`
            })
          } else {
            advice += `• Get adequate rest and stay hydrated\n• Monitor your symptoms for changes\n• Consider over-the-counter remedies if appropriate\n• Apply warm or cold compresses if applicable`
          }
          
          advice += `\n\n⚠️ **Important:** All medications should be used only under physician supervision. This is general guidance - consult a healthcare provider for proper diagnosis.`
          
          addBotMessage(advice, 2000)
        } else {
          setCurrentStep('long-term')
          const specialist = symptomAnalysis.matchedSymptoms.length > 0 ? 
            symptomAnalysis.matchedSymptoms[0].specialist : suggestSpecialist(userSymptoms)
          
          let message = `Given that you've been experiencing these symptoms for ${duration} days, I recommend scheduling an appointment with a ${specialist}.\n\n`
          
          if (symptomAnalysis.matchedSymptoms.length > 0) {
            const symptom = symptomAnalysis.matchedSymptoms[0]
            
            message += `**About ${symptom.key.charAt(0).toUpperCase() + symptom.key.slice(1)}:**\n${symptom.description}\n\n`
            
            message += `**Possible causes:**\n`
            symptom.commonCauses.forEach(cause => {
              message += `• ${cause}\n`
            })
            
            // Add temporary relief suggestions
            if (symptom.medications && symptom.medications.length > 0) {
              message += `\n**Temporary relief (consult doctor first):**\n`
              symptom.medications.slice(0, 2).forEach(med => {
                message += `• ${med}\n`
              })
            }
            
            if (symptom.homeRemedies && symptom.homeRemedies.length > 0) {
              message += `\n**Home care while waiting for appointment:**\n`
              symptom.homeRemedies.slice(0, 3).forEach(remedy => {
                message += `• ${remedy}\n`
              })
            }
            
            message += `\n**Seek immediate care if you experience:**\n`
            symptom.emergency.forEach(sign => {
              message += `• ${sign}\n`
            })
            
            message += `\nPersistent symptoms require professional evaluation for proper diagnosis and treatment.`
          } else {
            message += `Persistent symptoms often require professional medical evaluation to rule out underlying conditions.`
          }
          
          addBotMessage(message, 2000)
          
          setTimeout(() => {
            addMessage(
              <div className="space-y-3">
                <p>Would you like me to help you find a {specialist} near you?</p>
                <Link to="/search" onClick={onToggle}>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                    <span>Find a Doctor Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>,
              'bot'
            )
          }, 3500)
        }
        break
        
      default:
        addBotMessage("I'm here to help! You can describe any symptoms you're experiencing, or ask about first-aid procedures.")
        setCurrentStep('initial')
    }
  }

  const suggestSpecialist = (symptoms) => {
    const lowerSymptoms = symptoms.toLowerCase()
    
    if (lowerSymptoms.includes('chest') || lowerSymptoms.includes('heart') || lowerSymptoms.includes('breath')) {
      return 'cardiologist'
    }
    if (lowerSymptoms.includes('skin') || lowerSymptoms.includes('rash') || lowerSymptoms.includes('acne')) {
      return 'dermatologist'
    }
    if (lowerSymptoms.includes('eye') || lowerSymptoms.includes('vision') || lowerSymptoms.includes('sight')) {
      return 'ophthalmologist'
    }
    if (lowerSymptoms.includes('joint') || lowerSymptoms.includes('bone') || lowerSymptoms.includes('muscle')) {
      return 'orthopedist'
    }
    if (lowerSymptoms.includes('mental') || lowerSymptoms.includes('anxiety') || lowerSymptoms.includes('depression')) {
      return 'psychiatrist'
    }
    if (lowerSymptoms.includes('stomach') || lowerSymptoms.includes('digestive') || lowerSymptoms.includes('nausea')) {
      return 'gastroenterologist'
    }
    return 'general practitioner'
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Function to update medical knowledge base with new data
  const updateMedicalKnowledge = (newData) => {
    // This function will be used to integrate your provided medical data
    // newData should have the structure:
    // {
    //   symptoms: { symptomName: { description, commonCauses, firstAid, emergency, specialist } },
    //   firstAid: { procedureName: { steps, emergency } },
    //   emergencySignals: ["signal1", "signal2"]
    // }
    
    if (newData.symptoms) {
      Object.assign(medicalKnowledgeBase.symptoms, newData.symptoms)
    }
    
    if (newData.firstAid) {
      Object.assign(medicalKnowledgeBase.firstAid, newData.firstAid)
    }
    
    if (newData.emergencySignals) {
      medicalKnowledgeBase.emergencySignals = [
        ...medicalKnowledgeBase.emergencySignals,
        ...newData.emergencySignals
      ]
    }
    
    console.log('Medical knowledge base updated:', medicalKnowledgeBase)
  }

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hi! I'm your virtual health assistant powered by medical knowledge. I can help you understand symptoms, provide first-aid guidance, and connect you with the right healthcare professionals. What symptoms are you experiencing?",
        timestamp: new Date()
      }
    ])
    setCurrentStep('initial')
    setUserSymptoms('')
    setSymptomDuration(null)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg z-[60] flex items-center justify-center"
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        data-chatbot-toggle
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-96 h-[600px] max-h-[calc(100vh-7rem)] bg-white rounded-xl shadow-2xl z-[60] flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Health Assistant</h3>
                  <p className="text-sm opacity-90">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="text-white/80 hover:text-white text-sm"
              >
                Reset
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 text-primary-600" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-0.5" />
                      )}
                      <div className="flex-1">
                        {typeof message.content === 'string' ? (
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-primary-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot