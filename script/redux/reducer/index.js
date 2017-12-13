import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import peopleReducers from './peopleReducer';
import planetReducers from './planetReducer';

export default combineReducers({
    routing: routerReducer,
    people: peopleReducers,
    planet: planetReducers
});

