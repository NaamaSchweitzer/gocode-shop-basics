import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "../api/products-functions";

export const useAllProductsRaw = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
    staleTime: 1000 * 60 * 5,
  });
};
