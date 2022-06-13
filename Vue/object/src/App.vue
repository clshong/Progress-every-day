<template>
  <div id="app">
    <father></father>
    <agenext></agenext>
    <div>
      <shop></shop>
    </div>
  </div>
</template>

<script>
import Father from "@/views/Father";
import Agenext from "@/views/agenext";
import Shop from "@/views/shop";
export default {
  name: "App",
  components: { Shop, Agenext, Father },
};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  background: pink;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
