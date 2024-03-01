export const formatPrice = price => {
  return (Math.round(price * 100) / 100).toFixed(2);
};

export const updateCart = state => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  state.itemsPrice = formatPrice(itemsPrice);

  // Calculate shipping price
  const shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = formatPrice(shippingPrice);

  // Calculate tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = formatPrice(taxPrice);

  // Calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = formatPrice(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
