import { Link } from "react-router-dom";
import { 
    FaAmazon, 
    FaEnvelope, 
    FaPhone, 
    FaLocationDot, 
    FaTruckFast, 
    FaRotateLeft, 
    FaShieldHalved, 
    FaCreditCard 
} from "react-icons/fa6";
import "./footer.css";

export function Footer() {
    return (
        <footer className="app-footer">
            {/* Main Footer Section */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-col">
                            <Link to="/home" className="footer-brand" title="Amazon Home">
                                <FaAmazon className="footer-brand-icon" />
                                <h2 className="footer-brand-text">Amazon</h2>
                            </Link>
                            <p className="footer-brand-desc">
                                Your trusted destination for quality shopping, fast shipping, 
                                and 24/7 customer care.
                            </p>
                            <div className="footer-contact-info">
                                <div className="footer-contact-item">
                                    <FaEnvelope className="footer-contact-icon" />
                                    <a href="mailto:support@amazon-shop.com">support@amazon-shop.com</a>
                                </div>
                                <div className="footer-contact-item">
                                    <FaPhone className="footer-contact-icon" />
                                    <a href="tel:+18001234567">+1 (800) 123-4567</a>
                                </div>
                                <div className="footer-contact-item">
                                    <FaLocationDot className="footer-contact-icon" />
                                    <span>Seattle, WA, United States</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Column */}
                        <div className="footer-col">
                            <h3>Shop & Explore</h3>
                            <ul className="footer-links-list">
                                <li>
                                    <Link to="/home" className="footer-link">Home</Link>
                                </li>
                                <li>
                                    <Link to="/product" className="footer-link">Products</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" className="footer-link">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="footer-link">Sign In / Account</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Customer Care Column */}
                        <div className="footer-col">
                            <h3>Customer Care</h3>
                            <ul className="footer-links-list">
                                <li>
                                    <Link to="/contact-us" className="footer-link">Help Center</Link>
                                </li>
                                <li>
                                    <Link to="/product" className="footer-link">Track Your Order</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" className="footer-link">Shipping Rates</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" className="footer-link">Returns & Replacements</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Guarantees & Payment Column */}
                        <div className="footer-col">
                            <h3>Safe & Reliable</h3>
                            <div className="footer-badge-list">
                                <div className="footer-badge-item">
                                    <FaTruckFast className="footer-badge-icon" />
                                    <span>Fast Delivery Worldwide</span>
                                </div>
                                <div className="footer-badge-item">
                                    <FaRotateLeft className="footer-badge-icon" />
                                    <span>30-Day Money Back</span>
                                </div>
                                <div className="footer-badge-item">
                                    <FaShieldHalved className="footer-badge-icon" />
                                    <span>100% Buyer Protection</span>
                                </div>
                                <div className="footer-badge-item">
                                    <FaCreditCard className="footer-badge-icon" />
                                    <span>Encrypted Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p>&copy; 2026 Amazon Shop. All rights reserved.</p>
                    <div className="footer-legal-links">
                        <Link to="/contact-us" className="footer-legal-link">Conditions of Use</Link>
                        <span>•</span>
                        <Link to="/contact-us" className="footer-legal-link">Privacy Notice</Link>
                        <span>•</span>
                        <Link to="/contact-us" className="footer-legal-link">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}