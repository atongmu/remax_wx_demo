/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-20 09:26:01
 * @LastEditTime: 2021-01-20 09:32:38
 * @FilePath: \quan_wx\src\models\todo.tsx
 */

import { getStorage, setStorage } from '@/utils/common';
import { Effect, Reducer } from 'remax-dva';
export interface ModalState {
    list: any[];
}

export interface ModelType {
    namespace: string;
    state: ModalState;
    reducers: {
        setList: Reducer<ModalState>;
    };
    effects: {
        init: Effect;
        fetch: Effect;
    };
}
const Model: ModelType = {
    namespace: 'home',
    state: {
        list: [],
    },
    effects: {
        *init(_, { put }) {
            yield put({ type: 'fetch' });
        },
        *fetch(_, { put }) {
            // const carts: any = getStorage("cart") ? JSON.parse(getStorage("cart")) : []
            // yield put({
            //     type: 'setCartList',
            //     payload: carts,
            // });
        },
    },
    reducers: {
        setList(state: any, action: any) {
            return { ...state, cartList: action.payload };
        }
    },
};
export default Model;