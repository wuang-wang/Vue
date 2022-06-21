import http from './http';

const post = (url, data = {}) => http.post(url, Object.assign(data));
const get = (url, params = {}) => http.get(url, Object.assign(params));

// 获取汽车数据
const getCarsList = (data) => get('/cars', data);

//接口导出
export { getCarsList };
