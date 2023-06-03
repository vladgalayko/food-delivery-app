import React, { useState } from 'react';
import restaurantData from '../../database.json';
import './ShopsPage.css';

const ShopsPage = ({ addToCart }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  
  const handleAddToCart = (dish) => {
    const isDishAlreadyInCart = cartItems.some((item) => item.id === dish.id);
    if (!isDishAlreadyInCart) {
    addToCart(dish);
    setCartItems((prevItems) => [...prevItems, dish]);
    }
  };

  return (
    <div className="shops-page">
      <div className="restaurant-list">
        <div className="restaurants-column">
          <h2 className="column-heading">Restaurants</h2>
          {restaurantData.restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className={`restaurant-item ${selectedRestaurant === restaurant ? 'active' : ''}`}
              onClick={() => handleRestaurantClick(restaurant)}
            >
              {restaurant.name}
            </div>
          ))}
        </div>
        <div className="dishes-column">
          <h2 className="column-heading">Dishes</h2>
          {selectedRestaurant && (
            <div className="dishes-list">
              {selectedRestaurant.dishes.map((dish) => (
                <div key={dish.id} className="dish-item">
                  <h3>{dish.name}</h3>
                  <p>Price: ${dish.price}</p>
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(dish)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopsPage;