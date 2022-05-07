cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-crop.CropPlugin",
      "file": "plugins/cordova-plugin-crop/www/crop.js",
      "pluginId": "cordova-plugin-crop",
      "clobbers": [
        "plugins.crop"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-crop": "0.3.1"
  };
});