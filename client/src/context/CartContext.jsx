import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
 const [cart, setCart] = useState(() => {
   const savedCart = localStorage.getItem("cart");
   return savedCart ? JSON.parse(savedCart) : [];
 });

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

 const addToCart = (item) => {
   if (cart.length > 0) {
     const existingRestaurant = cart[0].restaurant;

     if (existingRestaurant !== item.restaurant) {
       const confirmChange = window.confirm(
         "Your cart contains items from another restaurant. Do you want to remove them and add this item?",
       );

       if (!confirmChange) {
         return;
       }

       setCart([
         {
           ...item,
           quantity: 1,
         },
       ]);

       return;
     }
   }

   const existingItem = cart.find((cartItem) => cartItem._id === item._id);

   if (existingItem) {
     setCart(
       cart.map((cartItem) =>
         cartItem._id === item._id
           ? {
               ...cartItem,
               quantity: cartItem.quantity + 1,
             }
           : cartItem,
       ),
     );
   } else {
     setCart([
       ...cart,
       {
         ...item,
         quantity: 1,
       },
     ]);
   }
 };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
