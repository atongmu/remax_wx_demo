/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-21 15:20:32
 * @LastEditTime: 2021-02-06 14:38:18
 * @FilePath: \quan_wx\src\servers\index.ts
 */
import { ajax } from '@/utils/common'

export function userLogin(data: any) {
    return ajax('/auth/get_xcx_token', 'POST', data, false, true, true)
}

export function upInfo(data: any) {
    return ajax('/auth/upinfo', 'POST', data, false, true, true)
}


export async function getList(params: any) {

    return ajax('/product/list', 'GET', params, false, true, true)
}

export async function getRead(params: any) {

    return ajax('/product/read', 'GET', params, false, true, true)
}

export function getGenerate(params: any) {

    return ajax('/product/generate', 'POST', params, false, true, true)
}

export function getRecommend(params: any) {

    return ajax('/product/recommend', 'GET', params, false, true, true)
}

export async function getTop(params: any) {

    return ajax('/product/recommend', 'GET', params, false, true, true)
}
export async function getGen(params: any) {

    return ajax('/product/recommend', 'GET', params, false, true, true)
}
export async function verifyDuo(params: any) {

    return ajax('/duo_duo/verifyDuo', 'POST', params, false, true, true)
}


export async function getHotText() {

    return ajax('/search/record', 'GET', null, false, true, true)
}