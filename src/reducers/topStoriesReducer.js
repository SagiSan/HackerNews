import axios from 'axios';

const initialState = {
    fetching: false,
    fetched: false,
    topStories: []
}
export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_TOPSTORIES_PENDING':
            {
                return {
                    ...state,
                    fetching: true
                }
            }
        case 'FETCH_TOPSTORIES_FULFILLED':
            {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    topStories: action.payload
                }
            }
        case 'FETCH_TOPSTORIES_REJECTED':
            {
                return {
                    ...state,
                    fetching: false,
                    error: action.payload
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