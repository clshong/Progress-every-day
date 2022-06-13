<template>
  <div class="shop">
    <ul class="shop">
      <li v-for="item in listData" :key="item.id">
        <h3>{{ item.title }}</h3>
        <button @click="addPRODUCT(item)">添加到购物车</button>
      </li>
    </ul>
    <hr />
    <h1>购物车</h1>
    <ul class="shop">
      <li v-for="item in items" :key="item.id">
        <h1>商品名称：{{ item.title }}商品数量：{{ item.quantity }}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      listData: [],
    };
  },
  computed: {
    ...mapGetters(["items"]),
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/albums?_limit=5")
      .then((res) => {
        this.listData = res.data;
      });
  },
  methods: {
    //自己定义一个方法
    // addPRODUCT(item) {
    //   this.$store.dispatch('addPRODUCT',item)
    // }
    // 通过api
    ...mapActions(["addPRODUCT"]),
  },
};
</script>

<style scoped>
.shop {
  list-style: none;
}
</style>
