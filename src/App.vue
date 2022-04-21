<template>
  <div id="app">
    <div id="viewerWrapper">
      <viewerWrapper elementId="viewer" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import BimAir from "../public/js/ViewerWrapper.umd.js";
// import "../public/js/ViewerWrapper.css";

import BimAir from "gs-bim-air";
import "gs-bim-air/lib/ViewerWrapper.css";
Vue.use(BimAir.ViewerWrapper);

export default {
  name: "App",
  components: {},
  methods: {
    // loadScript(path) {
    //   const s = document.createElement("script");
    //   s.type = "text/javascript";
    //   s.src = path;
    //   document.body.appendChild(s);
    // },
  },

  mounted() {
    let options = {
      elementId: "viewer",
      modelService: "http://8.134.85.254:9032/api",
      fileService: "http://8.134.85.254:9040/api",
    };

    BimAir.Loader().then(() => {
      let viewer = new BimAir.Viewer(options);
      viewer.loadModels(["6253e9d6b0545a0a6e49bf85"], true).then(() => {});
    });
  },
};
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
  overflow: hidden;
}

#viewerWrapper {
  height: 100vh;
}
</style>
