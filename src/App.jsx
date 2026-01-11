// import { useRef } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { ShopContext } from "./ShopContext.js";
import { NavSection } from "./components/NavSection";
import { ProductsSection } from "./components/ProductsSection";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  // const sortOptions = [
  //   "Featured",
  //   "Best Selling",
  //   "Alphabetically, A-Z",
  //   "Alphabetically, Z-A",
  //   "Price, low to high",
  //   "Price, high to low",
  //   "Date, new to old",
  //   "Date, old to new",
  // ];

  useEffect(() => {
    const handleProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);
    };

    handleProducts();
  }, []);

  useEffect(() => {
    const cat = products
      ?.map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);

    if (cat && cat.length > 0) {
      cat.unshift("All Items");
      setCategories(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleCatChange = (category) => {
    console.log(category);
    if (category === "All Items") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  // const handleSortChange = (sortOp) => {
  //   console.log(sortOp);
  //   const copyProducts = [...filteredProducts];

  //   switch (sortOp) {
  //     // case "Best Selling":
  //     //   break;
  //     case "Alphabetically, A-Z":
  //       copyProducts.sort((a, b) =>
  //         a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  //       );
  //       break;
  //     case "Alphabetically, Z-A":
  //       copyProducts.sort((a, b) =>
  //         b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
  //       );
  //       break;
  //     case "Price, low to high":
  //       copyProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "Price, high to low":
  //       copyProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     // case "Date, new to old":
  //     //   break;
  //     // case "Date, old to new":
  //     //   break;
  //     case "Featured":
  //     default:
  //       break;
  //   }

  //   setFilteredProducts(copyProducts);
  // };

  const handleAddProd = (productId) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === productId);
      // product already in cart
      if (cartItem) {
        return prevCart.map((item) =>
          item.id === cartItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      // else: new product added to cart
      const product = products.find((p) => p.id === productId);

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
        item.id === cartItem.id ? { ...item, amount: item.amount - 1 } : item
      );
    });
  };

  // const inputRef = useRef(null);

  // const handleClick = () => {
  //   inputRef.current.focus();
  //   inputRef.current.style.background = "red";
  //   inputRef.current.style.width = "200px";
  //   inputRef.current.style.height = "100px";
  // };
  return (
    <ShopContext.Provider
      value={{
        products: filteredProducts,
        categories,
        handleCatChange,
        cart,
        handleAddProd,
        handleRemoveProd,
      }}
    >
      <>
        {/* <button onClick={handleClick}>click me for focusing the input</button>
      <input ref={inputRef} />
      */}
        {/* <OTPInput /> */}
        <NavSection />
        <ProductsSection />
      </>
    </ShopContext.Provider>
  );
}

export default App;
