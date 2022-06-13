import * as type from "./mutations-type";
const mutations = {
  [type.PUSH_PRODUCT_TO_CART](state, product) {
    state.items.push({
      id: product.id,
      title: product.title,
      quantity: 1,
    });
  },
  [type.INCREMENT_ITEM_QUANTITY](state, product) {
    const cartItem = state.items.find((item) => item.id === product.id);
    cartItem.quantity++;
  },
};
export default mutations;
