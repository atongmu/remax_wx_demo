/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-20 09:18:14
 * @LastEditTime: 2021-01-20 09:57:50
 * @FilePath: \quan_wx\src\pages\index\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { View, switchTab } from 'remax/wechat';
import { connect } from 'remax-dva';
import { usePageEvent } from 'remax/macro';

import { Tag } from 'annar';
import { href, toast, setStorage } from '@/utils/common'
import { deepClone } from '@/utils/util';
import { getBanners, getProductStatus, getNavs, getRecord } from '@/api';
import page_path from '@/utils/page_path';
import styles from './index';

const Home = (props: any) => {
  const { list, dispatch } = props

  usePageEvent('onShow', () => {
    init()
    dispatch({
      type: 'home/init'
    })
  });
  const init = async () => {

  }
  return (
    <View className={`${styles.app} padding-env`}>
1
    </View >
  );
};
const mapStateToProps = (state: any) => ({
  list: state.home.list,
});
export default connect(mapStateToProps)(Home);