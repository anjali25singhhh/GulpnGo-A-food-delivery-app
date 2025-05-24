import React, { useEffect, useState } from 'react';
import './AddRestaurant.css';
import { toast } from 'react-toastify';
import { assets, url } from '../../assets/assets';
import axios from 'axios';

const AddRestaurant = () => {
  const [data, setData] = useState({
    name: '',
    location: '',
  });
  const [image, setImage] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  // 🔁 Function to fetch location
  const fetchLocation = () => {
    setLoadingLocation(true);
    setLocationStatus('Fetching location...');
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      setLoadingLocation(false);
      setLocationStatus('Failed to fetch');
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const loc = response.data.display_name;
            setData((prev) => ({ ...prev, location: loc }));
            setLocationStatus('Location fetched successfully ✅');
          } catch (err) {
            toast.error('Error fetching location details');
            setLocationStatus('Failed to fetch');
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          toast.error('Permission denied or error getting location');
          setLocationStatus('Failed to fetch');
          setLoadingLocation(false);
        }
      );
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return toast.error('Image not selected');

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('image', image);

    try {
      const res = await axios.post(`${url}/api/restaurant/add`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setData({ name: '', location: data.location }); // retain location
        setImage(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              e.target.value = '';
            }}
            type="file"
            accept="image/*"
            id="restaurant-image"
            hidden
          />
          <label htmlFor="restaurant-image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt=""
            />
          </label>
        </div>
        <div className="add-restaurant-name flex-col">
          <p>Restaurant Name</p>
          <input
            name="name"
            onChange={handleChange}
            value={data.name}
            type="text"
            placeholder="Enter restaurant name"
            required
          />
        </div>
        <div className="add-restaurant-location flex-col">
          <p>Restaurant Location</p>
          <textarea
  name="location"
  onChange={handleChange}
  value={data.location}
  rows={4}
/>

          <button
            type="button"
            onClick={fetchLocation}
            disabled={loadingLocation}
            className="location-refresh-btn"
          >
            🔄 Refresh Location
          </button>
          {loadingLocation && <p>⏳ {locationStatus}</p>}
          {!loadingLocation && locationStatus && <p>✅ {locationStatus}</p>}
        </div>
        <button type="submit" className="add-btn">
          ADD RESTAURANT
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
