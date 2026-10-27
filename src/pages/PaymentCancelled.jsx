import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  XCircle, 
  RefreshCw, 
  ArrowLeft,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react'

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">Your appointment booking was cancelled</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What happened?</h2>
            <p className="text-gray-600 mb-4">
              Your payment was either cancelled or failed to process. This can happen for several reasons:
            </p>
            
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Payment was cancelled by you during the process</li>
                <li>• Insufficient balance in your account</li>
                <li>• Network connectivity issues</li>
                <li>• Bank or payment gateway timeout</li>
                <li>• Card verification failed</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Don't worry!</h3>
              </div>
              <p className="text-sm text-blue-700">
                No charges have been made to your account. You can try booking again or contact our support team for assistance.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Need Help?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Call Support</p>
                <p className="text-sm text-gray-600">1800-123-4567</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@careconnect.com</p>
                <p className="text-xs text-gray-500">Response within 2 hours</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Our support team is ready to help you complete your appointment booking
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/search"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Booking Again</span>
          </Link>

          <Link
            to="/"
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Will I be charged for the cancelled payment?</h4>
              <p className="text-gray-600">No, you will not be charged for cancelled or failed payments. Only successful transactions result in charges.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Can I try booking again immediately?</h4>
              <p className="text-gray-600">Yes, you can try booking again right away. Make sure you have sufficient balance and a stable internet connection.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">What if I see a charge on my account?</h4>
              <p className="text-gray-600">In rare cases, you might see a temporary hold that will be released within 3-5 business days. Contact support if this persists.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentCancelled