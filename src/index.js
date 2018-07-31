import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd-mobile'
import {HashRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import MainComponent from './containers/main/Main.jsx'
import Login from './containers/login/Login.jsx'
import Register from './containers/register/Register.jsx'
import store from './redux/store.js'
import './assets/css/index.less'
ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={MainComponent}></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'));
