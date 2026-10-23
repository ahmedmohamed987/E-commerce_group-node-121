import { useEffect, useState } from "react";
import './product.css';
import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";

export function Product(){
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }, []);

    return(
        <div className="grid">
            {products.map(p => (
                <div key={p.id} className="card">
                    <Link to={`/product/${p.id}`} style={{textDecoration: "none", color: "#000"}}>
                        <img src={p.thumbnail} alt={p.description} />
                        <h2>{p.title}</h2>
                        <p>Price : $ {p.price}</p>
                    </Link>
                    <button onClick={() => addToCart(p)}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
}