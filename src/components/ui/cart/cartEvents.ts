export const OPEN_CART_EVENT = "tiiron:open-cart";

export const openCart = () => {
  window.dispatchEvent(new Event(OPEN_CART_EVENT));
};
