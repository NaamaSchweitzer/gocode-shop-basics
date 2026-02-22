import { Box } from "@mui/material";
import { PriceSlider } from "./PriceSlider";
import { SortSection } from "./SortSection";

export const NavSection = () => {
  return (
    <nav className="product-filter">
      <h1>Jackets</h1>
      <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <SortSection />
        <PriceSlider />
      </Box>
    </nav>
  );
};
