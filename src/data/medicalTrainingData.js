// Medical Training Data for CareConnect Chatbot
// This file contains the structure for adding medical data to train the chatbot

export const medicalTrainingData = {
  // Comprehensive symptom data with medications and home remedies
  symptoms: {
    fever: {
      description: 'Body temperature above normal (100.4°F/38°C)',
      commonCauses: ['Viral infection', 'Bacterial infection', 'Heat exhaustion', 'Medication reaction'],
      medications: ['Paracetamol (Acetaminophen/Tylenol)', 'Ibuprofen (Advil, Motrin)', 'Aspirin (for adults only)'],
      homeRemedies: [
        'Rest and get plenty of sleep',
        'Drink plenty of fluids (water, herbal teas, broths)',
        'Apply cool, damp washcloths to forehead and wrists',
        'Take lukewarm baths or showers',
        'Dress in lightweight, breathable clothing'
      ],
      emergency: ['Temperature above 103°F', 'Difficulty breathing', 'Severe dehydration', 'Confusion or altered mental state'],
      specialist: 'general practitioner'
    },
    headache: {
      description: 'Pain in the head or neck region',
      commonCauses: ['Tension', 'Dehydration', 'Stress', 'Sinus pressure', 'Migraine'],
      medications: ['Acetaminophen (Tylenol)', 'Ibuprofen (Advil, Motrin)', 'Naproxen sodium (Aleve)'],
      homeRemedies: [
        'Apply cold or warm compress to head or neck',
        'Practice relaxation techniques and deep breathing',
        'Stay hydrated by drinking water',
        'Get adequate sleep and maintain regular sleep schedule',
        'Massage temples, neck, and shoulders gently',
        'Reduce screen time and bright lights'
      ],
      emergency: ['Sudden severe headache', 'Headache with fever and stiff neck', 'Headache after head injury', 'Vision changes'],
      specialist: 'neurologist'
    },
    cough: {
      description: 'Forceful expulsion of air from lungs to clear irritants',
      commonCauses: ['Cold or flu', 'Allergies', 'Respiratory infection', 'Asthma', 'Environmental irritants'],
      medications: ['Dextromethorphan (Robitussin DM)', 'Guaifenesin (Mucinex)', 'Throat lozenges with menthol'],
      homeRemedies: [
        'Drink warm liquids like tea with honey',
        'Use a humidifier to add moisture to air',
        'Gargle with warm salt water',
        'Suck on throat lozenges or hard candies',
        'Elevate head while sleeping',
        'Avoid irritants like smoke and strong odors'
      ],
      emergency: ['Difficulty breathing', 'Coughing up blood', 'High fever with cough', 'Chest pain'],
      specialist: 'pulmonologist'
    },
    commonCold: {
      description: 'Viral infection of upper respiratory tract',
      commonCauses: ['Rhinovirus', 'Coronavirus', 'Close contact with infected person', 'Weakened immune system'],
      medications: ['Pseudoephedrine (Sudafed)', 'Loratadine (Claritin)', 'Multi-symptom cold medications'],
      homeRemedies: [
        'Get plenty of rest and sleep',
        'Drink lots of fluids (water, warm broths, herbal teas)',
        'Use saline nasal rinses or sprays',
        'Gargle with warm salt water for sore throat',
        'Use a humidifier or breathe steam from hot shower',
        'Eat chicken soup for comfort and hydration'
      ],
      emergency: ['High fever over 103°F', 'Severe difficulty breathing', 'Chest pain', 'Symptoms worsen after 10 days'],
      specialist: 'general practitioner'
    },
    stomachAche: {
      description: 'Discomfort or pain in the abdominal area',
      commonCauses: ['Indigestion', 'Gas', 'Food poisoning', 'Stress', 'Stomach virus'],
      medications: ['Antacids (Tums, Rolaids)', 'Omeprazole (Prilosec)', 'Simethicone (Gas-X)'],
      homeRemedies: [
        'Apply heat with heating pad or warm compress',
        'Drink ginger tea or chamomile tea',
        'Eat bland foods like toast, rice, or bananas',
        'Stay hydrated with clear fluids',
        'Try peppermint tea for digestive comfort',
        'Avoid spicy, fatty, or acidic foods'
      ],
      emergency: ['Severe abdominal pain', 'Blood in vomit or stool', 'Signs of dehydration', 'High fever with pain'],
      specialist: 'gastroenterologist'
    },
    diarrhea: {
      description: 'Frequent, loose, or watery bowel movements',
      commonCauses: ['Food poisoning', 'Viral infection', 'Bacterial infection', 'Medication side effects', 'Stress'],
      medications: ['Loperamide (Imodium)', 'Bismuth subsalicylate (Pepto-Bismol)', 'Probiotics supplements'],
      homeRemedies: [
        'Stay well hydrated with water and electrolyte solutions',
        'Follow BRAT diet (bananas, rice, applesauce, toast)',
        'Drink clear broths and herbal teas',
        'Avoid dairy products temporarily',
        'Eat small, frequent meals',
        'Rest and avoid strenuous activities'
      ],
      emergency: ['Severe dehydration', 'Blood in stool', 'High fever', 'Signs of severe illness'],
      specialist: 'gastroenterologist'
    },
    nausea: {
      description: 'Feeling of sickness with urge to vomit',
      commonCauses: ['Food poisoning', 'Viral infection', 'Motion sickness', 'Pregnancy', 'Medication side effects'],
      medications: ['Bismuth subsalicylate (Pepto-Bismol)', 'Dimenhydrinate (Dramamine)', 'Ondansetron (Zofran)'],
      homeRemedies: [
        'Sip clear fluids slowly',
        'Eat bland foods (BRAT diet)',
        'Rest in comfortable position',
        'Try ginger tea or ginger candy',
        'Get fresh air',
        'Avoid strong odors and fatty foods'
      ],
      emergency: ['Severe dehydration', 'Blood in vomit', 'Severe abdominal pain', 'Signs of poisoning'],
      specialist: 'gastroenterologist'
    },
    skinRash: {
      description: 'Changes in skin color, texture, or appearance',
      commonCauses: ['Allergic reaction', 'Viral infection', 'Bacterial infection', 'Contact dermatitis', 'Eczema'],
      medications: ['Hydrocortisone cream', 'Antihistamines (Benadryl)', 'Calamine lotion'],
      homeRemedies: [
        'Keep area clean and dry',
        'Avoid scratching',
        'Apply cool compresses',
        'Wear loose, breathable clothing',
        'Use gentle, fragrance-free soaps',
        'Apply moisturizer to dry skin'
      ],
      emergency: ['Difficulty breathing', 'Rapid spreading', 'Signs of infection', 'Severe itching with swelling'],
      specialist: 'dermatologist'
    },
    soreThroat: {
      description: 'Pain, scratchiness, or irritation of the throat',
      commonCauses: ['Viral infection', 'Bacterial infection', 'Allergies', 'Dry air', 'Acid reflux'],
      medications: ['Throat lozenges', 'Ibuprofen (Advil)', 'Acetaminophen (Tylenol)'],
      homeRemedies: [
        'Gargle with warm salt water',
        'Drink warm liquids like tea with honey',
        'Use throat lozenges or hard candy',
        'Stay hydrated',
        'Use a humidifier',
        'Rest your voice'
      ],
      emergency: ['Difficulty swallowing', 'High fever', 'Difficulty breathing', 'Severe pain'],
      specialist: 'otolaryngologist'
    }
  },

  // Enhanced first aid procedures
  firstAid: {
    minorCuts: {
      steps: [
        'Clean hands before treating wound',
        'Stop bleeding by applying gentle pressure',
        'Clean wound with water',
        'Apply antibiotic ointment if available',
        'Cover with sterile bandage'
      ],
      emergency: ['Deep cuts', 'Uncontrollable bleeding', 'Signs of infection']
    },
    minorBurns: {
      steps: [
        'Cool burn with running water for 10-20 minutes',
        'Remove jewelry before swelling occurs',
        'Do not break blisters',
        'Apply cool, wet cloth if needed',
        'Cover with sterile, non-stick bandage'
      ],
      emergency: ['Burns larger than 3 inches', 'Burns on face/hands/genitals', 'Electrical burns']
    },
    muscleStrain: {
      steps: [
        'Rest the injured area',
        'Apply ice for 15-20 minutes',
        'Compress with elastic bandage',
        'Elevate injured area if possible',
        'Take over-the-counter pain relievers'
      ],
      emergency: ['Severe pain', 'Complete loss of function', 'Numbness or tingling']
    }
  },

  // Emergency warning signals
  emergencySignals: [
    'chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious', 'seizure',
    'poisoning', 'severe burn', 'spinal injury', 'stroke symptoms', 'heart attack',
    'severe allergic reaction', 'high fever with confusion'
  ],

  // Add specialized medical conditions here
  conditions: {
    // conditionName: {
    //   description: 'description of condition',
    //   symptoms: ['symptom1', 'symptom2'],
    //   treatment: ['treatment option 1', 'treatment option 2'],
    //   prevention: ['prevention tip 1', 'prevention tip 2'],
    //   specialist: 'specialist type'
    // }
  },

  // Add medication information here
  medications: {
    // medicationName: {
    //   uses: 'what it treats',
    //   dosage: 'typical dosage info',
    //   sideEffects: ['side effect 1', 'side effect 2'],
    //   warnings: ['warning 1', 'warning 2']
    // }
  }
}

// Instructions for use:
// 1. Replace the example data with your actual medical data
// 2. Follow the same structure for consistency
// 3. The chatbot will automatically use this data to provide responses
// 4. Make sure all medical information is accurate and from reliable sources

// Example of how to add real data:
/*
export const exampleMedicalData = {
  symptoms: {
    migraine: {
      description: 'Severe headache often accompanied by nausea and sensitivity to light',
      commonCauses: ['Stress', 'Hormonal changes', 'Certain foods', 'Weather changes', 'Sleep changes'],
      firstAid: ['Rest in dark, quiet room', 'Apply cold compress to head', 'Stay hydrated', 'Take prescribed medication'],
      emergency: ['Sudden severe headache unlike any before', 'Headache with fever and stiff neck', 'Headache after head injury'],
      specialist: 'neurologist'
    },
    asthma: {
      description: 'Breathing condition where airways narrow and produce extra mucus',
      commonCauses: ['Allergens', 'Exercise', 'Cold air', 'Respiratory infections', 'Stress'],
      firstAid: ['Use rescue inhaler', 'Sit upright', 'Breathe slowly and deeply', 'Stay calm'],
      emergency: ['Severe difficulty breathing', 'Blue lips or face', 'Cannot speak full sentences'],
      specialist: 'pulmonologist'
    }
  },
  emergencySignals: ['cannot breathe', 'severe chest pain', 'losing consciousness']
}
*/