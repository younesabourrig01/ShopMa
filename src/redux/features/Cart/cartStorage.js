export const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

export const saveCartToStorage = (cartState) => {
  localStorage.setItem("cart", JSON.stringify(cartState));
};
