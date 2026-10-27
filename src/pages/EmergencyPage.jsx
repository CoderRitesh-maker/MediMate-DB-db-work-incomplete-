import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  Phone, 
  Heart, 
  Thermometer, 
  Scissors, 
  Zap, 
  Activity,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertCircle,
  Shield,
  User,
  Stethoscope
} from 'lucide-react'

const EmergencyPage = () => {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const emergencyContacts = [
    { service: 'Emergency Services', number: '911', description: 'Fire, Police, Medical emergencies' },
    { service: 'Poison Control', number: '1-800-222-1222', description: 'Poison emergencies 24/7' },
    { service: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Mental health crisis support' },
    { service: 'National Suicide Prevention', number: '988', description: 'Suicide prevention lifeline' }
  ]

  const firstAidProcedures = [
    {
      id: 'cpr',
      title: 'CPR (Cardiopulmonary Resuscitation)',
      icon: <Heart className="w-6 h-6" />,
      steps: [
        'Check if person is responsive - tap shoulders and shout "Are you okay?"',
        'Call 911 immediately or ask someone else to do so',
        'Place person on firm, flat surface. Tilt head back, lift chin',
        'Place heel of one hand on center of chest between nipples',
        'Place other hand on top, interlace fingers',
        'Push hard and fast at least 2 inches deep',
        'Allow complete chest recoil between compressions',
        'Push at rate of 100-120 compressions per minute',
        'Continue until emergency services arrive'
      ],
      warning: 'Only perform if trained. Improper CPR can cause injury.'
    },
    {
      id: 'choking',
      title: 'Choking (Heimlich Maneuver)',
      icon: <AlertTriangle className="w-6 h-6" />,
      steps: [
        'Ask "Are you choking?" If they can\'t speak, act immediately',
        'Stand behind the person, wrap arms around waist',
        'Make a fist with one hand, place thumb side against stomach above navel',
        'Grasp fist with other hand and pull sharply inward and upward',
        'Repeat until object is expelled or person becomes unconscious',
        'If unconscious, begin CPR and call 911'
      ],
      warning: 'For infants under 1 year, use back blows and chest thrusts instead.'
    },
    {
      id: 'bleeding',
      title: 'Severe Bleeding Control',
      icon: <Scissors className="w-6 h-6" />,
      steps: [
        'Call 911 for severe bleeding',
        'Put on gloves if available to protect from bloodborne pathogens',
        'Remove any visible debris, but don\'t remove embedded objects',
        'Apply direct pressure with clean cloth or bandage',
        'If blood soaks through, add more layers (don\'t remove original)',
        'Raise injured area above heart level if possible',
        'Apply pressure to pressure points if bleeding doesn\'t stop',
        'Keep person warm and lying down'
      ],
      warning: 'Never remove objects embedded in wounds. Apply pressure around them.'
    },
    {
      id: 'burns',
      title: 'Burn Treatment',
      icon: <Zap className="w-6 h-6" />,
      steps: [
        'Remove person from heat source if safe to do so',
        'For minor burns: Cool with running water for 10-20 minutes',
        'Remove jewelry/clothing before swelling occurs',
        'Don\'t break blisters or apply ice directly',
        'Cover with sterile, non-stick bandage',
        'For severe burns: Call 911, don\'t remove stuck clothing',
        'Cover with clean, dry cloth',
        'Raise burned area above heart level if possible'
      ],
      warning: 'Never use butter, oil, or ice on burns. Seek medical attention for burns larger than 3 inches.'
    },
    {
      id: 'shock',
      title: 'Shock Treatment',
      icon: <Activity className="w-6 h-6" />,
      steps: [
        'Call 911 immediately',
        'Check for breathing and pulse',
        'Keep person lying down with legs elevated 8-12 inches',
        'Don\'t elevate legs if head, neck, back, or leg injury suspected',
        'Keep person warm with blanket or coat',
        'Don\'t give food or water',
        'Turn person on side if vomiting',
        'Monitor breathing and pulse until help arrives'
      ],
      warning: 'Shock can be life-threatening. Signs include rapid pulse, rapid breathing, nausea, and confusion.'
    },
    {
      id: 'seizure',
      title: 'Seizure Response',
      icon: <Stethoscope className="w-6 h-6" />,
      steps: [
        'Stay calm and time the seizure',
        'Clear area of hard or sharp objects',
        'Don\'t hold person down or put anything in their mouth',
        'Turn person on their side if possible',
        'Put something soft under their head',
        'Don\'t leave person alone',
        'Call 911 if: seizure lasts more than 5 minutes, person is injured, or it\'s their first seizure',
        'Stay with person until they\'re fully conscious'
      ],
      warning: 'Never put anything in a seizing person\'s mouth. They cannot swallow their tongue.'
    }
  ]

  const warningSection = {
    title: 'When to Call 911 Immediately',
    items: [
      'Person is unconscious or unresponsive',
      'Severe difficulty breathing or no breathing',
      'Severe chest pain or pressure',
      'Severe bleeding that won\'t stop',
      'Signs of stroke (face drooping, arm weakness, speech difficulty)',
      'Suspected poisoning or overdose',
      'Severe burns',
      'Suspected spinal injury',
      'Seizure lasting more than 5 minutes'
    ]
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-red-50 py-8"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8 border-l-4 border-red-500">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-red-900 mb-4">Emergency & First Aid Guide</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Essential first-aid procedures and emergency contacts. Always call 911 for life-threatening emergencies.
          </p>
          <div className="bg-red-100 p-6 rounded-lg border border-red-200">
            <div className="flex items-center justify-center mb-2">
              <Phone className="w-6 h-6 text-red-800 mr-2" />
              <p className="text-red-800 font-bold text-xl">Emergency: 911</p>
            </div>
            <p className="text-red-700">For immediate life-threatening emergencies</p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-2 text-red-600" />
            Emergency Contacts
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900">{contact.service}</h3>
                <p className="text-xl font-bold text-red-600 my-1">{contact.number}</p>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Section */}
        <div className="bg-red-100 border border-red-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            {warningSection.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {warningSection.items.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-red-800">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid Procedures */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-green-600" />
            First Aid Procedures
          </h2>
          <div className="space-y-4">
            {firstAidProcedures.map((procedure) => (
              <div key={procedure.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleSection(procedure.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <div className="text-primary-600 mr-3">{procedure.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{procedure.title}</h3>
                  </div>
                  {openSection === procedure.id ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </button>
                
                {openSection === procedure.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-yellow-800 text-sm font-medium">{procedure.warning}</p>
                      </div>
                    </div>
                    
                    <ol className="space-y-3">
                      {procedure.steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-6 mt-8 text-center">
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical training. 
            Always seek immediate medical attention in emergencies. Consider taking a certified first aid and CPR course for proper training.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default EmergencyPage