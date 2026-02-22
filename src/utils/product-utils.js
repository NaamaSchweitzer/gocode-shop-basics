/**
 * Transforms raw product data based on filtering and sorting criteria.
 */
export const transformProducts = (
  allData,
  { category, sortMethod }, // for filters and sortMethod
) => {
  if (!allData) return [];

  // 1. Filter by Category (and other filters)
  const filtered = allData.filter((p) => {
    const matchesCategory = category === "All Items" || p.category === category;
    // apply other filters with the same approach
    return matchesCategory; // && matchesOtherFilters
  });

  // 2. Sort the filtered results
  // We spread into a new array [...] to avoid mutating the original cached data
  return [...filtered].sort((a, b) => {
    switch (sortMethod) {
      case "Alphabetically, A-Z":
        return a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        });
      case "Alphabetically, Z-A":
        return b.title.localeCompare(a.title, undefined, {
          sensitivity: "base",
        });
      case "Price, low to high":
        return a.price - b.price;
      case "Price, high to low":
        return b.price - a.price;
      default:
        return 0;
    }
  });
};
