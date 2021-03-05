/*
 * @Author: codingfly
 * @Description: api工具类
 * @Date: 2020-07-22 16:37:08
 * @LastEditTime: 2021-03-05 21:36:10
 * @FilePath: \quan_wx\src\utils\common.ts
 */
import { request, showToast, showModal, showLoading, hideLoading, setStorageSync, getStorageSync, clearStorageSync, removeStorageSync, navigateTo, getSystemInfo } from 'remax/wechat';

export function interfaceUrl() {
    return process.env.REMAX_APP_BASE_UR
}
export function toast(content: string, success?: any, duration?: any) {
    showToast({
        title: content || "出错啦~",
        mask: true,
        icon: success ? 'success' : 'none',
        duration: duration || 2000
    })
}
export function modal(title: string, content: string, callback?: (reault: boolean) => void, confirmText?: string, cancelText?: string) {
    showModal({
        title: title || '提示',
        content: content,
        confirmButtonText: confirmText || "确定",
        cancelButtonText: cancelText || "取消",
        success(res: any) {
            if (res.confirm) {
                callback && callback(true)
            } else {
                callback && callback(false)
            }
        }
    })
}
export function getStorage(name: string) {
    return getStorageSync(name)
}
export function setStorage(name: string, data: any) {
    const storage = typeof (data) === 'string' ? data : JSON.stringify(data)
    return setStorageSync(name, storage)
}
export function removeStorage(name: string) {
    return removeStorageSync(name)
}
export function setToken(token: any) {
    setStorage("token", token)
}
export function getToken() {
    return getStorage("token")
}
export function isLogin() {
    const my = getStorage("my") ? JSON.parse(getStorage("my")) : null
    return (my && my.user_avatar && my.nickname) ? true : false
}
export function href(url: string, isVerify?: boolean) {
    if (isVerify && !isLogin()) {
        navigateTo({
            url: '/pages/login/index'
        })
    } else {
        navigateTo({
            url: url
        });
    }
}
export function imageUtil(e: any) {
    let imageSize: any = {};
    const originalWidth = e.detail.width;//图片原始宽 
    const originalHeight = e.detail.height;//图片原始高 
    const originalScale = originalHeight / originalWidth;//图片高宽比 
    console.log('originalWidth: ' + originalWidth)
    console.log('originalHeight: ' + originalHeight)
    //获取屏幕宽高 
    getSystemInfo({
        success: function (res: any) {
            const windowWidth = res.windowWidth;
            const windowHeight = res.windowHeight;
            const windowscale = windowHeight / windowWidth;//屏幕高宽比 
            console.log('windowWidth: ' + windowWidth)
            console.log('windowHeight: ' + windowHeight)
            if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
                //图片缩放后的宽为屏幕宽 
                imageSize.imageWidth = windowWidth;
                imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
            } else {//图片高宽比大于屏幕高宽比 
                //图片缩放后的高为屏幕高 
                imageSize.imageHeight = windowHeight;
                imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
            }

        }
    })
    console.log('缩放后的宽: ' + imageSize.imageWidth)
    console.log('缩放后的高: ' + imageSize.imageHeight)
    return imageSize;
}
export function ajax(url: string = "GET", method: any, postData: any, isDelay: boolean = false, isForm: boolean = true, hideLoad: boolean = false) {
    //接口请求
    let loadding: boolean = false;
    let carfun: any = null;
    clearTimeout(carfun)
    if (!hideLoad) {
        carfun = setTimeout(() => {
            showLoading({
                title: '请稍候...',
                success: (() => {
                    loadding = true
                })
            })
        }, isDelay ? 1000 : 0)
    }

    return new Promise((resolve, reject) => {
        const token: any = getToken()
        request({
            url: interfaceUrl() + url,
            data: postData,
            header: {
                'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
                'token': token
            },
            method: method, //'GET','POST'
            dataType: 'json',
            success: (res: any) => {
                clearTimeout(carfun)
                carfun = null
                if (loadding && !hideLoad) {
                    hideLoading()
                }
                if (res.data.code == 401) {
                    clearStorageSync()
                    modal("系统错误", "登录信息已失效，请重新登录", () => {
                        removeStorage('token')
                    })
                    return
                }
                if (res.data.code == 500) {
                    modal("系统错误", "登录信息已失效，请重新登录")
                    return
                }
                resolve(res.data)
            },
            fail: (res: any) => {
                hideLoading()
                clearTimeout(carfun)
                carfun = null
                toast("网络不给力，请稍后再试~", "none")
                reject(res)
            }
        })
    })
}