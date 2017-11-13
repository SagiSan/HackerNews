export function getTopStories(stories) {
    return {
        type: "FETCH_TOP_STORIES_FULFILLED",
        payload: stories
    }
}

export function getBestStories(stories) {
    return {
        type: "FETCH_BEST_STORIES_FULFILLED",
        payload: stories
    }
}

export function getNewStories(stories) {
    return {
        type: "FETCH_NEW_STORIES_FULFILLED",
        payload: stories
    }
}