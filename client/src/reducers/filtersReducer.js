import { CHANGE_CATEGORY, CHANGE_YEAR, CHANGE_COUNTRY, CHANGE_NUMBER_PEOPLE, CHANGE_NUMBER_MOVIES } from '../actions/actionTypes';

const initialState = {
  choose_category: "",
  choose_year: "",
  choose_country: "",
  amount_of_people: 2,
  amount_of_movies: 20,
};



const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        question_category: action.payload,
      };
    case CHANGE_YEAR:
      return {
        ...state,
        question_difficulty: action.payload,
      };
    case CHANGE_COUNTRY:
      return {
        ...state,
        question_type: action.payload,
      };
    case CHANGE_NUMBER_PEOPLE:
      return {
        ...state,
        amount_of_questions: action.payload,
      };
      case CHANGE_NUMBER_MOVIES:
      return {
        ...state,
        amount_of_questions: action.payload,
      };
      default:
          return state;

  }
};


export default filtersReducer;
