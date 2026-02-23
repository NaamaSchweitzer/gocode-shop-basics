import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { ShopContext } from "./ShopContext";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "./api/products-functions";
import { AdminPage } from "./pages/AdminPage";

export const Router = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All Items");
  const [sortMethod, setSortMethod] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);

  const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
  });

  const priceBounds = useMemo(() => {
    if (!allProducts.length) return { minPrice: 0, maxPrice: 0 };
    const prices = allProducts.map((p) => p.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [allProducts]);

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
      const cartItem = prevCart.find((item) => item._id === productId);
      // product already in cart
      if (cartItem) {
        return prevCart.map((item) =>
          item._id === cartItem._id
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      }
      // else: new product added to cart
      const product = allProducts.find((p) => p._id === productId);

      //if (!product) return console.error();

      return [...prevCart, { ...product, amount: 1 }];
    });
  };

  const handleRemoveProd = (productId) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item._id === productId);

      if (!cartItem) return prevCart;

      if (cartItem.amount === 1) {
        // remove item from cart
        return prevCart.filter((item) => item._id !== cartItem._id);
      }

      return prevCart.map((item) =>
        item._id === cartItem._id ? { ...item, amount: item.amount - 1 } : item,
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
    {
      path: "/admin",
      Component: AdminPage,
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
        priceRange,
        setPriceRange,
        priceBounds,
        cart,
        isCartOpen,
        setIsCartOpen,
        handleAddProd,
        handleRemoveProd,
      }}
    >
      <RouterProvider router={router} />
    </ShopContext.Provider>
  );
};
