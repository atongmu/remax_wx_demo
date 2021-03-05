/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-02-06 10:06:48
 * @LastEditTime: 2021-02-06 10:07:01
 * @FilePath: \quan_wx\src\hooks\useUserInfo.ts
 */
import * as React from 'react';

export default function useUserInfo() {
    const [userInfo, setUserInfo] = React.useState(null);

    function login(response: any) {
        const { userInfo } = response.detail;

        userInfo.avatar = userInfo.avatarUrl;
        setUserInfo(response.detail.userInfo);
    }

    return [userInfo, login];
}