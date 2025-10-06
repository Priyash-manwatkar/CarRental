import React, { useState ,useEffect } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!image) return toast.error('Please upload an image of your car');

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      Object.keys(car).forEach(key => formData.append(key, car[key]));

      const response = await axios.post('/api/owner/add-car', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Car listed successfully!');
        setImage(null);
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add New Car" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">

        {/* Car Image Upload */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Car"
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={e => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Audi"
              required
              value={car.brand}
              onChange={e => setCar({ ...car, brand: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            />
          </div>
          <div>
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5, A4"
              required
              value={car.model}
              onChange={e => setCar({ ...car, model: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label>Year</label>
            <input
              type="text"
              placeholder="e.g. 2022"
              required
              value={car.year}
              onChange={e => setCar({ ...car, year: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            />
          </div>
          <div>
            <label>Daily Price ({currency})</label>
            <input
              type="text"
              placeholder="e.g. 1500"
              required
              value={car.pricePerDay}
              onChange={e => setCar({ ...car, pricePerDay: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            />
          </div>
          <div>
            <label>Category</label>
            <select
              required
              value={car.category}
              onChange={e => setCar({ ...car, category: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            >
              <option value="">Select a Category</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel Type, Seating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label>Transmission</label>
            <select
              required
              value={car.transmission}
              onChange={e => setCar({ ...car, transmission: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            >
              <option value="">Select Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semi-automatic">Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label>Fuel Type</label>
            <select
              required
              value={car.fuel_type}
              onChange={e => setCar({ ...car, fuel_type: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            >
              <option value="">Select Fuel Type</option>
              <option value="gas">Gas</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label>Seating Capacity</label>
            <input
              type="text"
              placeholder="e.g. 5, 7"
              required
              value={car.seating_capacity}
              onChange={e => setCar({ ...car, seating_capacity: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
            />
          </div>
        </div>

        {/* Location & Description */}
        <div>
          <label>Location</label>
          <select
            required
            value={car.location}
            onChange={e => setCar({ ...car, location: e.target.value })}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
          >
            <option value="">Select Location</option>
            <option value="new_york">New York</option>
            <option value="los_angeles">Los Angeles</option>
            <option value="houston">Houston</option>
            <option value="chicago">Chicago</option>
          </select>
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="Describe your car..."
            required
            value={car.description}
            onChange={e => setCar({ ...car, description: e.target.value })}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-3 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer"
        >
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Car'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
