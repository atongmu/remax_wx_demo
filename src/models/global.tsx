/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-28 09:14:52
 * @LastEditTime: 2021-02-01 14:32:03
 * @FilePath: \quan_wx\src\models\global.tsx
 */
import { arrayGroup, deepClone } from '@/utils/util';
import { getRecommend, getList } from '@/servers'


export interface ModalState {
    nav: any[];
    catIdList: any[];
    sortTypeList: any[];
    merchantTypeList: any[];
    userInfo: any;
}

export interface ModelType {
    namespace: string;
    state: ModalState;
    reducers: {
        queryUser: any;
    };
}
const Model: ModelType = {
    namespace: 'global',
    state: {
        userInfo: undefined,
        catIdList: [
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
        sortTypeList: [
            {
                value: '0',
                text: '综合排序',
            },
            {
                value: '3',
                text: '按价格升序',
            },
            {
                value: '4',
                text: '按价格降序',
            },
            {
                value: '6',
                text: '按销量降序',
            },
            {
                value: '9',
                text: '券后价升序',
            },
            {
                value: '10',
                text: '券后价降序',
            },
            {
                value: '16',
                text: '店铺评分降序',
            },
        ],
        merchantTypeList: [
            {
                value: '1',
                text: '个人',
            },
            {
                value: '2',
                text: '企业',
            },
            {
                value: '3',
                text: '旗舰店',
            },
            {
                value: '4',
                text: '专卖店',
            },
            {
                value: '5',
                text: '专营店',
            },
            {
                value: '6',
                text: '普通店',
            },
        ],
        nav: [
            {
                title: '1.9特卖',
                href: '',
                icon: '/image/icon/temai.png'
            },
            {
                title: '今日爆款',
                href: '',
                icon: '/image/icon/baokuan.png'
            },
            {
                title: '限时秒杀',
                href: '',
                icon: '/image/icon/miaosha.png'
            },
            {
                title: '充值优惠',
                href: '',
                icon: '/image/icon/chongzhi.png'
            },
        ],
    },
    reducers: {
        queryUser(state: any, action: any) {
            return {
                ...state,
                userInfo: action.payload,
            };
        }
    },
};
export default Model;