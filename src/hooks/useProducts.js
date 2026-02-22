import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "../api/products-functions";
import { transformProducts } from "../utils/product-utils";

export const useProducts = () => {
  const {
    categoryFilter = "",
    sortMethod,
    priceRange,
  } = useContext(ShopContext);

  return useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
    select: (data) =>
      transformProducts(data, {
        category: categoryFilter,
        sortMethod,
        priceRange,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
