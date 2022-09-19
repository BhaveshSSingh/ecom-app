export function getItemCount(carts) {
  return carts.reduce((sum, cartItem) => cartItem.quantity + sum, 0);
}

export function getSubTotal(cart) {
  return cart.reduce(
    (sum, { product, quantity }) => product.price * quantity + sum,
    0
  );
}
