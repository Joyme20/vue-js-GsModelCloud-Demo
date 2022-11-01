// const tsImportPluginFactory = require('ts-import-plugin');

// module.exports = {
//     // ...
//     module: {
//         rules: [
//             {
//                 test: /\.(jsx|tsx|js|ts)$/,
//                 loader: 'ts-loader',
//                 options: {
//                     transpileOnly: true,
//                     getCustomTransformers: () => ({
//                         before: [ tsImportPluginFactory( {
//                             libraryName: 'vant',
//                             libraryDirectory: 'es',
//                             style: (path: string) =>
//                                 join('element-ui', 'lib', 'theme-chalk', `${
//                                     camel2Dash(basename(path, '.js'))}.css`),
//                         }) ]
//                     }),
//                     compilerOptions: {
//                         module: 'es2015'
//                     }
//                 },
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     // ...
// }

// config.module
//     .rule('ts')
//     .use('ts-loader')
//     .loader('ts-loader')
//     .tap((options) => {
//         options.getCustomTransformers = () => ({
//             before: [tsImportPluginFactory({
//                 libraryName: 'vant',
//             })],
//         });
//         return options
//     });
const path = require('path');
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    // entry: path.resolve(__dirname, 'output/js/main.js'), // 项目入口文件
    // entry: './output/js/main.js', // 项目入口文件
    entry: [
        "./src/gsDevFx/index.ts",
        // "./public/js/longan/gs.collections.js",
        // "./public/js/longan/gs.viewer.js",
    ], // 项目入口文件
    output: { // 配置输出选项
        path: path.resolve(__dirname, 'output'), // 配置输出的路径
        filename: 'gs.dev.js' // 配置输出的文件名
    },
    resolve: {
        extensions: ['.ts', '.vue', '.js', ".json", ".css", ".scss"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader', // 借助ts-loader依赖进行打包
                // include:["src/gsDevFx"],
                exclude: [/node_modules/,] // 除node_modules文件夹下之外的以.ts结尾的文件
            },
            // {
            //     test: /\.worker\.ts$/,
            //     use: {
            //         loader: "worker-loader"
            //     }
            // },
        ]
    },
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     include: /\/includes/,
            //     uglifyOptions: {
            //         warnings: false,
            //         parse: {},
            //         compress: {
            //             // 在UglifyJs删除没有用到的代码时不输出警告
            //             warnings: false,
            //             // 删除所有的 `console` 语句，可以兼容ie浏览器
            //             drop_console: true,
            //             // 内嵌定义了但是只用到一次的变量
            //             collapse_vars: true,
            //             // 提取出出现多次但是没有定义成变量去引用的静态值
            //             reduce_vars: true,
            //         },
            //         mangle: true, // Note `mangle.properties` is `false` by default.
            //         output: {
            //             // 最紧凑的输出
            //             beautify: false,
            //             // 删除所有的注释
            //             comments: false,
            //         },
            //         toplevel: false,
            //         nameCache: null,
            //         ie8: false,
            //         keep_fnames: false,
            //       }

            // }),
        ],
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        // // 压缩输出的 JS 代码
        // new UglifyJsPlugin({
        //     compress: {
        //         // 在UglifyJs删除没有用到的代码时不输出警告
        //         warnings: false,
        //         // 删除所有的 `console` 语句，可以兼容ie浏览器
        //         drop_console: true,
        //         // 内嵌定义了但是只用到一次的变量
        //         collapse_vars: true,
        //         // 提取出出现多次但是没有定义成变量去引用的静态值
        //         reduce_vars: true,
        //     },
        //     output: {
        //         // 最紧凑的输出
        //         beautify: false,
        //         // 删除所有的注释
        //         comments: false,
        //     }
        // }),
    ],
};
