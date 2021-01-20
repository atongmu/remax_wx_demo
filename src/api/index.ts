/*
 * @Author: codingfly
 * @Description: 接口
 * @Date: 2020-07-30 17:27:03
 * @LastEditTime: 2020-12-16 10:28:34
 * @FilePath: \small_mall\src\api\index.ts
 */
import { ajax } from '@/utils/common'
const api = {
    login: '/auth/get_xcx_token',
    upInfo: '/auth/upinfo',
    record: '/search/record',
    banners: '/banner/get_banner',
    categorys: '/category/all',
    categorysPros: '/product/get_cate_pros',
    navs: '/nav/get_nav',
    product_list: '/product_list',
    product_status: '/product/activity',
    product_info: '/product/read',
    order_list: '/order/list',
    postOrder: '/order/create',
    pay: '/order//pay/pre_order',
    user: '/consumer/info',
}
export default api
//  获取详情
export function getUser() {
    return ajax(api.user, 'GET', null, false, true, true)
}
//  获取详情
export function getRecord() {
    return ajax(api.record, 'GET', null, false, true, true)
}
//  获取轮播图
export function getBanners(data: any) {
    return ajax(api.banners, 'GET', data, false, true, true)
}
//  获取分类
export function getCategorys() {
    return ajax(api.categorys, 'GET', null, false, true, true)
}
//  获取分类
export function getCategorysPros(data: any) {
    return ajax(api.categorysPros, 'GET', data, false, true, true)
}
//  获取导航
export function getNavs() {
    return ajax(api.navs, 'GET', null, false, true, true)
}
//  获取分页商品
export function getProducts(data: any) {
    return ajax(api.product_list, 'GET', data, false, true, true)
}
//  获取商品
export function getProductStatus(data: any) {
    return ajax(api.product_status, 'GET', data, false, true, true)
}
//  获取商品
export function getProduct(data: any) {
    return ajax(api.product_info, 'GET', data, false, true, true)
}
//  获取分页订单
export function getOrders(data: any) {
    return ajax(api.order_list, 'GET', data, false, true, true)
}
//  创建订单
export function postOrder(data: any) {
    return ajax(api.postOrder, 'POST', data, false, false, true)
}
//  支付
export function paytOrder(data: any) {
    return ajax(api.pay, 'POST', data, false, false, true)
}


//  模板显示状态
export function login(data: any) {
    return ajax(api.login, 'POST', data, false, true, true)
}
export function upInfo(data: any) {
    return ajax(api.upInfo, 'POST', data, false, true, true)
}