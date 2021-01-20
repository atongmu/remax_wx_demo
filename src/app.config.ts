/*
 * @Author: your name
 * @Date: 2020-09-24 19:02:37
 * @LastEditTime: 2021-01-20 09:27:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quan_wx\src\app.config.ts
 */
import { AppConfig } from "remax/wechat";
const backgroundColor: string = '#f77';
const title: string = '便捷超市';
const pages: Array<string> = [
  'pages/index/index',
]

const config: AppConfig = {
  pages,
  window: {
    navigationBarTitleText: title,
    navigationBarBackgroundColor: backgroundColor
  }
};

export default config;