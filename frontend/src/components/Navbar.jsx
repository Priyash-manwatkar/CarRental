// import { useState } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import {motion} from 'motion/react'


function Navbar() {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role'); // added leading slash for consistency
      if (data.success) {
        setIsOwner(data.isOwner); // ✅ use boolean from backend
        toast.success(data.message || 'Role updated');
        navigate('/owner');
      } else {
        toast.error(data.message || 'Unable to change role');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error changing role');
    }
  };

  return (
    <motion.div
     initial={{y:-20,opacity:0}}
     animate={{y:0,opacity:1}}
     transition={{duration:0.5}}

      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all 
      ${location.pathname === '/' ? 'bg-gray-50' : 'bg-white'}`} // ✅ use valid Tailwind class
    >
      {/* Logo */}
      <Link to='/'>
        <motion.img whileHover={{scale:1.05}}
        src={assets.logo} alt='logo' className='h-8' />
      </Link>

      {/* Nav Links */}
      <div
        className={`max-sm:fixed max-sm:top-16 max-sm:right-0 max-sm:h-screen max-sm:w-full max-sm:p-4 max-sm:bg-white 
        max-sm:border-t border-borderColor flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 
        transition-all duration-300 z-50 ${
          open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'
        } ${location.pathname === '/' ? 'bg-gray-50' : 'bg-white'}`} // ✅ consistent class
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className='hover:text-primary transition-colors'
          >
            {link.name}
          </Link>
        ))}

        {/* Search Bar (Only on Large Screens) */}
        <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
          <input
            type='text'
            className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
            placeholder='Search products'
            aria-label='Search products' // ✅ accessibility
            autoComplete='off'
          />
          <img src={assets.search_icon} alt='search' />
        </div>

        {/* Auth / Role Buttons */}
        <div className='flex flex-col sm:flex-row gap-2'>
          <button
            className='cursor-pointer text-sm text-primary underline'
            onClick={() => (isOwner ? navigate('/owner') : changeRole())}
          >
            {isOwner ? 'Dashboard' : 'List cars'}
          </button>

          <button
            className='cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'
            onClick={() => {
              setOpen(false); // ✅ close mobile menu when clicking
              user ? logout() : setShowLogin(true);
            }}
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className='sm:hidden cursor-pointer'
        aria-label='Menu'
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt='menu' />
      </button>
    </motion.div>
  );
}

export default Navbar;
