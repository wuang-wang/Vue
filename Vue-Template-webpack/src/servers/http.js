import axios from 'axios';
import qs from 'qs';
import { Dialog } from 'vant';

// axios.defaults.baseURL = 'https://www.fastmock.site/mock/3c15a1cc9a5d206686a03d453e410267/vue'  //正式
axios.defaults.baseURL = 'https://www.fastmock.site/mock/3c15a1cc9a5d206686a03d453e410267/vue'; //测试

//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        Dialog.alert({
            title: '提示',
            message: '网络请求失败，请刷新重试',
        });
    }
);
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: qs.stringify(data),
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data,
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
