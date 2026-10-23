import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/header';
import { Home } from './pages/Home/home';
import { Product } from './pages/product/product';
import { ContactUs } from './pages/contact-us/contactUs';
import { Footer } from './components/Footer/footer';
import { ProductDetails } from './pages/productDetails/productDetails';
import { Login } from './pages/login/login';
import { Checkout } from './pages/checkout/checkout';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';

function App() {
    const location = useLocation();

    return (
        <CartProvider>
            <ToastContainer position='top-left' autoClose={2000} />
            {location.pathname !== '/login' && <Header />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/product' element={<Product />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/cart' element={<Checkout />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            {location.pathname !== '/login' && <Footer />}
        </CartProvider>
    );
}

export default App;
