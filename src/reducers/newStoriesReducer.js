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
    case "FETCH_NEWSTORIES_PENDING":
      return state.set("fetching", true);

    case "FETCH_NEWSTORIES_FULFILLED":
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set("storiesID", List(action.payload.data));
    case "FETCH_NEWSTORIES_REJECTED":
      return state
        .set("fetching", false)
        .set("storiesID", List(action.payload));
    default:
      return state;
  }
}

export function getNewStories() {
  return {
    type: "FETCH_NEWSTORIES",
    payload: axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    )
  };
}
