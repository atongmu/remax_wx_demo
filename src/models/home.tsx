/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-20 09:26:01
 * @LastEditTime: 2021-02-06 15:00:57
 * @FilePath: \quan_wx\src\models\home.tsx
 */
import { arrayGroup, deepClone } from '@/utils/util';
import { getRecommend, getList, getHotText } from '@/servers'


export interface ModalState {
    list: any[];
    hotList: any[];
    nav: any[];
    catId: any[];
    banners: any[];
    messageList: any[];
}

export interface ModelType {
    namespace: string;
    state: ModalState;
    reducers: {
        queryList: any;
        queryHotList: any;
        queryMessageList: any;
    };
    effects: {
        init: any;
        fetchHot: any;
        fetchHotText: any;
        fetchRecommend: any;
    };
}
const Model: ModelType = {
    namespace: 'home',
    state: {
        list: [],
        hotList: [],
        catId: [
            {
                value: '15',
                text: '百货'
            },
            {
                value: '18',
                text: '电器'
            },
            {
                value: '1',
                text: '食品'
            },
            {
                value: '14',
                text: '女装'
            },
            {
                value: '1281',
                text: '鞋包'
            },
            {
                value: '1282',
                text: '内衣'
            },
            {
                value: '16',
                text: '美妆'
            },
            {
                value: '743',
                text: '男装'
            },
            {
                value: '13',
                text: '水果'
            },
            {
                value: '818',
                text: '家纺'
            },
            {
                value: '2478',
                text: '文具'
            },
            {
                value: '590',
                text: '虚拟'
            },
            {
                value: '2048',
                text: '汽车'
            },
            {
                value: '1917',
                text: '家装'
            },
            {
                value: '3279',
                text: '医药'
            },
        ],
        nav: [
            {
                title: '1.9特卖',
                href: '/pages/activity/index?channel_type=0',
                icon: '/image/icon/temai.png'
            },
            {
                title: '实时热销',
                href: '/pages/activity/index?channel_type=5',
                icon: '/image/icon/baokuan.png'
            },
            {
                title: '限时秒杀',
                href: '/pages/list/index?activity_tags=4',
                icon: '/image/icon/miaosha.png'
            },
            {
                title: '充值优惠',
                href: '/pages/activity/index?channel_type=7',
                icon: '/image/icon/chongzhi.png'
            },
        ],
        messageList: [],
        banners: [
            { img_href: '/activity/280282.jpg', href: '/pages/list/index?activity_tags=14' },
            { img_href: '/activity/280280.jpg', href: '/pages/list/index?activity_tags=7' },
            { img_href: '/activity/280281.jpg', href: '/pages/list/index?activity_tags=10475' },
        ]
    },
    effects: {
        *init({ payload }: any, { put }: any) {
            yield put({ type: 'fetchRecommend', payload });
            yield put({ type: 'fetchHot' });
            yield put({ type: 'fetchHotText' });
        },
        *fetchHotText(_: any, { call, put }: any) {
            const response = yield call(getHotText);
            if (response.code === 200) {
                const data = response.data;
                yield put({
                    type: 'queryMessageList',
                    payload: data,
                });
            }
        },
        *fetchHot(_: any, { call, put }: any) {
            const response = yield call(getList, { page: 1, size: 12, keyword: '', activity_tags: 10564 });
            if (response.code === 200) {
                const data = response.data;
                yield put({
                    type: 'queryHotList',
                    payload: arrayGroup(data, 4),
                });
            }
        },
        *fetchRecommend({ payload }: any, { call, put }: any) {
            const params = deepClone(payload)
            delete params.list
            const response = yield call(getList, params);
            if (response.code === 200) {
                const data = response.data;
                let listList = []
                if (payload.page === 1 || !payload.page) {
                    listList = data
                } else {
                    listList = payload.list.concat(data)
                }
                yield put({
                    type: 'queryList',
                    payload: listList,
                });
            }
        },
    },
    reducers: {
        queryList(state: any, action: any) {
            return {
                ...state,
                list: action.payload,
            };
        },
        queryHotList(state: any, action: any) {
            return {
                ...state,
                hotList: action.payload,
            };
        },
        queryMessageList(state: any, action: any) {
            return {
                ...state,
                messageList: action.payload,
            };
        }
    },
};
export default Model;