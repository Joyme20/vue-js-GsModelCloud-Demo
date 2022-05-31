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
    }
}