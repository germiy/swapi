import * as actionTypes from '../actionTypes';

let initialState = {};

const planetReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_PLANET_INFO:
            return {...action.planet, state};

        default:
            return state;
    }
};

export default planetReducer;
