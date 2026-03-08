import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAllProductsRaw } from "../hooks/useAllProductsRaw";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/products-functions";
import { ProductFormModal } from "../components/ProductFormModal";
import { ProductsTable } from "../components/ProductsTable";
import { useNavigate } from "react-router";

export const AdminPage = () => {
  const { data: products = [], isLoading, isError } = useAllProductsRaw();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const queryClient = useQueryClient();

  const createMut = useMutation({
    mutationFn: createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-products"] }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, updates }) => updateProduct(id, updates),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-products"] }),
  });

  const deleteMut = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-products"] }),
  });

  const rows = useMemo(() => products, [products]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteMut.mutate(id);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (values) => {
    if (editingProduct) {
      await updateMut.mutateAsync({ id: editingProduct._id, updates: values });
    } else {
      await createMut.mutateAsync(values);
    }
    handleClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" size="small" onClick={() => navigate("/")}>
          Home Page
        </Button>
      </Box>

      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" fontWeight={700}>
          Admin
        </Typography>

        <Button variant="contained" onClick={handleOpenCreate}>
          + Add Product
        </Button>
      </Stack>

      <ProductsTable
        products={rows}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        deletingId={deleteMut.variables}
      />

      <ProductFormModal
        open={open}
        onClose={handleClose}
        initialValues={editingProduct}
        onSubmit={handleSubmit}
        loading={createMut.isPending || updateMut.isPending}
      />
    </Container>
  );
};
