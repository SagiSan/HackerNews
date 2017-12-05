/* import axios from "axios";
 */ import { Map } from "immutable";
import * as localforage from "localforage";

const initialState = Map({
  fetching: false,
  fetched: false,
  favourites: Map({}),
  error: Map({})
});
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_FAVOURITES_PENDING":
      return state.set("fetching", true);
    case "FETCH_FAVSFROMSTORAGE_FULFILLED":
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set("favourites", Map(action.payload));
    case "FETCH_FAVOURITES_FULFILLED":
      localforage.getItem("favourites").then(item => {
        let obj = { ...item };
        obj[action.payload.id] = action.payload;
        localforage.setItem("favourites", obj);
      });
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set(
          "favourites",
          state.get("favourites").set(action.payload.id, action.payload)
        );
    case "REMOVE_FAVOURITES_FULFILLED":
      localforage.getItem("favourites").then(item => {
        let obj = { ...item };
        delete obj[action.payload.id];
        localforage.setItem("favourites", obj).then(item => {
          if (!item.length) {
            localforage.removeItem("favourites");
          }
        });
      });
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set("favourites", state.get("favourites").remove(action.payload.id));
    case "FETCH_FAVOURITES_REJECTED":
      return state.set("fetching", false).set("error", Map(action.payload));
    default:
      return state;
  }
}

export function addFavFromStorage(favs) {
  return {
    type: "FETCH_FAVSFROMSTORAGE_FULFILLED",
    payload: favs
  };
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
