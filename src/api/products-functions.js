// const API_URL = "http://localhost:3000/api";
// const API_URL = "https://fakestoreapi.com";
const API_URL = "https://gocode-server.onrender.com/api"

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

export const createProduct = async (payload) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (id, updates) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

// export const isAdmin = async ()