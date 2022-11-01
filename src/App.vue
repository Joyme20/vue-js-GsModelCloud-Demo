<template>
  <div id="app">
    <div class="viewer-wrapper">
      <viewerWrapper elementId="viewer" style="flex: 1" />
      <!-- <viewerWrapper elementId="viewer2" style="flex: 1" /> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
// import BimAir from "../public/js/ViewerWrapper.umd.js";
// import "../public/js/ViewerWrapper.css";

// import BimAir from "gs-bim-air";
// import "gs-bim-air/lib/BimAir.css";
// eslint-disable-next-line
import BimAir from "../../vue-ts-bimlight-platform/packages/bimAir/lib/BimAir.umd";
import "../../vue-ts-bimlight-platform/packages/bimAir/lib/BimAir.css";
Vue.use(BimAir.ViewerWrapper);

export default {
  name: "App",
  components: {},
  methods: {
    addAditClick(viewer) {
      // let data = [
      //   {
      //     id: "22345678901234567890",
      //     code: "PD01", //平硐编号
      //     calibrer: 2, //保留口径
      //     calibrerType: "1", //口径类型，1拱洞型
      //     controlPoints: [
      //       {
      //         orderNo: 0,
      //         X: 605026.677, //坐标(X)
      //         Y: 3369678.983, //坐标(Y)
      //         Z: 3059.67, //坐标(Z)
      //       },
      //       {
      //         orderNo: 1,
      //         X: 605002.157, //坐标(X)
      //         Y: 3369723.695, //坐标(Y)
      //         Z: 3061.352, //坐标(Z)
      //       },
      //       {
      //         orderNo: 2,
      //         X: 604980.38, //坐标(X)
      //         Y: 3369765.491, //坐标(Y)
      //         Z: 3063.903, //坐标(Z)
      //       },
      //       {
      //         orderNo: 3,
      //         X: 604972.19, //坐标(X)
      //         Y: 3369779.512, //坐标(Y)
      //         Z: 3064.814, //坐标(Z)
      //       },
      //       {
      //         orderNo: 5,
      //         X: 604962.605, //坐标(X)
      //         Y: 3369806.296, //坐标(Y)
      //         Z: 3066.127, //坐标(Z)
      //       },
      //       // {
      //       //   "orderNo": 4,
      //       //   "X": 604975.542, //坐标(X)
      //       //   "Y": 3369772.345, //坐标(Y)
      //       //   "Z": 3064.332 //坐标(Z)
      //       // },

      //       // {
      //       //   "orderNo": 6,
      //       //   "X": 604960.593, //坐标(X)
      //       //   "Y": 3369813.08, //坐标(Y)
      //       //   "Z": 3066.436 //坐标(Z)
      //       // }
      //     ],
      //   },
      //   {
      //     id: "22345678901234567891",
      //     code: "PD02", //平硐编号
      //     calibrer: 2, //保留口径
      //     calibrerType: "1", //口径类型，1拱洞型
      //     controlPoints: [
      //       {
      //         orderNo: 0,
      //         X: 605133.389, //坐标(X)
      //         Y: 3369588.646, //坐标(Y)
      //         Z: 3022.506, //坐标(Z)
      //       },
      //       {
      //         orderNo: 1,
      //         direction: 120, //洞向
      //         dip_angle: 0.59, //坡度
      //         no: 15, //桩号（表示里程，需减去上一里程量）
      //       },
      //       {
      //         orderNo: 2,
      //         direction: 124, //洞向
      //         dip_angle: 0.59, //坡度
      //         no: 30, //桩号（表示里程，需减去上一里程量）
      //       },
      //       {
      //         orderNo: 3,
      //         direction: 130, //洞向
      //         dip_angle: 0.59, //坡度
      //         no: 50, //桩号（表示里程，需减去上一里程量）
      //       },
      //       {
      //         orderNo: 4,
      //         direction: 126, //洞向
      //         dip_angle: 0.59, //坡度
      //         no: 75, //桩号（表示里程，需减去上一里程量）
      //       },
      //       {
      //         orderNo: 5,
      //         direction: 132, //洞向
      //         dip_angle: 0, //坡度
      //         no: 161.6, //桩号（表示里程，需减去上一里程量）
      //       },
      //     ],
      //   },
      // ];

      let data = [
        {
          id: "2",
          code: "PD201",
          calibrer: 2,
          calibrerType: "1",
          controlPoints: [
            {
              orderNo: 0,
              direction: 0,
              no: 0,
              X: 604371.497,
              Y: 3369541.102,
              Z: 3201.523,
              dip_angle: 0,
            },
            {
              orderNo: 1,
              direction: 94.9999999999558,
              no: 221.199999999973,
              X: 604591.843584221,
              Y: 3369521.82417183,
              Z: 3203.8007540452,
              dip_angle: 0.590000000000105,
            },
          ],
        },
      ];
      viewer.addAdits("平硐组模型", data);
    },
  },
  data: () => {
    return {
      isShow: true,
    };
  },

  mounted() {
    let options = {
      elementId: "viewer",
      // modelService: "https://8.134.85.254:9021/api",
      // fileService: "http://8.134.85.254:9040/api",

      modelService: "http://8.134.85.254:9036/api",
      fileService: "https://8.134.85.254:9041/api",

      // modelService: "https://static.graphicstone.com/modelApi",
      // fileService: "https://static.graphicstone.com/fileApi",
      // components: {
      //   property: {
      //     tabs: [
      //       {
      //         name: "11111",
      //         component: () => import("./components/HelloWorld.vue"),
      //       },
      //     ],
      //   },
      // },
    };
    let options2 = {
      elementId: "viewer2",
      modelService: "http://8.134.85.254:9036/api",
      fileService: "http://8.134.85.254:9040/api",
    };

    BimAir.Loader({
      // key: "681fe1e77ec44cd88af1620c1b2bffc2",
      // secret: "NjgxZmUxZTc3ZWM0NGNkODhhZjE2MjBjMWIyYmZmYzI=",
      // userService: "https://8.134.85.254:9021/api",
      isShareArrayBuffer: true,
    }).then(() => {
      let viewer = new BimAir.Viewer(options);
      // viewer.isUpdateTt = true;
      // viewer.isCache = true;
      // viewer.modelDebug = true;

      viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer = true;

      // viewer.camera.projection = BimAir.Longan.ProjectionType.Orthographic; //正交投影
      viewer.highlightManager.material.setColor(255, 0, 0);

      // let viewer2 = new BimAir.Viewer(options2);
      let id = "629577fbbc7dff4fe318bc17";
      // let id = "629895e8c44f1f288793a7b6";
      // this.addAditClick(viewer);
      viewer
        .loadModels([
          // { id: id, version: 1 },
          { id: "63105024b15c844749910c62", version: 1 },
        ])
        .then(() => {
          // viewer.modelDebug = true;
          // viewer.fitWorld();
          // viewer.camera.position = [-16.356, 45.186, 110.299];
          // viewer.camera.target = [-13.438, 6.806, 2.679];
          // viewer.camera.up = [0.071, -0.939, 0.337];
          // viewer.camera.setField(217.112, 217.112);

          // setTimeout(() => {
          //   // viewer.updateDisplay();
          // }, 300);
          viewer.updateDisplay();

          viewer.panelManager.viewPointPanel.addViewPoint("aaa").then((res) => {
            let id = res.viewPoint.id;
          });
          // console.log("SharedArrayBuffer", SharedArrayBuffer);

          // let data = [];
          // for (let i = 0; i < 100; i++) {
          //   let hole = {
          //     id: "12345678901234567890" + i,
          //     code: "GZK-01" + i,
          //     holeDepth: 151.2,
          //     X: 605053.23 + i * 10,
          //     Y: 3369651.6 + i * 10,
          //     Z: 3048.22 + i * 10,
          //     AZ: 120,
          //     AN: 90,
          //     thickness: 79.3,
          //     startCalibrer: 0.15,
          //     endCalibrer: 0.75,
          //   };
          //   data.push(hole);
          // }
          // viewer.addBoreholes("钻孔组模型", data).then((res) => {
          //   console.log(res);
          // });

          // let id = "90665086-21de-4d97-873a-f6c0d834be8b";
          // viewer.loadRenderObjects([id]);
        });
      // viewer.modelDebug = true;
      // viewer2.loadModels(["629577fbbc7dff4fe318bc17"], true).then(() => {
      //   viewer2.fitWorld();
      // });

      // setTimeout(() => {
      //   viewer2.dispose();
      //   this.isShow = false;
      //   setTimeout(() => {
      //     viewer.updateSize();
      //   }, 0);
      // }, 5000);

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
