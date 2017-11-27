import {combineReducers} from 'redux';

import topStories from './topStoriesReducer';
import bestStories from './bestStoriesReducer';
import newStories from './newStoriesReducer';
import favourites from './favouritesReducer';

export default combineReducers({
    topStories,
    bestStories,
    newStories,
    favourites,
});