<template>
  <div class="count">
    <p>{{ how }}</p>
    <p>{{ childs }}</p>
    <p @click="modeval">
      minis年龄增加<button>{{ age }}</button>
    </p>
    <child :info="info" @fatherValue="fatherValue"></child>
  </div>
</template>
<script>
import Child from "../components/Child";
import { mixins } from "@/minix/minix";
export default {
  components: { Child },
  mixins: [mixins],
  data() {
    return {
      how: "why",
      info: "我是父组件传值给子组件",
      childs: "我是空空",
    };
  },
  component: {
    Child,
  },
  methods: {
    fatherValue(val) {
      alert(val);
      this.childs = val;
    },
    modeval() {
      this.age++;
    },
  },
};
</script>

<style scoped lang="scss">
.count {
  width: 200px;
  height: 200px;
  background: rgb(220, 22, 12);
}
</style>
