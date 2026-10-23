import { useState } from "react";
import { 
    FaEnvelope, 
    FaPhone, 
    FaClock, 
    FaLocationDot, 
    FaUser, 
    FaPaperPlane, 
    FaCircleCheck, 
    FaHeadset
} from "react-icons/fa6";
import { toast } from "react-toastify";
import "./contactUs.css";

export function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        // Simulate sending message
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            toast.success("Thank you! Your message has been sent successfully.");
            setFormData({
                name: "",
                email: "",
                subject: "General Inquiry",
                message: "",
            });
        }, 800);
    }

    return (
        <div className="contact-page">
            <div className="contact-container">
                {/* Header */}
                <div className="contact-header">
                    <span className="contact-badge">
                        <FaHeadset /> Customer Support
                    </span>
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-desc">
                        Have a question about an order, products, or your account? 
                        Send us a message and our support team will get back to you promptly.
                    </p>
                </div>

                <div className="contact-layout">
                    {/* Left Column: Info Cards */}
                    <div className="contact-info-column">
                        <div className="contact-info-card">
                            <h3 className="contact-info-title">Support Channels</h3>
                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon-box">
                                        <FaEnvelope />
                                    </div>
                                    <div className="contact-info-meta">
                                        <h4>Email Us</h4>
                                        <p>
                                            <a href="mailto:support@amazon-shop.com">
                                                support@amazon-shop.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon-box">
                                        <FaPhone />
                                    </div>
                                    <div className="contact-info-meta">
                                        <h4>Call Us</h4>
                                        <p>
                                            <a href="tel:+18001234567">
                                                +1 (800) 123-4567
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon-box">
                                        <FaClock />
                                    </div>
                                    <div className="contact-info-meta">
                                        <h4>Working Hours</h4>
                                        <p>24/7 Dedicated Support</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon-box">
                                        <FaLocationDot />
                                    </div>
                                    <div className="contact-info-meta">
                                        <h4>Headquarters</h4>
                                        <p>Seattle, WA, United States</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-faq-card">
                            <h4>Quick Assistance Tips</h4>
                            <p>
                                Please have your Order ID ready if your inquiry is regarding a recent purchase. 
                                Replies are typically sent within 24 hours.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="contact-form-card">
                        <div className="contact-form-header">
                            <h2 className="contact-form-title">Send a Message</h2>
                            <p className="contact-form-subtitle">
                                Fill out the form below and we'll reply to your email address.
                            </p>
                        </div>

                        {submitted && (
                            <div className="contact-success-banner" role="alert">
                                <FaCircleCheck className="contact-success-icon" />
                                <div>
                                    <strong>Message received!</strong>
                                    <p style={{ margin: "2px 0 0 0", fontSize: "13px" }}>
                                        Thank you for reaching out. We will respond to your email shortly.
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="contact-form-row">
                                <div className="contact-field">
                                    <label htmlFor="contact-name">Full Name *</label>
                                    <div className="contact-input-wrapper">
                                        <FaUser className="contact-input-icon" />
                                        <input
                                            type="text"
                                            id="contact-name"
                                            name="name"
                                            className="contact-input"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="contact-email">Email Address *</label>
                                    <div className="contact-input-wrapper">
                                        <FaEnvelope className="contact-input-icon" />
                                        <input
                                            type="email"
                                            id="contact-email"
                                            name="email"
                                            className="contact-input"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="contact-field">
                                <label htmlFor="contact-subject">Topic / Subject</label>
                                <select
                                    id="contact-subject"
                                    name="subject"
                                    className="contact-select"
                                    value={formData.subject}
                                    onChange={handleChange}
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Order & Shipping">Order & Shipping Status</option>
                                    <option value="Returns & Refunds">Returns & Refunds</option>
                                    <option value="Product Details">Product Information</option>
                                    <option value="Technical Support">Website / Account Support</option>
                                </select>
                            </div>

                            <div className="contact-field">
                                <label htmlFor="contact-message">Message *</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    className="contact-textarea"
                                    placeholder="How can we help you today? Please provide any relevant details..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="contact-submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="contact-spinner" />
                                        <span>Sending Message...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}