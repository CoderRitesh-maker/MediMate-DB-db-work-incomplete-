import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Clock, 
  DollarSign,
  Map,
  List,
  Loader,
  Calendar
} from 'lucide-react'
import { searchDoctors, getSpecializations, getCities, syncDoctorsFromBackend, API_BASE } from '../utils/doctorDatabase'
import BookingModal from '../components/BookingModal'
import DatabaseStatus from '../components/DatabaseStatus'
import MapView from '../components/MapView'

const SearchPage = () => {
  const [location, setLocation] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'map'
  const [filters, setFilters] = useState({
    specialty: '',
    distance: 10,
    rating: 0,
    maxFee: 2000,
    availability: ''
  })
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [specialties, setSpecialties] = useState([])
  const [cities, setCities] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const getLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsLoadingLocation(false)
        }
      )
    }
  }

  useEffect(() => {
    getLocation()
    const init = async () => {
      if (API_BASE) {
        await syncDoctorsFromBackend()
      }
      loadDoctorsData()
    }
    init()
    
    // Listen for database updates (for admin panel changes)
    const handleStorageChange = (e) => {
      if (e.key === 'careconnect_doctors_db') {
        console.log('💾 Database updated, refreshing search data...')
        loadDoctorsData()
      }
    }
    
    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange)
    
    // Also check for updates when window regains focus (for same-tab updates)
    const handleFocus = () => {
      loadDoctorsData()
    }
    
    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const loadDoctorsData = () => {
    try {
      const allDoctors = searchDoctors() // Get all doctors initially
      const allSpecialties = ['All Specialties', ...getSpecializations()]
      const allCities = getCities()
      
      setDoctors(allDoctors)
      setSpecialties(allSpecialties)
      setCities(allCities)
      
      console.log('🔄 Loaded', allDoctors.length, 'doctors for search')
    } catch (error) {
      console.error('❌ Error loading doctors data:', error)
    }
  }

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    // Search filter
    const matchesSearch = !searchQuery || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Specialty filter
    const matchesSpecialty = !filters.specialty || 
      filters.specialty === 'All Specialties' ||
      doctor.specialization === filters.specialty
    
    // Rating filter
    const matchesRating = doctor.rating >= filters.rating
    
    // Fee filter
    const matchesFee = doctor.consultationFee <= filters.maxFee
    
    return matchesSearch && matchesSpecialty && matchesRating && matchesFee
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Doctor Near You</h1>
          <p className="text-gray-600">Discover qualified healthcare professionals in your area</p>
        </motion.div>

        {/* Search and Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors, specialties, or conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <button
              onClick={getLocation}
              disabled={isLoadingLocation}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoadingLocation ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5" />
              )}
              <span>{isLoadingLocation ? 'Getting Location...' : 'Use My Location'}</span>
            </button>
          </div>

          {location && (
            <div className="text-sm text-green-600 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Location detected • Searching nearby doctors</span>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={filters.specialty}
                    onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Distance Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance: {filters.distance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={filters.distance}
                    onChange={(e) => setFilters({...filters, distance: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({...filters, rating})}
                        className={`p-2 ${filters.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fee Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Consultation Fee: ₹{filters.maxFee}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={filters.maxFee}
                    onChange={(e) => setFilters({...filters, maxFee: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-3/4"
          >
            {/* Database Status */}
            <div className="mb-6">
              <DatabaseStatus compact={true} />
            </div>

            {/* View Mode Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-gray-600">{filteredDoctors.length} doctors found</span>
                {searchQuery || filters.specialty !== '' ? (
                  <span className="text-sm text-blue-600 ml-2">(filtered results)</span>
                ) : null}
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                    viewMode === 'map' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Map className="w-4 h-4" />
                  <span>Map</span>
                </button>
              </div>
            </div>

            {/* Doctor Cards */}
            {viewMode === 'list' && (
              <div className="space-y-6">
                {filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={doctor.image || `https://ui-avatars.com/api/?name=${doctor.name}&background=random`}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-lg object-cover bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-primary-600 font-medium">{doctor.specialization}</p>
                            <p className="text-gray-500 text-sm">{doctor.location.hospital}</p>
                            <p className="text-gray-500 text-xs">{doctor.location.address || `${doctor.location.city}${doctor.location.city && doctor.location.state ? ', ' : ''}${doctor.location.state}`}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{doctor.rating}</span>
                              <span className="text-gray-500 text-sm">({doctor.reviewsCount})</span>
                            </div>
                            <p className="text-gray-500 text-sm">{doctor.experience}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">₹{doctor.consultationFee}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Available {doctor.availability.days.slice(0,2).join(', ')}</span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => {
                                setSelectedDoctor(doctor)
                                setShowBookingModal(true)
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                            >
                              <Calendar className="w-4 h-4" />
                              <span>Book Appointment</span>
                            </button>
                            <Link to={`/doctor/${doctor.id}`}>
                              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                View Profile
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Map View */}
            {viewMode === 'map' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-3 text-sm text-gray-600">
                  {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                    <span>Showing doctors on map. Click a marker to book.</span>
                  ) : (
                    <span className="text-yellow-700">Set VITE_GOOGLE_MAPS_API_KEY in your .env to enable Google Maps.</span>
                  )}
                </div>
                <MapView 
                  doctors={filteredDoctors}
                  userLocation={location}
                  onSelectDoctor={(doc) => { setSelectedDoctor(doc); setShowBookingModal(true) }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <BookingModal 
          doctor={selectedDoctor}
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedDoctor(null)
          }}
        />
      )}
    </div>
  )
}

export default SearchPage
