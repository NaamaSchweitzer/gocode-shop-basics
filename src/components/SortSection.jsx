import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { FilterSortComp } from "./FilterSortComp";

export const SortSection = () => {
  const { categories, setCategoryFilter, setSortMethod } =
    useContext(ShopContext);

  const sortOptions = [
    // "Featured",
    // "Best Selling",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    // "Date, new to old",
    // "Date, old to new",
  ];

  return (
    <div className="sort">
      <FilterSortComp
        onSelect={(val) => setCategoryFilter(val)}
        label={"Filter by:"}
        listOfOptions={categories}
      />
      <FilterSortComp
        onSelect={(val) => setSortMethod(val)}
        label={"Sort by:"}
        listOfOptions={sortOptions}
      />
    </div>
  );
};
