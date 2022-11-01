<template>
  <div id="app">
    <!-- <div class="viewer-wrapper">
      <viewerWrapper elementId="viewer" style="flex: 1" />
    </div> -->
    <test-demo></test-demo>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import TestDemo from "../packages/testDemo/src/index.vue";

@Component({
  components: {
    TestDemo,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100vh;
  /* overflow: hidden; */
}

.viewer-wrapper {
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  display: flex;
}
body {
  margin: 0;
}
</style>
