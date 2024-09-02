import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
export const cartContext = createContext();
const CartContextProvider = ({ children }) => {
  const [numOfItems, setNumOfItems] = useState(0);
  const [Products, setProducts] = useState(null);
  const [tottalPrice, setTottalPrice] = useState(0);
  const { token } = useContext(authContext);
  const [cartId, setcartId] = useState(0);
  async function addProductToCart(productID) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productID,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTottalPrice(data.data.totalCartPrice);
      setcartId(data.data._id);
      return data;
    } catch (error) {
      console.log(error, "get user cart context");
    }
  }

  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTottalPrice(data.data.totalCartPrice);
      setcartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error, "error update count");
    }
  }
  async function deleteItem(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTottalPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.log(error, "error delete item");
    }
  }
  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(0);
      setProducts([]);
      setTottalPrice(0);
      setcartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error, "error delete item");
    }
  }
  useEffect(() => {
    if (token != null) {
      getUserCart();
    }
  }, [token]);
  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        Products,
        tottalPrice,
        numOfItems,
        updateCount,
        deleteItem,
        clearCart,
        cartId,
        setNumOfItems,
        setProducts,
        setTottalPrice
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
