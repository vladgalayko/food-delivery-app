import React from 'react';

const ShoppingCartPage = ({ cartItems }) => {
  return (
    <div className="shopping-cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3 className="item-name">{item.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;