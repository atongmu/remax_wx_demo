import React, { useEffect } from 'react';
import dva from 'remax-dva';
import { global, home } from './models'
import { useAppEvent } from 'remax/macro';

import 'annar/dist/annar.css';
import '@/assets/css/app.css'

const app = dva();

app.model(global);
app.model(home);
const App = app.start((props: any) => {
    useAppEvent('onLaunch', () => {
        console.log('onLaunch');
    });
    return props.children
});
export default App;
