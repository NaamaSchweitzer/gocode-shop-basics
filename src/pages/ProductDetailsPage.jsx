import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct } from "../api/products-functions";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { handleAddProd } = useContext(ShopContext);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId,
  });

  if (isLoading) return <div>Loading product details...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Stack direction="row" sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={() => navigate("/")}>
            continue shopping
          </Button>
        </Stack>
        <Card sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              minHeight: 520,
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title || "Product"}
              sx={{ height: "100%", objectFit: "scale-down" }}
            />
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {product.title}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h5">${product.price}</Typography>

                    {product.rating?.rate !== null && (
                      <Chip
                        label={`⭐ ${product.rating.rate} (${product.rating.count ?? 0})`}
                        size="small"
                      />
                    )}
                  </Stack>
                </Box>

                <Divider />

                <Typography>
                  {product.description || "No description available."}
                </Typography>

                <Typography variant="caption">
                  Category: {product.category}
                </Typography>

                <Divider />

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleAddProd(product._id)}
                >
                  Add to cart
                </Button>

                <Typography variant="caption" color="text.secondary">
                  Product ID: {product._id}
                </Typography>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};
