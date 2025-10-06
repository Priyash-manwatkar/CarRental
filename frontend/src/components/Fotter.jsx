import React from 'react'
import {assets} from '../assets/assets'
import {motion} from 'motion/react';

const Fotter = () => {
 
    return (
        <motion.div
          initial={{y:20,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:0.6,delay:0.2}}
        
        
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <motion.div 
                
                
                  initial={{y:20,opacity:0}}
          whileInView={{opacity:1,y:0}}
    transition={{duration:0.6,delay:0.2}}className='max-w-80'>
                    <motion.img
                      initial={{opacity:0}}
          whileInView={{opacity:1}}
    transition={{duration:0.5,delay:0.3}}
                    src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9' />
                    <motion.p 
                      initial={{opacity:0}}
          whileInView={{opacity:1}}
    transition={{duration:0.5,delay:0.4}}
                    
                    className='text-sm'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    </motion.p>
                    <motion.div
                      initial={{opacity:0}}
          whileInView={{opacity:1}}
    transition={{duration:0.5,delay:0.5}}
                    
                    className='flex items-center gap-3 mt-6'>
                  <a href='#'><img src={assets.facebook_logo} className='w-5 h-5'/></a>
                    <a href='#'><img src={assets.instagram_logo} className='w-5 h-5'/></a>
                       
                         <a href='#'><img src={assets.twitter_logo} className='w-5 h-5'/></a>
                       
                         <a href='#'><img src={assets.gmail_logo} className='w-5 h-5'/></a>
                       
                       
                    </motion.div>
                </motion.div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 '>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>


                      <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 '>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>
                      <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 '>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>
                     

            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </motion.div>
    );

}

export default Fotter
