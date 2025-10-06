// import React from 'react'
// import Title from './Title'
// import { assets, dummyCarData } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// function FeaturedSection() {

//     const navigate=useNavigate();
//     const {cars}=useAppContext()
//   return (
//     <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
//       <div>
//         <Title title="Featured Vechiles" subTitle="Explore our selection of premium vechiles available for your next adventure "/>

//       </div>
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
//         {
//             cars.slice(0,6).map((car)=>(
//                 <div key={car._id}>
//                    <CarCard car={car}/>
//                 </div>
//             ))
//         }
        
//       </div>
//       <button 
//       onClick={()=>{
//         navigate('/cars'); scrollTo(0,0)
//       }}
//       className='flex items-centrt justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-grap-50 rounded-md mt-18 cursor-pointer'>Explore All Cars <img src={assets.arrow_icon} alt='arrow'/></button>
//     </div>
//   )
// }

// export default FeaturedSection

import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

function FeaturedSection() {
  const navigate = useNavigate();
  const { cars } = useAppContext();
  console.log(cars)

  return (
    <motion.div 
          initial={{y:40,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:0.8,ease:"easeOut"}}
    
    className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
      <motion.div
         initial={{y:20,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:1,delay:0.5}}
      >
        <Title 
          title="Featured Vehicles" 
          subTitle="Explore our selection of premium vehicles available for your next adventure" 
        />
      </motion.div>

      <motion.div 
         initial={{y:100,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:1,delay:0.5}}
      
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
        {/* {cars.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))} */}
{Array.isArray(cars) ? cars.slice(0, 6).map((car) => (
  <motion.div 
     initial={{y:100,scale:0.95}}
          whileInView={{opacity:1,scale:1}}
    transition={{duration:0.4,ease:"easeOut"}}
  
  
  key={car._id}>
    <CarCard car={car} />
  </motion.div>
)) : null}


      </motion.div>

      <motion.button

         initial={{y:10,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:0.6,delay:0.4}}
        onClick={() => {
          navigate('/cars');
          window.scrollTo(0, 0);
        }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 cursor-pointer'
      >
        Explore All Cars 
        <img src={assets.arrow_icon} alt='arrow'/>
      </motion.button>
    </motion.div>
    
  )
}

export default FeaturedSection
