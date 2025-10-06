import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const {user,axios,fetchUser}=useAppContext()
  const location = useLocation();

  const [image, setImage] = useState('');
  const updateImage = async () => {
     try{
      const formData=new FormData()
      formData.append('image',image)
      const {data}=await axios.post('/api/owner/update-image',formData)
      if(data.success){
        fetchUser();
        toast.success(data.message);
        setImage('')
      }
      else{
        toast.error(data.message)
      }

     }
     catch(error){
       toast.error(data.message)
     }
     
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center p-8 max-w-sm md:max-w-[15rem] w-full border-r border-borderColor text-sm'>
      <div className='group relative'>
        <label htmlFor='image'>
          <img
            src={image ? URL.createObjectURL(image) : user?.image || ' '}
            alt=''
            className='w-20 h-20 rounded-full object-cover'
          />
          <input
            type='file'
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
            <img src={assets.edit_icon} alt='' />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className='absolute top-2 right-2 flex items-center p-2 gap-1 bg-primary/10 text-primary cursor-pointer rounded'
        >
          Save <img src={assets.check_icon} alt='Save' />
        </button>
      )}

      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

      <div className='w-full'>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600'
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt=''
            />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === location.pathname && (
              <div className='bg-primary w-1.5 h-8 rounded absolute right-0'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
