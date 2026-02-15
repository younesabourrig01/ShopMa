// all products
export const selectAllProducts = (state) => state.products.items;

// one product by its id
export const selectProductById = (state, productId) =>
  state.products.items.find((product) => product.id === productId);

// selector with logic
export const selectFilteredProducts = (state) => {
  const items = state.products?.items ?? [];
  const filters = state.products?.filters ?? { filter: "all", sortBy: "name" };

  let result = [...items];

  if (filters.filter !== "all") {
    result = result.filter((product) => product.category === filters.filter);
  }

  if (filters.sortBy === "name") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (filters.sortBy === "price") {
    result.sort((a, b) => a.price - b.price);
  }

  return result;
};
