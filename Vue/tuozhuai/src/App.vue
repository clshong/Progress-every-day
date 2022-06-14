<template>
  <div id="app">
    <tuo></tuo>
    <one></one>
  </div>
</template>

<script>
import Tuo from "@/components/Tuo";
import One from "@/components/one";
export default {
  components:{Tuo,One}
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
