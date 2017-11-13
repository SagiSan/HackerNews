import axios from 'axios';

const initialState = {
    fetching: false,
    fetched: false,
    stories: []
}
export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_TOPSTORIES_PENDING':
            {
                return {
                    ...state,
                    fetched: false,
                    fetching: true
                }
            }
        case 'FETCH_TOPSTORIES_FULFILLED':
            {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    stories: action.payload.data
                }
            }
        case 'FETCH_TOPSTORIES_REJECTED':
            {
                return {
                    ...state,
                    fetching: false,
                    error: action.payload.message
                }
            }
        default:
            return {
                ...state
            }
    }
}

export function getTopStories() {
    return {
        type: "FETCH_TOPSTORIES",
        payload: axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    }
}