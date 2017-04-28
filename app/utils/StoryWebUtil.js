import axios from 'axios';
import Immutable from 'immutable';
import Promise from 'bluebird';

export default class StoryWebUtil {

  static defaultOptions = {};

  static getStoryJson({ storyId }) {
    if (process.env.NODE_ENV === 'development') {
      return Immutable.fromJS(require(`../assets/stories/${storyId}.json`));
    }
    return Promise.resolve(axios({
      ...StoryWebUtil.defaultOptions,
      url: `//raw.githubusercontent.com/mark-sun/web_demo/master/app/assets/stories/${storyId}.json`,
    })).then(
      response => Immutable.fromJS(response.data)
    )
  }

}

