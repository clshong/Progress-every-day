<template>
  <div @click="agenext" class="age">
    minis年龄减<button>{{ age }}</button>
  </div>
</template>
<script>
import { mixins } from "@/minix/minix";
export default {
  mixins: [mixins],
  methods: {
    agenext() {
      this.age--;
    },
  },
};
</script>

<style scoped>
.age {
  width: 100%;
  height: 20px;
  background: aqua;
}
</style>
