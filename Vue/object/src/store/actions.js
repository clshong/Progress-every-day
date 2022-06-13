import * as types from "./mutations-type";
export const addPRODUCT = function ({ commit, state }, product) {
  const cartItem = state.items.find((item) => item.id === product.id);
  if (!cartItem) {
    commit(types.PUSH_PRODUCT_TO_CART, {
      id: product.id,
      title: product.title,
    });
  } else commit(types.INCREMENT_ITEM_QUANTITY, cartItem);
};
