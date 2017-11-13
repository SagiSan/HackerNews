import {combineReducers} from 'redux';

import topStories from './topStoriesReducer';
import bestStories from './bestStoriesReducer';
import newStories from './newStoriesReducer';

export default combineReducers({
    topStories,
    bestStories,
    newStories,
});