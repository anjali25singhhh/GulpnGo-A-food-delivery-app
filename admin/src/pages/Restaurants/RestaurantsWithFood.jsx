import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantsWithFood = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);

  useEffect(() => {
    // Fetch restaurants on mount
    axios.get('/api/restaurants/list')
      .then(res => setRestaurants(res.data.restaurants))
      .catch(() => alert('Failed to load restaurants'));
  }, []);

  useEffect(() => {
    if (selectedRestaurant) {
      setLoadingFoods(true);
      axios.get(`/api/food/by-restaurant/${selectedRestaurant._id}`)
        .then(res => setFoods(res.data.data))
        .catch(() => alert('Failed to load food items'))
        .finally(() => setLoadingFoods(false));
    } else {
      setFoods([]);
    }
  }, [selectedRestaurant]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Sidebar Restaurants */}
      <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
        <h3>Restaurants</h3>
        <ul>
          {restaurants.map(r => (
            <li
              key={r._id}
              style={{ cursor: 'pointer', fontWeight: selectedRestaurant?._id === r._id ? 'bold' : 'normal' }}
              onClick={() => setSelectedRestaurant(r)}
            >
              {r.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Foods and Add Food Form */}
      <div style={{ flex: 1 }}>
        <h3>{selectedRestaurant ? `${selectedRestaurant.name} - Foods` : 'Select a restaurant'}</h3>

        {loadingFoods ? (
          <p>Loading foods...</p>
        ) : (
          <ul>
            {foods.map(food => (
              <li key={food._id}>
                <h4>{food.name}</h4>
                <p>{food.description}</p>
                <p>Price: ₹{food.price}</p>
                {food.image && <img src={`/uploads/${food.image}`} alt={food.name} style={{ width: '100px' }} />}
              </li>
            ))}
          </ul>
        )}

        {selectedRestaurant && <AddFoodForm restaurantId={selectedRestaurant._id} onFoodAdded={() => {
          // Refresh food list after adding food
          axios.get(`/api/food/by-restaurant/${selectedRestaurant._id}`)
            .then(res => setFoods(res.data.data))
            .catch(() => alert('Failed to refresh food list'));
        }} />}
      </div>
    </div>
  );
};

// Form component to add food to selected restaurant
const AddFoodForm = ({ restaurantId, onFoodAdded }) => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = e => setImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.category || !image) {
      alert('Please fill all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('restaurantId', restaurantId);
    formData.append('image', image);

    setLoading(true);
    try {
      await axios.post('/api/food/add', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Food added successfully!');
      setForm({ name: '', description: '', price: '', category: '' });
      setImage(null);
      onFoodAdded();
    } catch {
      alert('Failed to add food');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h4>Add Food Item</h4>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required /><br />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required /><br />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required /><br />
      <input type="file" accept="image/*" onChange={handleImageChange} required /><br />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Food'}</button>
    </form>
  );
};

export default RestaurantsWithFood;
