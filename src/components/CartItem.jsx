// CartItem.jsx
// Shopping Cart page for the Paradise Nursery e-plantShopping app.
// Displays every plant currently in the cart (thumbnail, name, unit price and
// total cost per plant), shows the total cart amount, lets the shopper
// increase/decrease the quantity or delete an item, and provides a
// Checkout button ("Coming Soon") plus a Continue Shopping button that
// returns to the product listing page.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from '../redux/CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Array of plants currently in the cart (Redux store: cart.items)
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total amount for all plants in the cart (quantity * unit price)
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.quantity * Number(item.cost), 0);

  // Calculate the total cost of a single plant (quantity * unit price)
  const calculateTotalCost = (item) => item.quantity * Number(item.cost);

  // Increase the quantity of a plant in the cart by one
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrease the quantity of a plant by one; remove it from the cart if it would drop below 1
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Delete a plant from the shopping cart completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Checkout is not implemented yet, so show a "Coming Soon" message
  const handleCheckout = () => {
    alert('Coming Soon! Checkout functionality will be available in a future release.');
  };

  // Navigate back to the product listing page
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="cart-container">
      {/* Total amount for all plants in the cart */}
      <h2 className="cart-total">
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your shopping cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              {/* Thumbnail of the plant */}
              <img className="cart-item-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                {/* Name of the plant */}
                <div className="cart-item-name">{item.name}</div>

                {/* Unit price of the plant */}
                <div className="cart-item-unit-price">
                  Unit Price: ${Number(item.cost).toFixed(2)}
                </div>

                {/* Total cost for this plant (quantity * unit price) */}
                <div className="cart-item-total-cost">
                  Total Cost: ${calculateTotalCost(item).toFixed(2)}
                </div>

                {/* Increase / decrease quantity buttons */}
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                {/* Delete button removes the plant from the cart */}
                <button
                  className="cart-item-delete-button"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        {/* Continue shopping returns to the product listing page */}
        <button
          className="cart-continue-shopping-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>

        {/* Checkout shows a "Coming Soon" message */}
        <button className="cart-checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;