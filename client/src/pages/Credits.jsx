import React, { useState, useEffect } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Credits = () => {

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const {token, axios } = useAppContext()

  const fetchPlans = async () =>{
    try {
      const { data } = await axios.get('/api/credit/plan', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if(data.success){
        setPlans(data.plans)
      }else{
        toast.error(data.message || 'Failed to fetch plans.')
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post('/api/credit/purchase', {planId}, {headers: { Authorization: `Bearer ${token}`}})
      if(data.success) {
        window.location.href = data.url
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    fetchPlans()
  },[])

  if(loading) return <Loading/>

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <h2 className="text-3xl font-semibold text-center mb-10 xl:mt-30 text-purple-200">
        Premium Credit Plans
      </h2>

      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan)=>(   
          <div 
            key={plan._id} 
            className={`
              border border-purple-400/20
              rounded-2xl
              backdrop-blur-2xl
              shadow-xl
              transition-all
              p-6 min-w-[300px] flex flex-col
              hover:scale-105
              hover:shadow-purple-500/30
              ${plan._id === "pro"
                ? "bg-gradient-to-b from-purple-900/60 via-fuchsia-900/50 to-black ring-2 ring-purple-400/40"
                : "bg-gradient-to-b from-purple-900/40 to-black/80"}
            `}
          >
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  {plan.name}
                </h3>

                <p className="text-purple-200 text-lg font-semibold">
                  ${plan.price}
                  <span className='text-base font-normal text-purple-300'>
                    {' '} / {plan.credits} credits
                  </span>
                </p>

                <ul className="list-disc list-inside text-sm text-purple-200 space-y-1 mt-3">
                  {plan.features.map((feature, index)=>(
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button onClick={()=> toast.promise(purchasePlan(plan._id), {loading: 'Processing...'})} className="
                mt-6
                bg-gradient-to-r from-purple-600 to-pink-600
                hover:from-purple-500 hover:to-pink-500
                active:scale-95
                text-white font-medium py-2 rounded-xl
                shadow-lg shadow-purple-500/40
                transition-all cursor-pointer
              ">
                Upgrade Now
              </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits  