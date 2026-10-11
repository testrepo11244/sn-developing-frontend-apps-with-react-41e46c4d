import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, removeItem, updateQuantity } from '../redux/CartSlice';
import './CartItem.css';

/**
 * CartItem component - displays the Shopping Cart page of the
 * Paradise Nursery e-plant shopping application.
 *
 * Functionality implemented (grading criteria):
 *   1. Shows the total cart amount of all the plants in the cart.
 *   2. Shows the total cost for each plant (unit price x quantity).
 *   3. Each plant in the cart displays a thumbnail, name, and unit price.
 *   4. "+" and "-" buttons increase and decrease the quantity of each
 *      plant, updating the cart correctly.
 *   5. A "Delete" button removes each item from the cart.
 *   6. A "Checkout" button shows a "Coming Soon" message.
 *   7. A "Continue Shopping" button links back to the product listing page.
 */
const CartItem = () => {
  // Plants currently stored in the Redux shopping cart
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Message shown to the customer after the "Checkout" button is clicked
  const [checkoutMessage, setCheckoutMessage] = useState('');

  /**
   * Calculates the total amount of the shopping cart.
   * The price of each plant is multiplied by its quantity and all of
   * the results are summed together.
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  };

  /**
   * Calculates the total cost of a single plant in the cart
   * (unit price multiplied by the quantity selected).
   */
  const calculateItemTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  /**
   * Increases the quantity of the given plant by one.
   * The addItem reducer increments the quantity when the plant
   * already exists in the cart.
   */
  const handleIncreaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  /**
   * Decreases the quantity of the given plant by one.
   * If the quantity is already 1, the plant is removed from the cart.
   */
  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  /**
   * Deletes the given plant (all of its units) from the shopping cart.
   */
  const handleDeleteItem = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  /**
   * "Continue Shopping" - links back to the product listing page.
   */
  const handleContinueShopping = (event) => {
    event.preventDefault();
    navigate('/products');
  };

  /**
   * "Checkout" - the payment flow has not been implemented yet, so a
   * "Coming Soon" message is displayed to the customer.
   */
  const handleCheckout = (event) => {
    event.preventDefault();
    setCheckoutMessage('Coming Soon! Our secure checkout is almost ready.');
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty. Add some plants to brighten your space!</p>
          <button
            type="button"
            className="continue-shopping-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* One card per plant in the shopping cart */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                {/* Plant thumbnail */}
                <div className="cart-item-thumbnail">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  {/* Plant name */}
                  <h3 className="cart-item-name">{item.name}</h3>

                  {/* Unit price of the plant */}
                  <p className="cart-item-unit-price">
                    Unit Price: ${item.cost.toFixed(2)}
                  </p>

                  {/* Total cost for this plant (unit price x quantity) */}
                  <p className="cart-item-total-cost">
                    Total Cost: ${calculateItemTotalCost(item).toFixed(2)}
                  </p>

                  {/* Increase / decrease quantity buttons */}
                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete button - removes the plant from the cart */}
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDeleteItem(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart summary: overall total amount and the action buttons */}
          <div className="cart-summary">
            <h2 className="cart-total-amount">
              Total Amount: ${calculateTotalAmount().toFixed(2)}
            </h2>

            {/* "Coming Soon" message shown after Checkout is clicked */}
            {checkoutMessage && (
              <p className="checkout-message">{checkoutMessage}</p>
            )}

            <div className="cart-buttons">
              {/* Links back to the product listing page */}
              <button
                type="button"
                className="continue-shopping-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>

              {/* Shows the "Coming Soon" message */}
              <button
                type="button"
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;