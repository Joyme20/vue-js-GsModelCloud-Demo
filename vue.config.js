module.exports = {
    outputDir: "cordovaDemo/www/",
    assetsDir: "static",
    lintOnSave: true,
    productionSourceMap: false,
    publicPath: "./",
    configureWebpack: {
        devtool: "source-map",
        plugins: [],
    },
    lintOnSave: false,
    devServer: {
        // http2: true,
        // https: true,
        // mimeType:{ '.html': 'text/html' },
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
            // "x-frame-options": "same-origin",
            // "Cross-Origin-Opener-Policy": "cross-origin",
            //  "Cross-Origin-Embedder-Policy": "require-corp",
        },
        proxy: {
			"/model-service": {
				// target: "https://8.134.85.254:9031/api/model-service", //西北院项目服务器
				// target: "https://8.134.85.254:9035/api/model-service", //电力院项目服务器
				// target: "http://8.134.85.254:9032/api/model-service", //dsx测试服务器 账号：dsx8016 密码：user@123
				// target: "https://gp.gedi.com.cn/model-service",  //电力院内网服务器
				// target: "https://8.134.85.254:9064/api/model-service", //dsx测试服务器 账号：dsx8018 密码：user@123
				// target: "http://8.134.85.254:9034/api/model-service",
				// target: "http://8.134.85.254:9036/api/model-service", //renderObject测试服务
				target: "https://8.134.85.254:9031/api/model-service", //token测试服务
				// target: "http://111.44.214.189:8301/api/model-service", //玛尔挡测试服务

				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/model-service": "/",
				},
			},
			"/file-service": {

				// target: "https://8.134.85.254:9021/api/file-service", //token测试服务
                // target: "http://8.134.85.254:9051/api/dsx-service", //8016服务器

				target: "https://8.134.85.254:9041/api/file-service", //服务器
				// target: "https://gp.gedi.com.cn/file-service", //电力院内网服务器
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/file-service": "/",
				},
			},
        }
    }
}