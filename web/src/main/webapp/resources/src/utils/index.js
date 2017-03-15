import React from 'react';
import {Provider} from 'react-redux';

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

//
// static filter callback function. Use to unique Array values like this:
// uniqueArr = notUniqueArr.filter(onlyUnique);
//
export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

