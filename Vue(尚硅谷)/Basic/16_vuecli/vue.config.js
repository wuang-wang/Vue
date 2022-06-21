module.exports = {
    // 关闭eslint
    lintOnSave: false,

    // 一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另一个服务器(4000)
    // 浏览器和服务器之间有跨域，但是服务器和服务器之间没有跨域

    // 开启代理服务器（方式一）
    // devServer: {
    //     proxy: 'http://localhost:4000'  // 请求地址
    //   }

    // 开启代理服务器（方式二）
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:4000',
    //             pathRewrite: { '^/api': '' }, // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
    //             // ws: true,  // 用于支持websocket
    //             // changeOrigin: true  // 用于控制请求头中的host值
    //         },
    //     },
    // },
};
