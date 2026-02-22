import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Remove as RemoveIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from "@mui/icons-material";

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, handleAddProd, handleRemoveProd } =
    useContext(ShopContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
    >
      <Box
        sx={{
          width: 360,
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Cart</Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {cart.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Cart is empty
            </Typography>
          ) : (
            <Stack spacing={2}>
              {cart.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1.5,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>
                        {item.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)} each
                      </Typography>

                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Item total: ${(item.price * item.amount).toFixed(2)}
                      </Typography>
                    </Box>

                    <Stack alignItems="center" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => handleAddProd(item._id)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>

                      <Typography variant="body2">{item.amount}</Typography>

                      <IconButton
                        size="small"
                        onClick={() => handleRemoveProd(item._id)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {/* Bottom total + button */}
        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Typography fontWeight={700}>Total: ${total.toFixed(2)}</Typography>

          <Button variant="contained" size="large" disabled={cart.length === 0}>
            Check Out
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
