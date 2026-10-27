import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { CreditCard, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../services/api'

// Initialize Stripe lazily to handle missing keys gracefully
const getStripePromise = () => {
  const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  return pk ? loadStripe(pk) : null
}

const CheckoutForm = ({ amount, doctorId, appointmentId, onSuccess, onBack }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (!doctorId) {
      toast.error('Missing doctor information')
      return
    }

    setLoading(true)

    try {
      // Create payment intent on backend (uses JWT via api helper)
      const res = await api.post('/api/payments/create-payment-intent', {
        amount: Math.round(amount * 100), // smallest currency unit
        currency: 'inr',
        doctorId,
      })
      const clientSecret = res.clientSecret

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        }
      })

      if (result.error) {
        toast.error(result.error.message)
      } else if (result.paymentIntent?.status === 'succeeded') {
        // Notify backend (optional but keeps server in sync)
        try {
          await api.post('/api/payments/confirm-payment', {
            paymentIntentId: result.paymentIntent.id,
            appointmentId,
          })
        } catch (_) {
          // non-fatal in demo
        }
        toast.success('Payment successful!')
        onSuccess?.({
          paymentIntent: result.paymentIntent,
          amount,
        })
      }
    } catch (error) {
      toast.error(error.message || 'Payment failed. Please try again.')
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCardChange = (event) => {
    setCardComplete(event.complete)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-primary-600" />
          <h4 className="font-medium text-gray-900">Payment Information</h4>
        </div>
        
        <div className="bg-white p-4 rounded-md border">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#374151',
                  '::placeholder': {
                    color: '#9CA3AF',
                  },
                },
                invalid: {
                  color: '#EF4444',
                },
              },
            }}
            onChange={handleCardChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Lock className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || loading || !cardComplete}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </div>
    </form>
  )
}

const PaymentForm = ({ amount, doctorId, appointmentId, onSuccess, onBack }) => {
  const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!pk) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
        Stripe publishable key missing. Set VITE_STRIPE_PUBLISHABLE_KEY in your .env and reload.
      </div>
    )
  }
  const stripePromise = getStripePromise()
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        amount={amount}
        doctorId={doctorId}
        appointmentId={appointmentId}
        onSuccess={onSuccess}
        onBack={onBack}
      />
    </Elements>
  )
}

export default PaymentForm
