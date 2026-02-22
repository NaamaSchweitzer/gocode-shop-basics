import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { ShopContext } from "./ShopContext";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "./api/products-functions";

export const Router = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState("All Items");
  const [sortMethod, setSortMethod] = useState("");

  const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
  });

  useEffect(() => {
    const cat = allProducts
      ?.map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);

    if (cat && cat.length > 0) {
      cat.unshift("All Items");
      setCategories(cat);
      setCategoryFilter("All Items");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  const handleAddProd = (productId) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === productId);
      // product already in cart
      if (cartItem) {
        return prevCart.map((item) =>
          item.id === cartItem.id ? { ...item, amount: item.amount + 1 } : item,
        );
      }
      // else: new product added to cart
      const product = allProducts.find((p) => p.id === productId);

      //if (!product) return console.error();

      return [...prevCart, { ...product, amount: 1 }];
    });
  };

  const handleRemoveProd = (productId) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === productId);

      if (!cartItem) return prevCart;

      if (cartItem.amount === 1) {
        // remove item from cart
        return prevCart.filter((item) => item.id !== cartItem.id);
      }

      return prevCart.map((item) =>
        item.id === cartItem.id ? { ...item, amount: item.amount - 1 } : item,
      );
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
    {
      path: "/products/:productId",
      Component: ProductDetailsPage,
    },
  ]);

  return (
    <ShopContext.Provider
      value={{
        categories,
        categoryFilter,
        setCategoryFilter,
        sortMethod,
        setSortMethod,
        cart,
        handleAddProd,
        handleRemoveProd,
      }}
    >
      <RouterProvider router={router} />
    </ShopContext.Provider>
  );
};
