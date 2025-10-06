import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import {motion} from 'motion/react'

const Testimonals = () => {
        const testimonials = [
        { name: "Emma Rodriguez", address: "Barcelona, Spain", image:assets.testimonial_image_1,
         rating: 5, review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
        {  name: "Liam Johnson", address: "", 
            image:assets.testimonial_image_2,
        rating: 4, 
        review: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
        { name: "Sophia Lee", 
        address: "Seoul, South Korea", image: assets.testimonial_image_2, 
        rating: 5, 
        review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." }
    ];
  return (
     <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
            
<Title title="What Our Customer Says" 
subTitle="Discover WHy Discerning 
traverks choose stayVenture For their Luxury accomadations around the world"/>
            <div className="grid gridcols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial ,index) => (
                    <motion.div
                       initial={{y:40,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:0.6,delay:index*0.2,ease:'easeOut'}}
    viewport={{once:true,amount:0.3}}
                    
                    key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-tranlate-y-1 transition-all duration-500 ">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon}/>
                                
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.review}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
  )
}

export default Testimonals
