export default function cartReducer(state, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add to cart":
      const { id, sku } = action;
      const itemInCart = state.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new array with the matching item replaced
        return state.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return new array with the new item appended
        return [...state, { id, sku, quantity: 1 }];
      }
    case "update quantity": {
      const { sku, quantity } = action;
      return quantity === 0
        ? state.filter((i) => i.sku !== sku)
        : state.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    default:
      throw new Error("unhandled action type " + action.type);
  }
}
