import { api, setToken } from './api'

export const admin = {
  loginDoctor: async (phone) => {
    const res = await api.post('/api/admin/doctor-login', { phone })
    setToken(res.token)
    return res
  },
  listDoctors: () => api.get('/api/admin/doctors'),
  createDoctor: (payload) => api.post('/api/admin/doctors', payload),
  updateDoctor: (id, payload) => api.put(`/api/admin/doctors/${id}`, payload),
  deleteDoctor: (id) => api.del(`/api/admin/doctors/${id}`),
  getHospital: () => api.get('/api/admin/hospital'),
  updateHospital: (payload) => api.put('/api/admin/hospital', payload),
  listAppointments: (scope = 'upcoming') => api.get(`/api/admin/appointments?scope=${encodeURIComponent(scope)}`),
}
