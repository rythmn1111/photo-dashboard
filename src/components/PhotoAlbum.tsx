import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase, Link } from '../lib/supabase'

interface PhotoAlbumProps {
  className?: string
}

export default function PhotoAlbum({ className = '' }: PhotoAlbumProps) {
  const [photos, setPhotos] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPhotos()
    
    // Auto-refresh every 30 seconds to check for new photos
    const interval = setInterval(() => {
      fetchPhotos(true) // Pass true to indicate this is an auto-refresh
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchPhotos = async (isAutoRefresh = false) => {
    try {
      // Only show loading spinner on initial load, not on auto-refresh
      if (!isAutoRefresh) {
        setLoading(true)
      }
      
      console.log('Fetching photos from Supabase...')
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Fetched photos:', data)
      console.log('Number of photos:', data?.length || 0)
      setPhotos(data || [])
      setError(null) // Clear any previous errors
    } catch (err) {
      console.error('Error fetching photos:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch photos')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-white"></div>
          <p className="text-emerald-400 text-xl">Loading photos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <p className="text-red-300 mb-4 text-xl">Error: {error}</p>
          <button
            onClick={() => fetchPhotos()}
            className="px-6 py-3 bg-white text-teal-900 rounded-full font-medium hover:bg-teal-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <p className="text-emerald-400 mb-4 text-xl">No photos found</p>
          <button
            onClick={() => fetchPhotos()}
            className="px-6 py-3 bg-emerald-500 text-black rounded-full font-medium hover:bg-emerald-400 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.svg"
            alt="Arweave Logo"
            width={200}
            height={200}
            className="text-white"
          />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-white tracking-wider">
            Arweave Day Asia
          </h1>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
          <div className="w-full max-w-7xl">
            <h2 className="text-4xl font-bold text-white mb-8 text-center md:text-left md:ml-3">
              #Champion Summit#
            </h2>
          </div>
        
        <div className="flex flex-wrap gap-8 justify-center max-w-7xl">
        {photos.map((photo, index) => (
          <a 
            key={photo.id || index} 
            href={photo.arweave_link || photo.links}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative cursor-pointer"
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-4 rounded-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 transform rotate-1 hover:rotate-0">
              {/* Photo */}
              <div className="w-64 h-64 bg-white rounded-sm overflow-hidden shadow-inner">
                        <Image
                          src={photo.links}
                          alt={`Photo ${photo.id}`}
                          width={256}
                          height={256}
                          className="w-full h-full object-cover"
                          onLoad={() => console.log('Image loaded:', photo.links)}
                          onError={() => console.log('Image failed:', photo.links)}
                        />
              </div>
              
                      {/* Polaroid Bottom Strip */}
                      <div className="bg-white h-16 mt-4 rounded-sm flex items-center justify-center border-t border-gray-200">
                        <Image
                          src="/pola.png"
                          alt="Polaroid Logo"
                          width={100}
                          height={100}
                          className="opacity-60"
                        />
                      </div>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center pointer-events-none">
              <span className="px-6 py-3 bg-emerald-500 text-black rounded-full font-medium shadow-lg">
                View on Arweave
              </span>
            </div>
          </a>
        ))}
        </div>
      </div>
    </div>
  )
}

