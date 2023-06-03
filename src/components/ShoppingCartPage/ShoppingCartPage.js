import React, { useState } from 'react';
import './ShoppingCartPage.css';
import AddressComponent from '../Address/AddressComponent'

const ShoppingCartPage = ({ cartItems, setCartItems }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
  };

  const updateCartItem = (item, newCount) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, count: newCount };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };
    // Calculate the total price
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.count;
    }, 0);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleUpdateCartItem = (item, newCount) => {
    updateCartItem(item, newCount);
  };

  const submitOrder = async (order) => {
    try {
      // Make an API request to save the order in the database
      const response = await fetch('http://localhost:3000/api/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (response.ok) {
        // Clear the cart items after successful order submission
        setCartItems([]);
        // Display a success message or redirect to a confirmation page
        alert('Order submitted successfully');
      } else {
        // Handle the error case
        alert('Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.log('Error submitting order:', error);
      // Handle the error case
      alert('Failed to submit order. Please try again.');
    }
  };

  const handleSubmitOrder = () => {
    const order = {
      name,
      email,
      phoneNumber,
      address,
      items: cartItems,
      total: total,
    };
    submitOrder(order);
    alert('Order sent successfully')
    setName('');
    setAddress('');
    setEmail('');
    setPhoneNumber('');
    console.log('Order sent successfully', JSON.stringify(order));
  };

  return (
    <div className="shopping-cart-page">
      <div className="inputs-column">
        <h2>Customer Information</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Enter your name"
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter your email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="Enter your phone"
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <AddressComponent onAddressChange={setAddress} address={address} setAddress={setAddress}/>
        <p>Total Price: ${total.toFixed(2)}</p>
        <button className="submit-button" onClick={handleSubmitOrder}>
          Submit Order
        </button>
      </div>
      <div className="dishes-column">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price * item.count}</p>
                </div>
                <div className="item-actions">
                  <button className="remove-button" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </button>
                  <div className="quantity-input">
                    <button
                      className="quantity-button"
                      onClick={() => handleUpdateCartItem(item, item.count - 1)}
                      disabled={item.count === 1}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      className="quantity-button"
                      onClick={() => handleUpdateCartItem(item, item.count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;