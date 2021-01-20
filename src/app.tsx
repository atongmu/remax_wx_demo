/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-20 09:25:01
 * @LastEditTime: 2021-01-20 09:37:06
 * @FilePath: \quan_wx\src\app.tsx
 */
import React, { useEffect } from 'react';
import dva from 'remax-dva';
import todo from './models/todo';
import { useAppEvent } from 'remax/macro';

const app = dva();
app.model(todo);
const App = app.start((props: any) => {
    useAppEvent('onLaunch', () => {
        console.log('onLaunch');
    });
    return props.children
});
export default App;
