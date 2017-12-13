import * as actionTypes from '../actionTypes';

export const getPeople = (url) => (dispatch) =>
    fetch(url ? url : 'https://swapi.co/api/people/?format=json')
        .then(
            response => response.json()
        )
        .then( json => {
                dispatch({ type: actionTypes.GET_PEOPLE, people: json })
        });

export const getPlanetInfo = (planetUrl) => (dispatch) => {

    if (planetUrl) {

        fetch(`${planetUrl}?format=json`)
            .then(
                response => response.json()
            )
            .then(json => {
                dispatch({type: actionTypes.GET_PLANET_INFO, planet: json})
            });

    }
};
