//根据老的state和指定的action，返回新的state
import {combineReducers} from 'redux'
import reducers1 from './reducers/reducer_1.js'
import reducers2 from './reducers/reducer_2.js'

export default combineReducers({
        ...reducers1,
    ...reducers2
})