import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../redux/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import './CartItem.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateItemTotal = (item) => item.price * item.quantity;
  const calculateTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const handleCheckout = () => {
    alert('Checkout coming soon! Stay tuned.');
  };

  const handleContinueShopping = () => {
    navigate('/plants');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your cart is empty.</h2>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.price.toFixed(2)}</p>
            <p>
              Total: ${calculateItemTotal(item).toFixed(2)}
            </p>
            <div className="quantity-controls">
              <button
                onClick={() => dispatch(decrementQuantity(item.id))}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(incrementQuantity(item.id))}>
                +
              </button>
            </div>
            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <h3>
        Total Amount: ${calculateTotalAmount().toFixed(2)}
      </h3>
      <div className="cart-actions">
        <button onClick={handleCheckout}>Checkout</button>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
      <Link to="/about">Learn more about Paradise Nursery</Link>
    </div>
  );
};

export default CartItem;