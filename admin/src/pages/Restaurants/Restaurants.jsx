// src/pages/Restaurants/Restaurants.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../assets/assets'; // Assuming you have base URL here
import './Restaurants.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${url}/api/restaurants/list`);
        setRestaurants(res.data.restaurants || []);
      } catch (err) {
        setError('Failed to fetch restaurants');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>{error}</p>;

 return (
  <div className="restaurants-container">
    <h2>Restaurants List</h2>
    {restaurants.length === 0 && <p>No restaurants found.</p>}
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant._id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          <p><strong>Location:</strong> {restaurant.location}</p>
        </li>
      ))}
    </ul>
  </div>
);

};

export default Restaurants;
