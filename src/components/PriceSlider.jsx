import { Box, Slider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { ShopContext } from "../ShopContext";

export const PriceSlider = () => {
  const { priceRange, setPriceRange, priceBounds } = useContext(ShopContext);
  const { minPrice, maxPrice } = priceBounds;

  // init once
  useEffect(() => {
    if (minPrice === 0 && maxPrice === 0) return;

    // only set if not initialized yet
    if (priceRange[0] === 0 && priceRange[1] === 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

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
        min={minPrice}
        max={maxPrice}
        disableSwap
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">{priceRange[0]}$</Typography>
        <Typography variant="body2">{priceRange[1]}$</Typography>
      </Box>
    </Box>
  );
};
