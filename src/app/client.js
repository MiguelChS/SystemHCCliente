/**
 * Created by mc185249 on 1/11/2017.
 */
require('es6-promise/auto');
require("babel-polyfill");
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import  Main from './components/index.jsx';


const app = document.getElementById('app');

render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    app);