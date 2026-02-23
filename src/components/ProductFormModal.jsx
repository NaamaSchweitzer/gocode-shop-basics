import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  // rate: "",
  // count: "",
};

export const ProductFormModal = ({
  open,
  onClose,
  onSubmit,
  initialValues, // null => create, product => edit
  loading = false,
}) => {
  const isEdit = !!initialValues;

  const [form, setForm] = useState(emptyForm);

  // populate form on open/edit
  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: initialValues.title ?? "",
        price: initialValues.price ?? "",
        description: initialValues.description ?? "",
        category: initialValues.category ?? "",
        image: initialValues.image ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, initialValues]);

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const priceNumber = useMemo(() => Number(form.price), [form.price]);

  const canSubmit =
    form.title.trim().length > 0 &&
    form.category.trim().length > 0 &&
    form.image.trim().length > 0 &&
    // form.description.trim().length > 0 &&
    Number.isFinite(priceNumber) &&
    priceNumber > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      price: priceNumber, // convert to number
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={form.title}
              onChange={setField("title")}
              fullWidth
              autoFocus
            />

            <TextField
              label="Price"
              type="number"
              value={form.price}
              onChange={setField("price")}
              fullWidth
              // inputProps={{ min: 0, step: "0.01" }}
            />

            <TextField
              label="Category"
              value={form.category}
              onChange={setField("category")}
              fullWidth
            />

            <TextField
              label="Image URL"
              value={form.image}
              onChange={setField("image")}
              fullWidth
            />

            <TextField
              label="Description"
              value={form.description}
              onChange={setField("description")}
              fullWidth
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant="outlined" disabled={loading}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={!canSubmit || loading}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
