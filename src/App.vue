<template>
  <div id="app">
    <div id="viewerWrapper"></div>
  </div>
</template>

<script>
// import viewerWrapper from "viewer-wrapper/ViewerWrapper.umd.js";
export default {
  name: "App",
  components: {},
  methods: {
    loadScript(path) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src = path;
      document.body.appendChild(s);
    },
  },

  mounted() {
    this.loadScript("https://8.134.85.254:8012/index.js");

    let timer = setInterval(() => {
      if (window.BimAir) {
        window.BimAir.InitViewerWrapper("#viewerWrapper");

        window.BimAirSDKLoader.onReady().then(() => {
          let viewer = new window.BimAir.Viewer("viewer");
          viewer.loadLocalModel("./别墅.gsl", "别墅").then(() => {});
        });

        clearInterval(timer);
      }
    }, 100);
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
}

#viewerWrapper {
  height: 100vh;
}
</style>
