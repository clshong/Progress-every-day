<template>
  <div class="child">
    {{ info }}
    <button @click="fatherValue">向father发送通知</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "我是子组件",
    };
  },
  props: ["info"],
  methods: {
    fatherValue: function () {
      this.$emit("fatherValue", this.msg);
    },
  },
};
</script>

<style scoped>
.child {
  width: 200px;
  height: 100px;
  background: green;
}
</style>
