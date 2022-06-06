<template>
  <div id="app">
    <div id="viewerWrapper">
      <viewerWrapper elementId="viewer" />
      <!-- <viewerWrapper elementId="viewer2" /> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import BimAir from "../public/js/ViewerWrapper.umd.js";
// import "../public/js/ViewerWrapper.css";

import BimAir from "gs-bim-air";
import "gs-bim-air/lib/BimAir.css";
Vue.use(BimAir.ViewerWrapper);

export default {
  name: "App",
  components: {},
  methods: {},

  mounted() {
    let options = {
      elementId: "viewer",
      modelService: "http://8.134.85.254:9034/api",
      fileService: "http://8.134.85.254:9040/api",
      components: {
        property: {
          tabs: [
            {
              name: "11111",
              component: () => import("./components/HelloWorld.vue"),
            },
          ],
        },
      },
    };
    // let options2 = {
    //   elementId: "viewer2",
    //   modelService: "http://8.134.85.254:9032/api",
    //   fileService: "http://8.134.85.254:9040/api",
    // };

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);
      // let viewer2 = new BimAir.Viewer(options2);
      let id = "62835c6437640c49f53c9776";
      // let id = "629895e8c44f1f288793a7b6";
      viewer.loadModels([id], true).then(() => {
        viewer.fitWorld();
      });
      viewer.modelDebug = true;
      // viewer2.loadModels(["6253e9d6b0545a0a6e49bf85"], true).then(() => {
      //   viewer2.fitWorld();
      // });

      // let defaultFont =
      //   "getComputedSylte" in window
      //     ? getComputedStyle(document.documentElement)["font-family"]
      //     : document.documentElement.currentStyle["font-family"];

      // // let f = new FontFace("Avenir");
      // console.log("ffffffffffff", defaultFont);

      // let fontkit = require("fontkit");

      // // open a font synchronously
      // let font = fontkit.openSync("./font/精简版微软雅黑TTF.ttf");

      // // layout a string, using default shaping features.
      // // returns a GlyphRun, describing glyphs and positions.
      // let run = font.layout("hello world!");

      // // get an SVG path for a glyph
      // let svg = run.glyphs[0].path;
      // console.log("svg-----------", svg);
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
  /* overflow: hidden; */
}

#viewerWrapper {
  height: 100vh;
}
</style>
