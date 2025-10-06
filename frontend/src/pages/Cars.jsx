// import React, { useState, useEffect } from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import CarCard from '../components/CarCard'
// import Fotter from '../components/Fotter'
// import { useSearchParams } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// function Cars() {
//   const [searchParams] = useSearchParams();
//   const pickupLocation = searchParams.get('pickupLocation');
//   const pickupDate = searchParams.get('pickupDate');
//   const returnDate = searchParams.get('returnDate');

//   const { cars, axios } = useAppContext();

//   const [input, setInput] = useState("");
//   const [filteredCars, setFilteredCars] = useState([]);

//   const isSearchData = pickupLocation && pickupDate && returnDate;

//   const applyFilter = async () => {
//     if (input === '') {
//       setFilteredCars(cars);
//       return;
//     }

//     const filtered = cars.filter((car) => {
//       return (
//         car.brand.toLowerCase().includes(input.toLowerCase()) ||
//         car.model.toLowerCase().includes(input.toLowerCase()) ||
//         car.category.toLowerCase().includes(input.toLowerCase()) ||
//         car.transmission.toLowerCase().includes(input.toLowerCase())
//       );
//     });

//     setFilteredCars(filtered);
//   };

//   const searchCarAvailablity = async () => {
//     const { data } = await axios.post('/api/bookings/check-availability', {
//       location: pickupLocation,
//       pickupDate,
//       returnDate,
//     });

//     if (data.success) {
//       setFilteredCars(data.availableCars);
//       if (data.availableCars.length === 0) {
//         toast("No Car available");
//       }
//     }
//   };

//   useEffect(() => {
//     if (isSearchData) {
//       searchCarAvailablity();
//     }
//   }, []);

//   useEffect(() => {
//     if (cars.length > 0 && !isSearchData) {
//       applyFilter();
//     }
//   }, [input, cars]);

//   return (
//     <div>
//       <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
//         <Title 
//           title='Available Cars' 
//           subTitle="Browse our selection of premium vehicles available for your next adventure" 
//         />

//         <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
//           <img src={assets.search_icon} alt='' className='w-4.5 h-4.5 mr-2'/>
//           <input 
//             onChange={(e) => setInput(e.target.value)} 
//             value={input} 
//             type='text' 
//             placeholder='Search by make, model, or feature'
//             className='w-full h-full outline-none text-gray-500'
//           />
//           <img src={assets.filter_icon} alt='' className='w-4.5 h-4.5 ml-2'/>
//         </div>
//       </div>

//       <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
//         <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
//           Showing {filteredCars.length} Cars
//         </p>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
//           {filteredCars.map((car, index) => (
//             <div key={index}>
//               <CarCard car={car} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <Fotter />
//     </div>
//   );
// }

// export default Cars;



import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import Fotter from '../components/Fotter'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

function Cars() {
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')
  const [filteredCars, setFilteredCars] = useState([])

  const isSearchData = pickupLocation && pickupDate && returnDate

  // Apply local filter based on input
  // const applyFilter = () => {
  //   if (input === '') {
  //     // setFilteredCars(cars)
  //     // return
  //       setFilteredCars(Array.isArray(cars) ? cars : [])
  // return
  //   }

  //   const filtered = cars.filter((car) => {
  //     return (
  //       car.brand.toLowerCase().includes(input.toLowerCase()) ||
  //       car.model.toLowerCase().includes(input.toLowerCase()) ||
  //       car.category.toLowerCase().includes(input.toLowerCase()) ||
  //       car.transmission.toLowerCase().includes(input.toLowerCase())
  //     )
  //   })


  //   setFilteredCars(filtered)
  // }
  // Apply local filter based on input
const applyFilter = () => {
  if (input === '') {
    // If input is empty, show all cars
    setFilteredCars(Array.isArray(cars) ? cars : []);
    return;
  }

  const filtered = (Array.isArray(cars) ? cars : []).filter((car) => {
    const brand = car.brand?.toLowerCase() || '';
    const model = car.model?.toLowerCase() || '';
    const category = car.category?.toLowerCase() || '';
    const transmission = car.transmission?.toLowerCase() || '';
    const searchInput = input.toLowerCase();

    return (
      brand.includes(searchInput) ||
      model.includes(searchInput) ||
      category.includes(searchInput) ||
      transmission.includes(searchInput)
    );
  });

  setFilteredCars(filtered);
};


  // Fetch available cars from backend based on search
  const searchCarAvailability = async () => {
    if (!pickupLocation || !pickupDate || !returnDate) return

    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      })

      if (data.success) {
        // setFilteredCars(data.availableCar || [])
        // if ((data.availableCar || []).length === 0) {
        //   toast('No cars available')
        // }
          const availableCars = Array.isArray(data.availableCar) ? data.availableCar : []
  setFilteredCars(availableCars)
  if (availableCars.length === 0) {
    toast('No cars available')
  }
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching cars')
    }
  }

  // Initialize filtered cars if no search params
  useEffect(() => {
    if (!isSearchData && cars.length > 0) {
      setFilteredCars(cars)
    }
  }, [cars, isSearchData])

  // Fetch from backend if search params exist
  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability()
    }
  }, [isSearchData])

  // Update filtered cars when input changes
  useEffect(() => {
    if (!isSearchData) {
      applyFilter()
    }
  }, [input])

  return (
    <div>
      <motion.div
        initial={{y:30,opacity:0}}
         animate={{opacity:1,y:0}}
    transition={{duration:0.6,ease:'easeInOut'}}
      
      className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title
          title='Available Cars'
          subTitle='Browse our selection of premium vehicles available for your next adventure'
        />

        <motion.div 
          initial={{y:20,opacity:0}}
          animate={{opacity:1,y:0}}
    transition={{duration:0.6,delay:0.2}}
        className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt='' className='w-5 h-5 mr-2' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Search by make, model, or feature'
            className='w-full h-full outline-none text-gray-500'
          />
          <img src={assets.filter_icon} alt='' className='w-5 h-5 ml-2' />
        </motion.div>
      </motion.div>

      <motion.div 
          initial={{y:20,opacity:0}}
          animate={{opacity:1,y:0}}
    transition={{duration:0.6,delay:0.2}}
      
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredCars.length} Cars
        </p>

        <motion.div
              initial={{y:20,opacity:0}}
          animate={{opacity:1,y:0}}
    transition={{duration:0.6,delay:0.1 }}
        
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {/* {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))} */}
            {Array.isArray(filteredCars) && filteredCars.map((car, index) => (
    <div key={index}>
      <CarCard car={car} />
    </div>
  ))}
        </motion.div>
      </motion.div>

      <Fotter />
    </div>
  )
}

export default Cars
