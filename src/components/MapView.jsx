import React, { useEffect, useRef, useState } from 'react'
import { loadGoogleMaps } from '../utils/googleMaps'

// Map view that geocodes doctor addresses and shows markers
const MapView = ({ doctors = [], userLocation, onSelectDoctor }) => {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const infoWindow = useRef(null)
  const geocoder = useRef(null)
  const userMarker = useRef(null)
  const [error, setError] = useState(null)

  const recenterToUser = (google) => {
    const map = mapInstance.current
    if (!google || !map || !userLocation) return
    const pos = { lat: userLocation.latitude, lng: userLocation.longitude }
    if (!userMarker.current) {
      userMarker.current = new google.maps.Marker({
        position: pos,
        map,
        title: 'You are here',
        icon: {
          url: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
        },
      })
    } else {
      userMarker.current.setPosition(pos)
    }
    map.panTo(pos)
    if (map.getZoom() < 13) map.setZoom(13)
  }

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      try {
        const google = await loadGoogleMaps()
        if (cancelled) return
        const center = userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : { lat: 18.5204, lng: 73.8567 } // Pune default
        mapInstance.current = new google.maps.Map(mapRef.current, { center, zoom: 12 })
        geocoder.current = new google.maps.Geocoder()
        infoWindow.current = new google.maps.InfoWindow()
        plotMarkers(google)
        // In case userLocation was already set before map loaded
        recenterToUser(google)
      } catch (e) {
        setError(e.message)
      }
    }
    init()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mapInstance.current || !geocoder.current || !window.google) return
    plotMarkers(window.google)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors])

  // Recenter on user location changes
  useEffect(() => {
    const google = window.google
    if (!google) return
    recenterToUser(google)
  }, [userLocation])

  const getAddressString = (d) => {
    const parts = [d?.location?.hospital, d?.location?.address, d?.location?.city, d?.location?.state].filter(Boolean)
    return parts.join(', ')
  }

  const getCachedLatLng = (id) => {
    try {
      const raw = localStorage.getItem('gmaps_geocode_v1')
      const cache = raw ? JSON.parse(raw) : {}
      return cache[id] || null
    } catch {
      return null
    }
  }

  const setCachedLatLng = (id, latLng) => {
    try {
      const raw = localStorage.getItem('gmaps_geocode_v1')
      const cache = raw ? JSON.parse(raw) : {}
      cache[id] = latLng
      localStorage.setItem('gmaps_geocode_v1', JSON.stringify(cache))
    } catch {}
  }

  const plotMarkers = async (google) => {
    const map = mapInstance.current
    const bounds = new google.maps.LatLngBounds()

    for (const d of doctors.slice(0, 50)) { // safety cap
      const cached = getCachedLatLng(d.id)
      let loc = cached
      if (!loc) {
        const address = getAddressString(d)
        if (!address) continue
        try {
          const res = await geocoder.current.geocode({ address })
          const r = res.results?.[0]
          if (r) {
            loc = { lat: r.geometry.location.lat(), lng: r.geometry.location.lng() }
            setCachedLatLng(d.id, loc)
          }
        } catch { /* ignore geocode errors */ }
      }
      if (!loc) continue

      const marker = new google.maps.Marker({ position: loc, map, title: d.name })
      bounds.extend(loc)
      marker.addListener('click', () => {
        const content = `
          <div style="min-width:220px">
            <div style="font-weight:600">${d.name}</div>
            <div style="color:#2563eb">${d.specialization || d.speciality || ''}</div>
            <div style="margin:4px 0">₹${d.consultationFee || 0} • ⭐ ${d.rating || 0}</div>
            <button id="book_${d.id}" style="margin-top:6px;background:#16a34a;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer">Book</button>
          </div>`
        infoWindow.current.setContent(content)
        infoWindow.current.open({ anchor: marker, map })
        window.google.maps.event.addListenerOnce(infoWindow.current, 'domready', () => {
          const btn = document.getElementById(`book_${d.id}`)
          if (btn) btn.onclick = () => onSelectDoctor?.(d)
        })
      })
    }

    if (!bounds.isEmpty()) map.fitBounds(bounds)
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
        Google Maps: {error}. Add VITE_GOOGLE_MAPS_API_KEY and reload.
      </div>
    )
  }

  return <div ref={mapRef} className="h-96 rounded-lg overflow-hidden" />
}

export default MapView
