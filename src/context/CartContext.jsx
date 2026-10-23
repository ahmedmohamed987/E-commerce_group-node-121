import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("amazon_cart");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("amazon_cart", JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
    }, [cart]);

    function addToCart(product, quantity = 1) {
        if (!product) return;
        setCart((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === product.id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
                        quantity: quantity,
                    },
                ];
            }
        });
        toast.success(`"${product.title}" added to cart!`);
    }

    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    }

    function removeFromCart(productId) {
        setCart((prev) => prev.filter((item) => item.id !== productId));
        toast.info("Item removed from cart");
    }

    function clearCart() {
        setCart([]);
        toast.info("Cart cleared");
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
