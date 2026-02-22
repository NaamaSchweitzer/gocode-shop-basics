import { ProductCard } from "./ProductCard";
import { useProducts } from "../hooks/useProducts.js";

export const ProductsSection = () => {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error loading products</div>;

  return (
    <section className="products">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          itemName={product.title}
          img={product.image}
        />
      ))}
    </section>
  );
};
