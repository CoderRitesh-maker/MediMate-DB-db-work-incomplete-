import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Download,
  Share2,
  ArrowLeft
} from 'lucide-react'

const PaymentSuccess = () => {
  const [bookingDetails, setBookingDetails] = useState(null)

  useEffect(() => {
    // Get booking details from localStorage
    const storedBooking = localStorage.getItem('lastBooking')
    if (storedBooking) {
      setBookingDetails(JSON.parse(storedBooking))
    }
  }, [])

  const handleDownloadReceipt = () => {
    // Simple implementation - in production, generate proper PDF
    const receiptContent = `
CARECONNECT - APPOINTMENT CONFIRMATION
=====================================

Booking ID: ${bookingDetails.bookingId}
Payment ID: ${bookingDetails.paymentId}

Doctor: Dr. ${bookingDetails.doctor.name}
Specialization: ${bookingDetails.doctor.specialization}
Hospital: ${bookingDetails.doctor.location.hospital}

Patient: ${bookingDetails.patient.name}
Phone: ${bookingDetails.patient.phone}
Email: ${bookingDetails.patient.email}

Appointment Date: ${new Date(bookingDetails.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}
Time: ${bookingDetails.timeSlot}

Booking Fee Paid: ₹2
Status: Confirmed

Thank you for choosing CareConnect!
    `

    const element = document.createElement('a')
    const file = new Blob([receiptContent], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `appointment-receipt-${bookingDetails.bookingId}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Appointment Confirmation',
        text: `My appointment with Dr. ${bookingDetails.doctor.name} is confirmed for ${new Date(bookingDetails.date).toLocaleDateString()} at ${bookingDetails.timeSlot}`,
        url: window.location.origin
      })
    } else {
      // Fallback - copy to clipboard
      const shareText = `My appointment with Dr. ${bookingDetails.doctor.name} is confirmed for ${new Date(bookingDetails.date).toLocaleDateString()} at ${bookingDetails.timeSlot}`
      navigator.clipboard.writeText(shareText)
      alert('Appointment details copied to clipboard!')
    }
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking details found</p>
          <Link 
            to="/search" 
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Find Doctors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your appointment has been confirmed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          {/* Booking Summary */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Doctor Information</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={bookingDetails.doctor.image || `https://ui-avatars.com/api/?name=${bookingDetails.doctor.name}&background=random`}
                    alt={bookingDetails.doctor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Dr. {bookingDetails.doctor.name}</p>
                    <p className="text-primary-600">{bookingDetails.doctor.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{bookingDetails.doctor.location.hospital}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-sm">{bookingDetails.doctor.location.city}, {bookingDetails.doctor.location.state}</span>
                </div>
              </div>

              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Patient Information</h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{bookingDetails.patient.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{bookingDetails.patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{bookingDetails.patient.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Appointment Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Appointment Time</p>
                <p className="text-lg font-semibold text-gray-900">{bookingDetails.timeSlot}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Booking ID</p>
                <p className="font-mono font-medium">{bookingDetails.bookingId}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment ID</p>
                <p className="font-mono font-medium">{bookingDetails.paymentId}</p>
              </div>
              <div>
                <p className="text-gray-600">Amount Paid</p>
                <p className="font-semibold text-green-600">₹2</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6"
        >
          <h3 className="font-semibold text-yellow-800 mb-3">Important Notes:</h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Please arrive 15 minutes before your appointment time</li>
            <li>• Bring a valid ID and any relevant medical records</li>
            <li>• The ₹2 booking fee will be adjusted in your consultation fee</li>
            <li>• If you need to reschedule, please contact the clinic at least 24 hours in advance</li>
            <li>• A confirmation SMS and email will be sent to you shortly</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleDownloadReceipt}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
          
          <button
            onClick={handleShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Details</span>
          </button>

          <Link
            to="/search"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Book Another</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentSuccess