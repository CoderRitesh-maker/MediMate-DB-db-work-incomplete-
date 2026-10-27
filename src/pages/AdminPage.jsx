import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search,
  Filter,
  Download,
  Upload,
  Users,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Mail,
  LogOut,
  Shield,
  RefreshCw,
  Database,
  Trash
} from 'lucide-react'
import AdminLogin from '../components/AdminLogin'
import { admin } from '../services/admin'

const AdminPage = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [doctors, setDoctors] = useState([])
  const [statistics, setStatistics] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialization, setFilterSpecialization] = useState('')
  const [notification, setNotification] = useState(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [pastAppointments, setPastAppointments] = useState([])

  // Form state for adding/editing doctors
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: '',
    rating: 4.5,
    reviewsCount: 0,
    consultationFee: 150,
    location: {
      city: '',
      state: '',
      address: '',
      hospital: ''
    },
    availability: {
      days: [],
      timeSlots: []
    },
    contactInfo: {
      phone: '',
      email: ''
    },
    services: [],
    languages: [],
    image: '',
    bio: '',
    education: [],
    insuranceAccepted: []
  })

  useEffect(() => {
    checkAuthentication()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
      loadAppointments()
    }
  }, [isAuthenticated])

const checkAuthentication = async () => {
    try {
      await admin.listDoctors()
      setIsAuthenticated(true)
    } catch (e) {
      setIsAuthenticated(false)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

const handleLogout = () => {
    localStorage.removeItem('cc_token')
    setIsAuthenticated(false)
  }

const loadData = async () => {
    const res = await admin.listDoctors()
    const mapped = (res.data || []).map(d => ({
      id: d.id,
      name: d.name,
      specialization: d.speciality || d.specialization || 'General',
      experience: d.experience || '',
      location: { city: d.city || '', state: d.state || '', hospital: d.hospital || '', address: d.address || '' },
      consultationFee: d.consultationFee ?? d.fee ?? 0,
      rating: d.rating ?? 0,
      reviewsCount: d.reviewsCount ?? 0,
      availability: { days: d.availabilityDays || [], timeSlots: d.timeSlots || [] },
      services: d.services || [],
      languages: d.languages || [],
      image: d.image || '',
      bio: d.bio || ''
    }))
    setDoctors(mapped)
    const stats = {
      availableDoctors: mapped.length,
      averageRating: mapped.length ? (mapped.reduce((s, x) => s + (Number(x.rating)||0), 0) / mapped.length).toFixed(2) : 0,
      specializations: new Set(mapped.map(x => x.specialization)).size,
      cities: new Set(mapped.map(x => x.location.city).filter(Boolean)).size,
      specializationsList: Array.from(new Set(mapped.map(x => x.specialization))).sort()
    }
    setStatistics(stats)
  }

  const loadAppointments = async () => {
    try {
      const upcoming = await admin.listAppointments('upcoming')
      const past = await admin.listAppointments('past')
      setUpcomingAppointments(upcoming.data || [])
      setPastAppointments(past.data || [])
    } catch (e) {
      // ignore
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      qualification: '',
      experience: '',
      rating: 4.5,
      reviewsCount: 0,
      consultationFee: 150,
      location: {
        city: '',
        state: '',
        address: '',
        hospital: ''
      },
      availability: {
        days: [],
        timeSlots: []
      },
      contactInfo: {
        phone: '',
        email: ''
      },
      services: [],
      languages: [],
      image: '',
      bio: '',
      education: [],
      insuranceAccepted: []
    })
  }

  const handleAddDoctor = () => {
    setShowAddForm(true)
    setEditingDoctor(null)
    resetForm()
  }

const toFormData = (doctor) => ({
    name: doctor?.name || '',
    specialization: doctor?.specialization || '',
    qualification: doctor?.qualification || '',
    experience: doctor?.experience || '',
    rating: doctor?.rating || 0,
    reviewsCount: doctor?.reviewsCount || 0,
    consultationFee: doctor?.consultationFee || 0,
    location: {
      city: doctor?.location?.city || '',
      state: doctor?.location?.state || '',
      address: doctor?.location?.address || '',
      hospital: doctor?.location?.hospital || ''
    },
    availability: {
      days: doctor?.availability?.days || [],
      timeSlots: doctor?.availability?.timeSlots || []
    },
    contactInfo: {
      phone: doctor?.contactInfo?.phone || '',
      email: doctor?.contactInfo?.email || ''
    },
    services: doctor?.services || [],
    languages: doctor?.languages || [],
    image: doctor?.image || '',
    bio: doctor?.bio || '',
    education: doctor?.education || [],
    insuranceAccepted: doctor?.insuranceAccepted || []
  })

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor)
    setFormData(toFormData(doctor))
    setShowAddForm(true)
  }

const handleSaveDoctor = async () => {
  try {
      const payload = {
        name: formData.name,
        speciality: formData.specialization,
        phone: formData?.contactInfo?.phone,
        email: formData?.contactInfo?.email,
        consultationFee: formData.consultationFee,
        rating: formData.rating,
        reviewsCount: formData.reviewsCount,
        location: {
          city: formData?.location?.city,
          state: formData?.location?.state,
          hospital: formData?.location?.hospital,
          address: formData?.location?.address,
        },
        availability: {
          days: formData?.availability?.days || [],
          timeSlots: formData?.availability?.timeSlots || [],
        },
        services: formData?.services || [],
        languages: formData?.languages || [],
        image: formData?.image || '',
        bio: formData?.bio || ''
      }
      if (editingDoctor) {
        await admin.updateDoctor(editingDoctor.id, payload)
      } else {
        await admin.createDoctor(payload)
      }
      
      setShowAddForm(false)
      setEditingDoctor(null)
      resetForm()
      await loadData()
      
      const message = editingDoctor ? 'Doctor updated successfully!' : 'Doctor added successfully!'
      setNotification({ type: 'success', message })
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({ type: 'error', message: 'Error saving doctor: ' + error.message })
      setTimeout(() => setNotification(null), 5000)
    }
  }

const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await admin.deleteDoctor(doctorId)
      await loadData()
      setNotification({ type: 'success', message: 'Doctor deleted successfully!' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleArrayInput = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item)
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: array
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: array
      }))
    }
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSpecialization === '' || 
                         doctor.specialization === filterSpecialization
    return matchesSearch && matchesFilter
  })

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span>Doctor Database Admin</span>
            </h1>
            <p className="text-gray-600">Manage your doctor database with ease</p>
<div className="flex items-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">
                Database: {statistics.availableDoctors} active doctors • 
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Appointments Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              <button onClick={loadAppointments} className="text-sm text-blue-600">Refresh</button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {upcomingAppointments.length === 0 && <p className="text-gray-500 text-sm">No upcoming appointments.</p>}
              {upcomingAppointments.map(a => (
                <div key={a.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{a.date} • {a.time}</div>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">{a.status}</span>
                  </div>
                  <div className="text-sm text-gray-600">Patient: {a?.patient?.name || 'N/A'} • {a?.patient?.phone || ''}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Previous Appointments</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pastAppointments.length === 0 && <p className="text-gray-500 text-sm">No previous appointments.</p>}
              {pastAppointments.map(a => (
                <div key={a.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{a.date} • {a.time}</div>
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">{a.status}</span>
                  </div>
                  <div className="text-sm text-gray-600">Patient: {a?.patient?.name || 'N/A'} • {a?.patient?.phone || ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{statistics.availableDoctors}</h3>
                <p className="text-gray-600">Active Doctors</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{statistics.averageRating}</h3>
                <p className="text-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{statistics.cities}</h3>
                <p className="text-gray-600">Cities</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{statistics.specializations}</h3>
                <p className="text-gray-600">Specializations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleAddDoctor}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Doctor</span>
            </motion.button>
            
            <button 
              onClick={loadData}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            
          </div>
          
          {/* Notification */}
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 right-4 z-50 px-4 py-2 rounded-lg text-white ${
                notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {notification.message}
            </motion.div>
          )}

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Specializations</option>
              {statistics.specializationsList?.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={doctor.image || `https://ui-avatars.com/api/?name=${doctor.name}&background=random`}
                          alt={doctor.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.qualification}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.specialization}</div>
                      <div className="text-sm text-gray-500">{doctor.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.location.hospital}</div>
                      <div className="text-sm text-gray-500">{doctor.location.address || `${doctor.location.city}${doctor.location.city && doctor.location.state ? ', ' : ''}${doctor.location.state}`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{doctor.consultationFee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{doctor.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({doctor.reviewsCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditDoctor(doctor)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doctor Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Dr. John Smith"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization *
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Cardiologist"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="MD, FACC"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="10 years"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Fee (₹) *
                    </label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="150"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="location.city"
                        value={formData.location.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="New York"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="location.state"
                        value={formData.location.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="NY"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital/Clinic Name
                      </label>
                      <input
                        type="text"
                        name="location.hospital"
                        value={formData.location.hospital}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Central Medical Hospital"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        name="location.address"
                        value={formData.location.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="123 Medical Center Dr, New York, NY 10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="contactInfo.phone"
                        value={formData.contactInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="+1-555-0123"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="contactInfo.email"
                        value={formData.contactInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="dr.smith@careconnect.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Days (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formData.availability.days.join(', ')}
                        onChange={(e) => handleArrayInput('availability.days', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Monday, Tuesday, Wednesday, Friday"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Slots (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formData.availability.timeSlots.join(', ')}
                        onChange={(e) => handleArrayInput('availability.timeSlots', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="09:00-10:00, 10:00-11:00, 14:00-15:00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Services Offered (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formData.services.join(', ')}
                        onChange={(e) => handleArrayInput('services', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Heart Disease Treatment, Cardiac Surgery"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Languages (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formData.languages.join(', ')}
                        onChange={(e) => handleArrayInput('languages', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="English, Spanish, French"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="https://example.com/doctor-photo.jpg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio/Description
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Brief description of the doctor's expertise and background..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDoctor}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingDoctor ? 'Update Doctor' : 'Save Doctor'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage