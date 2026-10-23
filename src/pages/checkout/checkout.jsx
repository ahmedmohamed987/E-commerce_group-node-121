import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    FaCartShopping, 
    FaArrowLeft, 
    FaMinus, 
    FaPlus, 
    FaXmark, 
    FaLock, 
    FaCircleCheck 
} from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCart } from "../../context/useCart";
import "./checkout.css";

export function Checkout() {
    const { 
        cart, 
        totalItems, 
        subtotal, 
        updateQuantity, 
        removeFromCart, 
        clearCart 
    } = useCart();

    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handlePlaceOrder(e) {
        e.preventDefault();
        if (cart.length === 0) {
            toast.error("Your cart is empty! Add products first.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOrderPlaced(true);
            toast.success("Order placed successfully! Thank you for your purchase.");
            clearCart();
        }, 900);
    }

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="checkout-container">
                    <div className="checkout-success-view">
                        <FaCircleCheck className="checkout-success-icon" />
                        <h2 className="checkout-success-title">Order Placed Successfully!</h2>
                        <p className="checkout-success-desc">
                            Thank you for your order, <strong>{shippingInfo.fullName || "Customer"}</strong>. 
                            A confirmation email has been sent to <strong>{shippingInfo.email || "your email"}</strong>.
                        </p>
                        <Link to="/product" className="checkout-shop-btn">
                            <FaArrowLeft /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                {/* Header */}
                <div className="checkout-header">
                    <h1 className="checkout-title">Checkout & Shopping Cart</h1>
                    <Link to="/product" className="checkout-continue-link">
                        <FaArrowLeft /> Continue Shopping
                    </Link>
                </div>

                {cart.length === 0 ? (
                    <div className="checkout-card checkout-empty-cart">
                        <FaCartShopping className="checkout-empty-icon" />
                        <h2 className="checkout-empty-title">Your Cart is Empty</h2>
                        <p className="checkout-empty-desc">
                            Looks like you haven't added any products to your cart yet.
                        </p>
                        <Link to="/product" className="checkout-shop-btn">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="checkout-grid">
                        {/* Left Column: Cart Items */}
                        <div className="checkout-cart-card">
                            <div className="checkout-cart-header">
                                <h2 className="checkout-cart-title">
                                    Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
                                </h2>
                                <button
                                    type="button"
                                    className="checkout-clear-btn"
                                    onClick={clearCart}
                                    title="Remove all items from cart"
                                >
                                    Clear Cart
                                </button>
                            </div>

                            <div className="checkout-items-list">
                                {cart.map((item) => (
                                    <div key={item.id} className="checkout-item-card">
                                        <div className="checkout-item-info">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="checkout-item-image"
                                            />
                                            <div className="checkout-item-details">
                                                <h3 className="checkout-item-title" title={item.title}>
                                                    {item.title}
                                                </h3>
                                                <p className="checkout-item-unit-price">
                                                    ${item.price.toFixed(2)} each
                                                </p>
                                            </div>
                                        </div>

                                        <div className="checkout-item-actions">
                                            {/* Stepper Controls */}
                                            <div className="checkout-stepper">
                                                <button
                                                    type="button"
                                                    className="checkout-step-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    title="Decrease quantity"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <input
                                                    type="number"
                                                    className="checkout-step-input"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="checkout-step-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    title="Increase quantity"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>

                                            {/* Item Subtotal */}
                                            <span className="checkout-item-total">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                className="checkout-remove-btn"
                                                onClick={() => removeFromCart(item.id)}
                                                title="Remove item"
                                                aria-label="Remove item"
                                            >
                                                <FaXmark />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Order Summary & Shipping Form */}
                        <div className="checkout-right-column">
                            {/* Order Summary */}
                            <div className="checkout-summary-card">
                                <h2 className="checkout-summary-title">Order Summary</h2>
                                <div className="checkout-summary-rows">
                                    <div className="checkout-summary-row">
                                        <span>Items Subtotal:</span>
                                        <strong>${subtotal.toFixed(2)}</strong>
                                    </div>
                                    <div className="checkout-summary-row">
                                        <span>Shipping:</span>
                                        <span className="checkout-shipping-badge">FREE</span>
                                    </div>
                                    <div className="checkout-summary-row">
                                        <span>Estimated Taxes:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="checkout-summary-divider" />
                                    <div className="checkout-summary-total-row">
                                        <span>Total:</span>
                                        <span className="checkout-total-amount">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping & Payment Form */}
                            <div className="checkout-shipping-card">
                                <h2 className="checkout-shipping-title">Shipping & Payment</h2>
                                <form onSubmit={handlePlaceOrder} className="checkout-form">
                                    <div className="checkout-field">
                                        <label htmlFor="fullName">Full Name *</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            className="checkout-input"
                                            placeholder="e.g. John Doe"
                                            value={shippingInfo.fullName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="checkout-input"
                                            placeholder="you@example.com"
                                            value={shippingInfo.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="checkout-input"
                                            placeholder="+1 (555) 000-0000"
                                            value={shippingInfo.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-field">
                                        <label htmlFor="address">Delivery Address *</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className="checkout-input"
                                            placeholder="123 Main St, Apt 4B"
                                            value={shippingInfo.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="checkout-place-order-btn"
                                        disabled={loading}
                                    >
                                        <FaLock />
                                        <span>{loading ? "Processing Order..." : "Place Order"}</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
