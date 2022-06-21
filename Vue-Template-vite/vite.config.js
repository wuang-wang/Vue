import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    //修改服务的host和port
    server: {
        host: '127.0.0.1',
        port: '8080',
    },
    //转换./src文件夹为@符号
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [vue()],
});
