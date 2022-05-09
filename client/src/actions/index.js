import {
    CHANGE_CATEGORY,
    CHANGE_YEAR,
    CHANGE_COUNTRY,
    CHANGE_NUMBER_PEOPLE,
    CHANGE_NUMBER_MOVIES,
} from './actionTypes'

export const handleCategoryChange = payload => ({
    type: CHANGE_CATEGORY,
    payload,
});

export const handleYearChange = payload => ({
    type: CHANGE_YEAR,
    payload,
});

export const handleCountryChange = payload => ({
    type: CHANGE_COUNTRY,
    payload,
});

export const numberOfPeople = payload => ({
    type: CHANGE_NUMBER_PEOPLE,
    payload,
});

export const numberOfMovies = payload => ({
    type: CHANGE_NUMBER_MOVIES,
    payload,
});
