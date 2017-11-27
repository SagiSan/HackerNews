/* import axios from "axios";
 */ import { List, Map } from "immutable";

const initialState = Map({
  fetching: false,
  fetched: false,
  favourites: List([]),
  error: Map({})
});
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_NEWSTORIES_PENDING":
      return state.set("fetching", true);

    case "FETCH_FAVOURITES_FULFILLED":
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set("favourites", state.get("favourites").push(action.payload));
    case "REMOVE_FAVOURITES_FULFILLED":
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set(
          "favourites",
          state.get("favourites").filterNot(item => {
            return item.id === action.payload.id;
          })
        );
    case "FETCH_FAVOURITES_REJECTED":
      return state.set("fetching", false).set("error", Map(action.payload));
    default:
      return state;
  }
}

export function addFavourite(story) {
  return {
    type: "FETCH_FAVOURITES_FULFILLED",
    payload: story
  };
}
export function removeFavourite(story) {
  return {
    type: "REMOVE_FAVOURITES_FULFILLED",
    payload: story
  };
}
