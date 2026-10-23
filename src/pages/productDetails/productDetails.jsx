import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
    FaArrowLeft, 
    FaStar, 
    FaCartShopping, 
    FaBolt, 
    FaTruckFast, 
    FaShieldHalved, 
    FaRotateLeft, 
    FaCircleCheck, 
    FaMinus, 
    FaPlus 
} from "react-icons/fa6";
import { useCart } from "../../context/useCart";
import "./productDetails.css";

export function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.thumbnail || (data.images && data.images[0]) || "");
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    function handleAddToCart() {
        if (!product) return;
        addToCart(product, count);
    }

    function handleBuyNow() {
        if (!product) return;
        addToCart(product, count);
        navigate("/checkout");
    }

    if (loading) {
        return (
            <div className="product-details-page">
                <div className="product-loading-container">
                    <div className="product-loading-spinner" />
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product || product.message) {
        return (
            <div className="product-details-page">
                <div className="product-details-container" style={{ textAlign: "center", padding: "60px 20px" }}>
                    <h2>Product Not Found</h2>
                    <p style={{ color: "#64748b", margin: "10px 0 24px" }}>
                        The product you are looking for does not exist or has been removed.
                    </p>
                    <Link to="/product" className="product-back-btn">
                        <FaArrowLeft /> Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const originalPrice = product.discountPercentage 
        ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
        : null;

    const totalPrice = (product.price * count).toFixed(2);
    const galleryImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                {/* Navigation & Breadcrumb */}
                <div className="product-breadcrumb-nav">
                    <div className="product-breadcrumb">
                        <Link to="/home">Home</Link>
                        <span>/</span>
                        <Link to="/product">Products</Link>
                        <span>/</span>
                        <span className="current">{product.title}</span>
                    </div>

                    <Link to="/product" className="product-back-btn">
                        <FaArrowLeft /> Back to Products
                    </Link>
                </div>

                {/* Main Product Showcase Grid */}
                <div className="product-details-grid">
                    {/* Left Column: Image Gallery */}
                    <div className="product-gallery-col">
                        <div className="product-main-image-box">
                            <img
                                src={selectedImage || product.thumbnail}
                                alt={product.title}
                                className="product-main-image"
                            />
                        </div>

                        {galleryImages.length > 1 && (
                            <div className="product-thumbnails-row">
                                {galleryImages.map((imgUrl, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`product-thumb-btn ${selectedImage === imgUrl ? "active" : ""}`}
                                        onClick={() => setSelectedImage(imgUrl)}
                                        title={`View image ${idx + 1}`}
                                    >
                                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Middle Column: Details & Info */}
                    <div className="product-info-col">
                        {product.brand && (
                            <span className="product-brand-tag">{product.brand}</span>
                        )}

                        <h1 className="product-title">{product.title}</h1>

                        <div className="product-rating-row">
                            <div className="product-stars">
                                <FaStar />
                                <span className="product-rating-score">{product.rating || "4.5"}</span>
                            </div>
                            <span>•</span>
                            <span className="product-category-badge">{product.category}</span>
                        </div>

                        <div className="product-price-section">
                            <span className="product-price-current">${product.price}</span>
                            {originalPrice && (
                                <span className="product-price-original">${originalPrice}</span>
                            )}
                            {product.discountPercentage && (
                                <span className="product-discount-badge">
                                    {Math.round(product.discountPercentage)}% OFF
                                </span>
                            )}
                        </div>

                        <p className="product-desc">{product.description}</p>

                        <div className="product-features-list">
                            <div className="product-feature-item">
                                <FaTruckFast className="product-feature-icon" />
                                <span>{product.shippingInformation || "Fast & Free Delivery across the region"}</span>
                            </div>
                            <div className="product-feature-item">
                                <FaShieldHalved className="product-feature-icon" />
                                <span>{product.warrantyInformation || "1 Year Official Manufacturer Warranty"}</span>
                            </div>
                            <div className="product-feature-item">
                                <FaRotateLeft className="product-feature-icon" />
                                <span>{product.returnPolicy || "30-Day Hassle-Free Return Policy"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Buy Box */}
                    <div className="product-buy-box">
                        <div className="product-buy-price-row">
                            <span className="product-buy-price-label">Subtotal:</span>
                            <span className="product-buy-price-total">${totalPrice}</span>
                        </div>

                        <div className="product-stock-status">
                            <FaCircleCheck />
                            <span>{product.availabilityStatus || "In Stock & Ready to Ship"}</span>
                        </div>

                        <div className="product-quantity-group">
                            <label htmlFor="quantity-input">Quantity:</label>
                            <div className="product-quantity-controls">
                                <button
                                    type="button"
                                    className="product-qty-btn"
                                    onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
                                    disabled={count <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    id="quantity-input"
                                    type="number"
                                    className="product-qty-input"
                                    value={count}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="product-qty-btn"
                                    onClick={() => setCount((prev) => prev + 1)}
                                    aria-label="Increase quantity"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="product-btn-add"
                            onClick={handleAddToCart}
                        >
                            <FaCartShopping /> Add To Cart
                        </button>

                        <button
                            type="button"
                            className="product-btn-buy"
                            onClick={handleBuyNow}
                        >
                            <FaBolt /> Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}