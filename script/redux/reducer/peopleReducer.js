import * as actionTypes from '../actionTypes';

let initialState = {};

const peopleReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_PEOPLE:
            return {...action.people, state};

        default:
            return state;
    }
};

export default peopleReducer;
