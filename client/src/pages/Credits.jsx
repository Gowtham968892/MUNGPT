import React, { useState, useEffect } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'

const Credits = () => {

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPlans = async () =>{
    setPlans(dummyPlans)
    setLoading(false)
  }

  useEffect(()=>{
    fetchPlans()
  },[])

  if(loading) return <Loading/>

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6
    lg:px-8 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 xl:mt-30
      text-green-200">Credit Plans</h2>

      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan)=>(   
          <div key={plan._id} className={`
            border border-green-500/30
            rounded-xl
            backdrop-blur-xl
            shadow-lg shadow-green-500/20
            hover:shadow-green-500/40
            transition-all
            p-6 min-w-[300px] flex flex-col
            ${plan._id === "pro"
              ? "bg-gradient-to-b from-green-900/50 to-green-950/70 scale-105 ring-2 ring-green-400/40"
              : "bg-gradient-to-b from-green-900/30 to-green-950/50"}
          `}>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-green-50 mb-2'>
                  {plan.name}
                </h3>

                <p className="text-green-200">
                  ${plan.price}
                  <span className='text-base font-normal text-green-300'>
                    {' '} / {plan.credits} credits
                  </span>
                </p>

                <ul className="list-disc list-inside text-sm text-green-200 space-y-1 mt-2">
                  {plan.features.map((feature, index)=>(
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button className="
                mt-6
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-400 hover:to-emerald-500
                active:scale-95
                text-white font-medium py-2 rounded-lg
                shadow-lg shadow-green-500/30
                transition-all cursor-pointer
              ">
                Buy Now
              </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
