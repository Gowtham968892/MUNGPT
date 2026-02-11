import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from '../pages/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Community = () => {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios } = useAppContext()

  const fetchImages = async () => {
     try {
      const {data} = await axios.get('/api/user/published-images')
      if(data.success) {
        setImages(data.images)
      } else {
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
     setLoading(false)
  }

  useEffect(()=>{
    fetchImages()
  },[])

  if (loading) return <Loading/>

  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
      <h2 className='text-xl font-semibold mb-6 text-green-50'>
        Community Images
      </h2>

      {images.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-5'>
          {images.map((item, index)=>(
            <a
              key={index}
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative group block rounded-xl overflow-hidden
                border border-green-500/25
                bg-green-900/10 backdrop-blur
                shadow-sm hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)]
                transition-all duration-300
              "
            >
              <img
                src={item.imageUrl}
                alt={item.username || 'community image'}
                className="
                  w-full h-40 md:h-50 2xl:h-62 object-cover
                  group-hover:scale-105
                  transition-transform duration-300 ease-in-out
                "
              />

              <p
                className="
                  absolute bottom-0 right-0 text-xs
                  bg-black/60 backdrop-blur-md
                  text-green-100 px-4 py-1
                  rounded-tl-xl
                  opacity-0 group-hover:opacity-100
                  transition duration-300
                "
              >
                Created by {item.username}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className='text-center text-green-300 mt-10'>
          No images available.
        </p>
      )}
    </div>
  )
}

export default Community
