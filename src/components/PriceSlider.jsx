import { Box, Slider, Typography } from "@mui/material";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";

// Note:
// - priceRange is the selected range by user,
// - priceBounds defined by the max/min prices of current products in store

export const PriceSlider = () => {
  const { priceRange, setPriceRange, priceBounds } = useContext(ShopContext);

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <label>Price range:</label>

      <Slider
        value={priceRange}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        min={priceBounds.min}
        max={priceBounds.max}
        disableSwap
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">${priceRange[0]}</Typography>
        <Typography variant="body2">${priceRange[1]}</Typography>
      </Box>
    </Box>
  );
};
