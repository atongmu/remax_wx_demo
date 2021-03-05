/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2020-12-08 14:06:17
 * @LastEditTime: 2020-12-08 16:46:46
 * @FilePath: \small_mall\src\utils\cache\user.ts
 */
//  用户的缓存数据 
import { getUser } from '@/api'
import { getToken, getStorage, setStorage } from '@/utils/common';

const time: any = Date.parse(String(new Date())) / 1000

class CUser {
    constructor() {

    }

    info() {
        const token = getToken()
        if (!token) return;
        const my = getStorage('my')
        if (my && (my.save_time + 3600 * 2) > time) {
            return my.data
        }
        getUser().then((res: any) => {
            const { code, data } = res
            const storage = null;
            if (code === 200) {
                const storage = { ...data, save_time: time }
                setStorage('my', storage)
            }
            return storage
        }).catch(() => {
            return null
        })
    }

    async info_wait() {
        const my = getStorage('my')
        if (my.data && my.data.headpic && (my.save_time + 3600 * 2) > time) {
            return my.data
        }

        getUser().then((res: any) => {
            const { code, data } = res
            const storage = null;
            if (code === 200) {
                const storage = { ...data, save_time: time }
                setStorage('my', storage)
            }
            return storage
        }).catch(() => {
            return null
        })
    }

    async reset_storage() {
        return getUser().then((res: any) => {
            const { code, data } = res
            if (code === 200) {
                const storage = { ...data, save_time: time }
                setStorage('my', storage)
                return storage
            }
        })

    }
}


export { CUser };