import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { ShopContext } from "../ShopContext.js";

export const ProductsSection = () => {
  const { products, cart, handleAddProd, handleRemoveProd } =
    useContext(ShopContext);
  console.log(products);
  return (
    <section className="products">
      {products.map((product) => (
        <ProductCard
          itemName={product.title}
          price={product.price}
          img={product.image}
          amount={cart.find((item) => item.id === product.id)?.amount || 0}
          onAdd={() => handleAddProd(product.id)}
          onRemove={() => handleRemoveProd(product.id)}
          productId={product.id}
        />
      ))}
    </section>
  );
};
