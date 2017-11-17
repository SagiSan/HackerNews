import axios from "axios";
import { List, Map } from "immutable";

const initialState = Map({
  fetching: false,
  fetched: false,
  storiesID: []
  /* storiesData: {} */
});
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TOPSTORIES_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: true
      };
    }
    case "FETCH_TOPSTORIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        storiesID: action.payload
      };
    }
    case "SET_STORIES":
      return {
        ...state,
        storiesData: {
          ...state.storiesData,
          [action.id]: action.data
        }
      };
    case "FETCH_TOPSTORIES_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    default:
      return {
        ...state
      };
  }
}

export function getTopStories() {
  return dispatch => {
    dispatch({ type: "FETCH_TOPSTORIES_PENDING" });
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(res => {
        dispatch({ type: "FETCH_TOPSTORIES_FULFILLED", payload: res.data });
        /*              res.data.map((item, index)=>{
                if(index < 15) {
                    axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
                    .then((res)=>{
                        dispatch({type: 'SET_STORIES', id: res.data.id, data: res.data});
                    });
                }
            }) ; */
      });
  };
}
