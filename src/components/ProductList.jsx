import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../cartSlice';
import './ProductList.css';

/**
 * Paradise Nursery - Product Listing Page
 *
 * Displays the houseplant catalogue grouped by category. Each plant shows a
 * thumbnail, a name and a price, and can be added to the Redux-powered
 * shopping cart. Once a plant is added, its "Add to Cart" button is disabled
 * and the cart icon count in the navbar is incremented automatically.
 */

// Static catalogue: three categories, each with six unique houseplants.
const plantCategories = [
  {
    category: 'Aromatic Plants',
    plants: [
      {
        id: 1,
        name: 'Lavender',
        thumbnail: 'images/lavender.jpg',
        price: 12.99,
        description: 'Calming purple blooms with a soothing floral fragrance.',
      },
      {
        id: 2,
        name: 'Jasmine',
        thumbnail: 'images/jasmine.jpg',
        price: 15.49,
        description: 'Sweetly scented white flowers that blossom at night.',
      },
      {
        id: 3,
        name: 'Rosemary',
        thumbnail: 'images/rosemary.jpg',
        price: 9.99,
        description: 'Fragrant evergreen herb with needle-like silvery leaves.',
      },
      {
        id: 4,
        name: 'Mint',
        thumbnail: 'images/mint.jpg',
        price: 7.49,
        description: 'Fast-growing herb with refreshing, aromatic leaves.',
      },
      {
        id: 5,
        name: 'Gardenia',
        thumbnail: 'images/gardenia.jpg',
        price: 18.99,
        description: 'Glossy foliage with creamy white, heavily perfumed flowers.',
      },
      {
        id: 6,
        name: 'Eucalyptus',
        thumbnail: 'images/eucalyptus.jpg',
        price: 14.99,
        description: 'Silvery aromatic foliage with a clean, spa-like scent.',
      },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      {
        id: 7,
        name: 'Aloe Vera',
        thumbnail: 'images/aloe-vera.jpg',
        price: 10.99,
        description: 'Succulent with soothing gel-filled leaves for skin care.',
      },
      {
        id: 8,
        name: 'Tulsi (Holy Basil)',
        thumbnail: 'images/tulsi.jpg',
        price: 8.99,
        description: 'Adaptogenic herb traditionally brewed as a wellness tea.',
      },
      {
        id: 9,
        name: 'Chamomile',
        thumbnail: 'images/chamomile.jpg',
        price: 11.49,
        description: 'Daisy-like flowers steeped into a calming bedtime tea.',
      },
      {
        id: 10,
        name: 'Lemon Balm',
        thumbnail: 'images/lemon-balm.jpg',
        price: 9.49,
        description: 'Citrus-scented herb that gently relieves everyday stress.',
      },
      {
        id: 11,
        name: 'Neem',
        thumbnail: 'images/neem.jpg',
        price: 13.99,
        description: 'Purifying plant prized for its antibacterial leaves.',
      },
      {
        id: 12,
        name: 'Ginger',
        thumbnail: 'images/ginger.jpg',
        price: 10.49,
        description: 'Spicy rhizome plant used to soothe digestion and colds.',
      },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      {
        id: 13,
        name: 'Snake Plant',
        thumbnail: 'images/snake-plant.jpg',
        price: 16.99,
        description: 'Architectural upright leaves that thrive on neglect.',
      },
      {
        id: 14,
        name: 'Spider Plant',
        thumbnail: 'images/spider-plant.jpg',
        price: 12.49,
        description: 'Air-purifying plant with playful striped foliage.',
      },
      {
        id: 15,
        name: 'Pothos',
        thumbnail: 'images/pothos.jpg',
        price: 11.99,
        description: 'Trailing vine that grows happily even in low light.',
      },
      {
        id: 16,
        name: 'ZZ Plant',
        thumbnail: 'images/zz-plant.jpg',
        price: 17.99,
        description: 'Waxy dark-green leaves; drought tolerant and durable.',
      },
      {
        id: 17,
        name: 'Peace Lily',
        thumbnail: 'images/peace-lily.jpg',
        price: 15.99,
        description: 'Elegant white blooms that help clean indoor air.',
      },
      {
        id: 18,
        name: 'Jade Plant',
        thumbnail: 'images/jade-plant.jpg',
        price: 13.49,
        description: 'Plump succulent leaves, a symbol of good fortune.',
      },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  // Current contents of the Redux shopping cart
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of units in the cart - drives the navbar cart badge
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // A plant already present in the cart cannot be added a second time,
  // so its "Add to Cart" button stays disabled.
  const isPlantInCart = (plantId) =>
    cartItems.some((item) => item.id === plantId);

  const handleAddToCart = (plant) => {
    dispatch(
      addToCart({
        id: plant.id,
        name: plant.name,
        thumbnail: plant.thumbnail,
        price: plant.price,
      })
    );
  };

  return (
    <div className="product-page">
      {/* Navbar - shared by the Product Listing and Cart pages */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="brand-name">
            Paradise Nursery
          </Link>
          <span className="brand-tagline">Where Green Meets Serenity</span>
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Plants
          </Link>
          <Link
            to="/cart"
            className="nav-link cart-link"
            aria-label={`Shopping cart, ${totalCartItems} items`}
          >
            <span className="cart-icon" role="img" aria-hidden="true">
              🛒
            </span>
            <span className="cart-count">{totalCartItems}</span>
          </Link>
        </div>
      </nav>

      <div className="product-list-container">
        <h1 className="page-heading">Our Houseplants</h1>
        <p className="page-subheading">
          Hand-picked houseplants, grouped by category, to bring serenity to
          your home.
        </p>

        {plantCategories.map((categoryGroup) => (
          <section
            key={categoryGroup.category}
            className="category-section"
            id={categoryGroup.category.toLowerCase().replace(/\s+/g, '-')}
          >
            <h2 className="category-heading">{categoryGroup.category}</h2>
            <div className="plant-grid">
              {categoryGroup.plants.map((plant) => (
                <article key={plant.id} className="plant-card">
                  <img
                    className="plant-thumbnail"
                    src={plant.thumbnail}
                    alt={plant.name}
                  />
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <p className="plant-price">${plant.price.toFixed(2)}</p>
                  <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isPlantInCart(plant.id)}
                  >
                    {isPlantInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProductList;