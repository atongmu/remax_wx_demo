/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2020-12-08 15:22:53
 * @LastEditTime: 2021-01-26 10:01:19
 * @FilePath: \quan_wx\src\common\xcx_token.ts
 */

import { login } from 'remax/wechat'
import { userLogin } from '@/servers'
import { getToken, setToken } from '@/utils/common';
class XcxToken {
	constructor() {
	}
	//初始化登陆
	async verify() {
		var token = getToken(); //获取缓存
		if (!token) {
			//向微信api拿code，再向tp的api拿token
			this.getTokenFromServer();
		} else {
			this._veirfyFromServer(token); //验证token是否过期，过期调用.getTokenFromServer函数获取
		}
	}
	//验证token
	_veirfyFromServer(token: string) {
		var that = this;
		// uni.request({
		// 	url: that.verifyUrl,
		// 	method: 'POST',
		// 	data: {
		// 		token: token
		// 	},
		// 	success: function(res) {
		// 		var valid = res.data.isValid;
		// 		if (!valid) {
		// 			that.getTokenFromServer();
		// 		}
		// 	}
		// })
	}
	//获取Token
	getTokenFromServer() {
		login().then((res: any) => {
			if (res.code) {
				userLogin({ code: res.code }).then((res: any) => {
					const { token } = res
					if (token) {
						setToken(token)
					}
				})
			}

		})
	}
}
export {
	XcxToken
};


