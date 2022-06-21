## 方式一

在`vue.config.js`中添加如下配置：

```js
devServer: {
    proxy: 'http://localhost:4000'  // 请求地址
}
```

说明：

+ 优点：配置简单，请求资源时直接发给前端（8080）即可
+ 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
+ 工作方式：若按照上述配置代理，当请求了前端不存在资源时，那么该请求会转发给服务器（优先匹配前端资源）

## 方式二

编写`vue.config.js`配置具体代理规则：

```js
devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:4000',
                pathRewrite: { '^/api': '' }, // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                    // ws: true,  // 用于支持websocket
                    // changeOrigin: true  // 用于控制请求头中的host值
        },
            '/api2': {
            target: 'http://localhost:4001',
                pathRewrite: { '^/api2': '' }, // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                    // ws: true,  // 用于支持websocket
                    // changeOrigin: true  // 用于控制请求头中的host值
        },
    }
}

/*
	changeOrigin设置为true时，服务器接收到的请求头中的host为：localhost:4000
	changeOrigin设置为false时，服务器接收到的请求头中的host为：localhost:8080
	changeOrigin默认值为false
*/
```

说明：

+ 有点：可以配置多个代理，且可以灵活的控制请求是否走代理
+ 缺点：配置略微繁琐，请求资源时必须添加前缀