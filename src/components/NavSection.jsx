import { Badge, Box, IconButton, Typography } from "@mui/material";
import { PriceSlider } from "./PriceSlider";
import { SortSection } from "./SortSection";
import { ShoppingCart } from "@mui/icons-material";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";

export const NavSection = () => {
  const { setIsCartOpen, cart } = useContext(ShopContext);

  const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);

  return (
    // <nav className="product-filter">
    <Box
      component="nav"
      className="product-filter"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <h1>Products</h1>

        {/* Cart Button */}
        <IconButton onClick={() => setIsCartOpen(true)}>
          <Badge badgeContent={totalItems} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <SortSection />
        <PriceSlider />
      </Box>
    </Box>
    // </nav>
  );
};
