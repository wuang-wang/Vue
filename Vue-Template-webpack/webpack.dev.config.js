const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 把打包后的文件直接注入到html模板中

module.exports = {
    mode: 'development', // 设置开发模式
    output: {
        path: path.resolve(__dirname, './dist'), // 动态获取出口路径(绝对路径)-文件编译后的位置
        filename: 'bundle.js', // 出口文件名
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader', // 将所有的计算后的样式加入页面中,html页面中插入css代码
                    },
                    {
                        loader: 'css-loader', // 解析CSS样式,可以用模块的方式手动对象形式写样式,style-loader自动处理了这个注入
                    }, //能够使用类似@import 和 url(...)的方法实现 require()的功能
                ],
            },
            {
                test: /\.(vue)$/,
                use: {
                    loader: 'vue-loader',
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // 把打包后的文件直接注入到html模板中
            title: '平台',
            template: path.join(__dirname, './public/index.html'), // 指定模板页面
            filename: 'index.html', // 模板的名称
            inject: 'body', // 将编译的vue的js文件注入到模板页面的body内
        }),
    ],
    devServer: {
        port: 8888, // 设置端口号，如果没有设置，会默认端口号
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
        },
    },
};
