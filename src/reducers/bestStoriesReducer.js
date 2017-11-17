import axios from "axios";
import { List, Map } from "immutable";

const initialState = Map({
  fetching: false,
  fetched: false,
  storiesID: List([]),
  error: Map({})
});
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_BESTSTORIES_PENDING":
      return state.set("fetching", true);

    case "FETCH_BESTSTORIES_FULFILLED":
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set("storiesID", List(action.payload.data));

    case "FETCH_BESTSTORIES_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload.message
      };
    }
    default:
      return state;
  }
}

export function getBestStories() {
  return {
    type: "FETCH_BESTSTORIES",
    payload: axios.get(
      "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
    )
  };
}
