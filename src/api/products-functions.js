const API_URL = "http://localhost:3000/api"
// const API_URL = "https://fakestoreapi.com";

export const handleProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();

  return data.map((product) => {
    return { ...product, amount: 0 };
  });
};

export const fetchSingleProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Product not found");
  return response.json();
};
