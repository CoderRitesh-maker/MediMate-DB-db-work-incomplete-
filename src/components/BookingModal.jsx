import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, User, CreditCard, DollarSign } from 'lucide-react'
import PaymentForm from './PaymentForm'
import { api, API_BASE } from '../services/api'

const BookingModal = ({ doctor, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showStripe, setShowStripe] = useState(false)
  const [bookedSlots, setBookedSlots] = useState([])

  // Get next 7 days for date selection
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      
      // Check if doctor is available on this day
      if (doctor.availability.days.includes(dayName)) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          dayName
        })
      }
    }
    return dates
  }

  const availableDates = getAvailableDates()

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        if (API_BASE && selectedDate) {
          const res = await fetch(`${API_BASE}/api/appointments/availability/${doctor.id}?date=${encodeURIComponent(selectedDate)}&name=${encodeURIComponent(doctor.name)}`)
          const json = await res.json()
          if (json?.data?.bookedSlots) setBookedSlots(json.data.bookedSlots)
        } else {
          setBookedSlots([])
        }
      } catch (e) {
        setBookedSlots([])
      }
    }
    fetchBooked()
  }, [selectedDate, doctor?.id])

  const handlePayment = async () => {
    if (!selectedDate || !selectedTimeSlot || !patientName || !patientPhone || !patientEmail) {
      alert('Please fill all fields')
      return
    }
    setShowStripe(true)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Doctor Info */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <img
                src={doctor.image || `https://ui-avatars.com/api/?name=${doctor.name}&background=random`}
                alt={doctor.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-primary-600 font-medium">{doctor.specialization}</p>
                <p className="text-gray-600">{doctor.location.hospital}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">₹{doctor.consultationFee} consultation fee</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Date & Time Selection */}
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((dateObj) => (
                      <button
                        key={dateObj.date}
                        onClick={() => setSelectedDate(dateObj.date)}
                        className={`p-3 text-sm border rounded-lg transition-colors ${
                          selectedDate === dateObj.date
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {dateObj.display}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Selection */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {doctor.availability.timeSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot)
                        return (
                          <button
                            key={slot}
                            onClick={() => !isBooked && setSelectedTimeSlot(slot)}
                            disabled={isBooked}
                            className={`p-3 text-sm border rounded-lg transition-colors ${
                              selectedTimeSlot === slot && !isBooked
                                ? 'bg-primary-600 text-white border-primary-600'
                                : isBooked
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {slot}{isBooked ? ' • Booked' : ''}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Patient Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Patient Information
                  </label>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            {selectedDate && selectedTimeSlot && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Booking Summary</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>Doctor:</strong> Dr. {doctor.name}</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {selectedTimeSlot}</p>
                  <p><strong>Amount to Pay:</strong> ₹{doctor.consultationFee}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!selectedDate || !selectedTimeSlot || !patientName || !patientPhone || !patientEmail}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay ₹{doctor.consultationFee} & Book</span>
            </button>
          </div>

          {/* Stripe Checkout */}
          {showStripe && (
            <div className="p-6 border-t">
              <PaymentForm
                amount={doctor.consultationFee}
                doctorId={doctor.id}
                onBack={() => setShowStripe(false)}
                onSuccess={async (result) => {
                  const bookingDetails = {
                    paymentId: result.paymentIntent?.id,
                    doctor,
                    date: selectedDate,
                    timeSlot: selectedTimeSlot,
                    patient: { name: patientName, phone: patientPhone, email: patientEmail },
                    bookingId: 'BK' + Date.now(),
                    amount: doctor.consultationFee,
                  }

                  // Persist appointment to backend if available
                  try {
                    if (API_BASE) {
                      await api.post('/api/appointments', {
                        doctorId: doctor.id,
                        doctorName: doctor.name,
                        hospital: doctor?.location?.hospital,
                        date: selectedDate,
                        time: selectedTimeSlot,
                        appointmentType: 'consultation',
                        patient: bookingDetails.patient,
                        paymentIntentId: result.paymentIntent?.id,
                        amount: Math.round(Number(doctor.consultationFee) * 100),
                        status: 'confirmed',
                      })
                    }
                  } catch (e) {
                    console.warn('Failed to persist appointment to backend:', e.message)
                  }

                  localStorage.setItem('lastBooking', JSON.stringify(bookingDetails))
                  window.location.href = '/payment-success'
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default BookingModal