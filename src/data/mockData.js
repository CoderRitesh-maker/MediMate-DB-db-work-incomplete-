import { v4 as uuidv4 } from 'uuid'

export const mockDoctors = [
  {
    id: uuidv4(),
    name: "Dr. Sarah Johnson",
    speciality: "Cardiologist",
    qualifications: ["MD", "FACC", "FHRS"],
    experience: 15,
    rating: 4.9,
    reviewCount: 324,
    consultationFee: 200,
    location: {
      address: "123 Heart Center Ave, Medical District",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      lat: 40.7831,
      lng: -73.9712
    },
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and cardiac electrophysiology.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Harvard Medical School",
        year: 2008
      },
      {
        degree: "Residency in Internal Medicine",
        institution: "Johns Hopkins Hospital",
        year: 2011
      }
    ],
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      wednesday: ["09:00", "10:00", "11:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      friday: ["09:00", "10:00", "11:00", "14:00"],
      saturday: ["09:00", "10:00"],
      sunday: []
    },
    languages: ["English", "Spanish"],
    insuranceAccepted: ["Blue Cross", "Aetna", "Cigna", "United Healthcare"]
  },
  {
    id: uuidv4(),
    name: "Dr. Michael Chen",
    speciality: "Dermatologist",
    qualifications: ["MD", "FAAD"],
    experience: 12,
    rating: 4.8,
    reviewCount: 256,
    consultationFee: 180,
    location: {
      address: "456 Skin Care Blvd, Downtown",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      lat: 40.7589,
      lng: -73.9851
    },
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    about: "Dr. Michael Chen is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. He has extensive experience in treating skin cancer and complex dermatological conditions.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Stanford University School of Medicine",
        year: 2009
      },
      {
        degree: "Dermatology Residency",
        institution: "UCSF Medical Center",
        year: 2013
      }
    ],
    availability: {
      monday: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
      tuesday: ["08:00", "09:00", "10:00", "13:00", "14:00"],
      wednesday: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
      thursday: ["08:00", "09:00", "10:00", "13:00", "14:00"],
      friday: ["08:00", "09:00", "10:00", "13:00"],
      saturday: ["09:00", "10:00"],
      sunday: []
    },
    languages: ["English", "Mandarin"],
    insuranceAccepted: ["Blue Cross", "Aetna", "Kaiser Permanente"]
  },
  {
    id: uuidv4(),
    name: "Dr. Emily Rodriguez",
    speciality: "Pediatrician",
    qualifications: ["MD", "FAAP"],
    experience: 10,
    rating: 4.9,
    reviewCount: 412,
    consultationFee: 150,
    location: {
      address: "789 Children's Way, Uptown",
      city: "New York",
      state: "NY",
      zipCode: "10003",
      lat: 40.7505,
      lng: -73.9934
    },
    image: "https://images.unsplash.com/photo-1594824371773-2f4f0a37dd72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    about: "Dr. Emily Rodriguez is a board-certified pediatrician who has been caring for children from newborns to teenagers for over 10 years. She is passionate about preventive care and child development.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Columbia University College of Physicians and Surgeons",
        year: 2011
      },
      {
        degree: "Pediatrics Residency",
        institution: "Children's Hospital of Philadelphia",
        year: 2014
      }
    ],
    availability: {
      monday: ["08:30", "09:30", "10:30", "13:30", "14:30", "15:30"],
      tuesday: ["08:30", "09:30", "10:30", "13:30", "14:30", "15:30"],
      wednesday: ["08:30", "09:30", "10:30", "13:30", "14:30"],
      thursday: ["08:30", "09:30", "10:30", "13:30", "14:30", "15:30"],
      friday: ["08:30", "09:30", "10:30", "13:30", "14:30"],
      saturday: ["09:00", "10:00", "11:00"],
      sunday: []
    },
    languages: ["English", "Spanish"],
    insuranceAccepted: ["Blue Cross", "Medicaid", "United Healthcare", "Cigna"]
  },
  {
    id: uuidv4(),
    name: "Dr. James Wilson",
    speciality: "Orthopedist",
    qualifications: ["MD", "FAAOS"],
    experience: 18,
    rating: 4.7,
    reviewCount: 189,
    consultationFee: 220,
    location: {
      address: "321 Bone & Joint Ave, Medical Plaza",
      city: "New York",
      state: "NY",
      zipCode: "10004",
      lat: 40.7282,
      lng: -74.0776
    },
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    about: "Dr. James Wilson is a board-certified orthopedic surgeon with 18 years of experience in treating musculoskeletal disorders. He specializes in sports medicine and joint replacement surgery.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Yale School of Medicine",
        year: 2003
      },
      {
        degree: "Orthopedic Surgery Residency",
        institution: "Hospital for Special Surgery",
        year: 2008
      }
    ],
    availability: {
      monday: ["07:00", "08:00", "09:00", "13:00", "14:00"],
      tuesday: ["07:00", "08:00", "09:00", "13:00", "14:00"],
      wednesday: ["07:00", "08:00", "09:00"],
      thursday: ["07:00", "08:00", "09:00", "13:00", "14:00"],
      friday: ["07:00", "08:00", "09:00", "13:00"],
      saturday: [],
      sunday: []
    },
    languages: ["English"],
    insuranceAccepted: ["Blue Cross", "Aetna", "United Healthcare"]
  },
  {
    id: uuidv4(),
    name: "Dr. Lisa Thompson",
    speciality: "Psychiatrist",
    qualifications: ["MD", "MRCPsych"],
    experience: 14,
    rating: 4.8,
    reviewCount: 298,
    consultationFee: 250,
    location: {
      address: "555 Mental Health Center, Wellness District",
      city: "New York",
      state: "NY",
      zipCode: "10005",
      lat: 40.7614,
      lng: -73.9776
    },
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    about: "Dr. Lisa Thompson is a board-certified psychiatrist specializing in anxiety, depression, and mood disorders. She provides both medication management and psychotherapy services.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "University of Pennsylvania School of Medicine",
        year: 2007
      },
      {
        degree: "Psychiatry Residency",
        institution: "McLean Hospital/Harvard Medical School",
        year: 2011
      }
    ],
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      friday: ["09:00", "10:00", "11:00", "14:00"],
      saturday: ["10:00", "11:00"],
      sunday: []
    },
    languages: ["English", "French"],
    insuranceAccepted: ["Blue Cross", "Aetna", "Cigna", "United Healthcare", "Medicare"]
  }
]

export const mockReviews = [
  {
    id: uuidv4(),
    doctorId: mockDoctors[0].id,
    patientName: "John D.",
    rating: 5,
    comment: "Dr. Johnson is fantastic! Very thorough and caring. She took time to explain everything clearly.",
    date: "2024-01-15",
    verified: true
  },
  {
    id: uuidv4(),
    doctorId: mockDoctors[0].id,
    patientName: "Maria S.",
    rating: 5,
    comment: "Excellent cardiologist. Professional and knowledgeable. Highly recommend!",
    date: "2024-01-10",
    verified: true
  },
  {
    id: uuidv4(),
    doctorId: mockDoctors[1].id,
    patientName: "Robert M.",
    rating: 4,
    comment: "Dr. Chen was very helpful with my skin condition. Office staff was friendly too.",
    date: "2024-01-12",
    verified: true
  },
  {
    id: uuidv4(),
    doctorId: mockDoctors[2].id,
    patientName: "Jennifer L.",
    rating: 5,
    comment: "Dr. Rodriguez is amazing with children. My son loves her and she's very patient.",
    date: "2024-01-08",
    verified: true
  }
]

export const mockAppointments = [
  {
    id: uuidv4(),
    doctorId: mockDoctors[0].id,
    patientId: "user123",
    date: "2024-02-15",
    time: "10:00",
    status: "confirmed",
    type: "consultation",
    symptoms: "Chest pain and shortness of breath",
    createdAt: "2024-01-20T10:00:00Z"
  },
  {
    id: uuidv4(),
    doctorId: mockDoctors[1].id,
    patientId: "user123",
    date: "2024-02-20",
    time: "14:00",
    status: "pending",
    type: "follow-up",
    symptoms: "Skin rash follow-up",
    createdAt: "2024-01-18T14:30:00Z"
  }
]

export const specialties = [
  "All Specialties",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedist",
  "Psychiatrist",
  "Neurologist",
  "Gastroenterologist",
  "Oncologist",
  "Ophthalmologist",
  "ENT Specialist",
  "General Practitioner"
]

export const insuranceProviders = [
  "All Insurance",
  "Blue Cross",
  "Aetna",
  "Cigna",
  "United Healthcare",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid"
]