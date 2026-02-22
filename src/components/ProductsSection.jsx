import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { ShopContext } from "../ShopContext.js";
import { useProducts } from "../hooks/useProducts.js";

export const ProductsSection = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { cart, handleAddProd, handleRemoveProd } = useContext(ShopContext);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error loading products</div>;

  // console.log(products);

  return (
    <section className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          // {...product}
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
