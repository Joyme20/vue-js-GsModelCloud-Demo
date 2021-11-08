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
    // loadScript(path) {
    //   const s = document.createElement("script");
    //   s.type = "text/javascript";
    //   s.src = path;
    //   document.body.appendChild(s);
    // },
  },

  mounted() {
    // this.loadScript("https://8.134.85.254:8012/index.js");

    let timer = setInterval(() => {
      if (window.BimAir) {
        window.BimAir.InitViewerWrapper("#viewerWrapper");

        window.BimAirSDKLoader.onReady().then(() => {
          // let viewer = new window.BimAir.Viewer("viewer");
          // viewer.loadModel("616077290b8d484a0a64b7a8");
          // // viewer.loadLocalModel("./别墅.gsl", "别墅").then(() => {});

          let viewer = new window.BimAir.Viewer("viewer");
            let versionId = "617bb95f0f7c846f7cb38f16";

            viewer.loadModel(versionId).then(() => {
                let labelList = [{properties: "属性", position: [0, 0, 0]}, {
                    properties: "属性1",
                    position: [20, 20, 20]
                }]
                let labelArr = []
                let viewerWrapper = document.getElementsByClassName("viewer-wrapper")[0]
                labelList.forEach((item, index) => {
                    // let div = document.createElement("div")
                    // div.style.position = "absolute"
                    // div.style.width = "50px"
                    // div.style.height = "50px"
                    // div.style.background = "#ff0000"
                    // div.addEventListener("click",()=>{
                    //     alert(labelList[index].properties)
                    // })
                    // viewerWrapper.appendChild(div)
                    // labelArr.push(div)

                    let img = document.createElement("img")
                    img.src=require("./assets/label.gif")
                    img.style.position = "absolute"
                    img.style.width = "50px"
                    img.style.height = "50px"
                    img.style.background = "#ff0000"
                    img.addEventListener("click",()=>{
                        alert(labelList[index].properties)
                    })
                    viewerWrapper.appendChild(img)
                    labelArr.push(img)
                })
                console.log(viewerWrapper)

                let positionList = labelList.map(item=>item.position)

                viewer.createLabel(positionList, ( pixelPos) => {
                    labelArr.forEach((div,i) => {
                        labelArr[i].style.left = pixelPos[i][0] + "px"
                        labelArr[i].style.top = pixelPos[i][1] + "px"
                    })
                })
            })
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
  overflow: hidden;
}

#viewerWrapper {
  height: 100vh;
  
}
</style>
