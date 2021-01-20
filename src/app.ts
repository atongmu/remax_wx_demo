/*
 * @Author: codingfly
 * @Description: 
 * @Date: 2021-01-20 09:18:14
 * @LastEditTime: 2021-01-20 09:25:39
 * @FilePath: \quan_wx\src\app.ts
 */
import React, { useEffect } from 'react';
import dva from 'remax-dva';
import todo from './models/todo';
import { useAppEvent } from 'remax/macro';

import 'annar/dist/annar.css';
import '@/assets/css/app.css'


const app = dva();
app.model(todo);
const App = app.start((props: any) => {
    useAppEvent('onLaunch', () => {
        console.log('onLaunch');
        
    });
    return props.children
});
export default App;
