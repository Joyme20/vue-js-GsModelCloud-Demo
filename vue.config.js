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
        // proxy: {
        //     "/model-service": {
        //         target: "http://8.134.85.254:9034/api/model-service",
        //         // target: "http://8.134.85.254:9036/api/model-service", //renderObject测试服务

        //         changeOrigin: true,
        //         ws: true,
        //         pathRewrite: {
        //             "^/model-service": "/",
        //         },
        //         timeout: 300000
        //     },
        // }
    }
}