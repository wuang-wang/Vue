// 导入axios实例
import httpRequest from '@/request/index';

// 获取汽车信息
export function apiGetCarInfo(param) {
    console.log(param);
    return httpRequest({
        url: '/cars',
        method: 'get',
        data: param,
    });
}
