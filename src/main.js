import Vue from 'vue'
import App from './App.vue'
// import ViewerWrapper from '../public/gs-longan-viewer-wrapper/exportViewerWrapper'
// import ViewerWrapper from "viewer-wrapper/ViewerWrapper.umd";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Vue.use(ViewerWrapper);
