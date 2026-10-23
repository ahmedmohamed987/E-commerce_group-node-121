import { 
    FaAmazon, 
    FaHouse, 
    FaProductHunt, 
    FaUsers, 
    FaCartShopping, 
    FaRightFromBracket, 
    FaRightToBracket 
} from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/useCart";
import './header.css';

export function Header(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { totalItems } = useCart();

    function handleLogout() {
        localStorage.removeItem('token');
        toast.info("Logged out successfully");
        navigate('/login');
    }

    return(
       <header className="app-header">
          <div className="header-container">
              <Link to="/home" className="header-logo" title="Amazon Home">
                    <FaAmazon className="header-logo-icon" />
                    <h1 className="header-logo-text">Amazon</h1>
              </Link>

              <div className="header-right">
                  <nav className="header-nav">
                        <NavLink 
                            to="/home" 
                            className={({ isActive }) => 
                                isActive ? "header-nav-link active" : "header-nav-link"
                            }
                        >
                            <FaHouse className="header-nav-icon" /> Home
                        </NavLink>
                        <NavLink 
                            to="/product" 
                            className={({ isActive }) => 
                                isActive ? "header-nav-link active" : "header-nav-link"
                            }
                        >
                            <FaProductHunt className="header-nav-icon" /> Products
                        </NavLink>
                        <NavLink 
                            to="/contact-us" 
                            className={({ isActive }) => 
                                isActive ? "header-nav-link active" : "header-nav-link"
                            }
                        >
                            <FaUsers className="header-nav-icon" /> Contact-us
                        </NavLink>
                        <NavLink 
                            to="/checkout" 
                            className={({ isActive }) => 
                                isActive ? "header-nav-link active" : "header-nav-link"
                            }
                        >
                            <FaCartShopping className="header-nav-icon" /> Cart
                            {totalItems > 0 && (
                                <span className="header-cart-badge">{totalItems}</span>
                            )}
                        </NavLink>
                  </nav>

                  {token ? (
                      <button 
                          type="button" 
                          className="header-btn-logout" 
                          onClick={handleLogout}
                          title="Sign out"
                      >
                          <FaRightFromBracket /> Logout
                      </button>
                  ) : (
                      <Link to="/login" className="header-btn-login" title="Sign in">
                          <FaRightToBracket /> Sign In
                      </Link>
                  )}
              </div>
          </div>
       </header>
    );
}