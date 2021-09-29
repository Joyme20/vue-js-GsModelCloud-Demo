<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <div id="viewerWrapper"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    loadScript() {
      const s = document.createElement("script");
      s.type = "text/javascript";
      // s.src = "https://8.134.85.254:8012/index.js";
      s.src = "http://localhost:9000/index.js";
      document.body.appendChild(s);
    },
  },
  beforeCreate() {},
  beforeMount() {
    // this.loadScript();
  },
  mounted() {
    this.loadScript();
    window.onload = () => {
      if (window.LonganSDK) {
        window.LonganSDK.loader.loadModel("614c3877623f1b5e3826a402");
      }
    };
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
