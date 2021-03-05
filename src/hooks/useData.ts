/*
 * @Author: codingfly
 * @Description: 分页封装
 * @Date: 2020-08-18 15:27:27
 * @LastEditTime: 2020-12-09 16:52:11
 * @FilePath: \small_mall\src\hooks\useData.ts
 */

import React, { useState, useCallback } from 'react'
import { ajax, toast } from '@/utils/common'
import useRefState from '@/hooks/useRefState'
export interface Props {
    url: string;
    method: any;
    isDelay?: boolean;
    isForm?: boolean;
    hideLoad?: boolean;
}

export default <T>({ url, method, isDelay, isForm, hideLoad = true }: Props) => {
    const [pageStatus, setPageStatus, statusRef] = useRefState(true)
    // 列表是否全部加载完毕
    const [hasMore, setHasMore, hasMoreRef] = useRefState(true)
    // 列表是否为空
    const [empty, setEmpty] = useState(false)
    const [list, setList] = useState<T[]>([])

    const getData = useCallback(async (data) => {
        try {
            let res: any = await ajax(url, method, data, isDelay, isForm, hideLoad)
            if (res.code === 200) {
                if (res.data.data) {
                    return res.data.data
                } else {
                    return []
                }
            } else {
                toast(res.msg)
                return []
            }
        } finally {
            setPageStatus((o: boolean) => o = statusRef.current = true)
        }
    }, [])
    const load = useCallback((data) => {
        if (!pageStatus) {
            return
        }
        setPageStatus((x: boolean) => statusRef.current = false)
        const setFun = setTimeout(async () => {
            const res: any = await getData(data)
            if (res.length < data.size) {
                setHasMore((x: boolean) => hasMoreRef.current = false)
            }
            setList(l => {
                if (res.length === 0 && l.length === 0) {
                    setEmpty(true)
                }
                if (data.page === 1) {
                    return [...res]
                } else {
                    return [...l, ...res]
                }
            })
        }, 800);
        return () => {
            clearTimeout(setFun)
        }
    }, [])

    // 清空列表
    const clean = useCallback(() => {
        setList([])
        setHasMore((x: boolean) => hasMoreRef.current = true)
        setEmpty(false)
    }, [])

    // 刷新列表
    const refresh = useCallback((o) => {
        clean()
        setTimeout(() => {
            load(o)
        })
    }, [])
    return { pageStatus, empty, hasMore, list, load, refresh, clean }
}