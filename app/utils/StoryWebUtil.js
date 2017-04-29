import axios from 'axios';
import Immutable from 'immutable';
import Promise from 'bluebird';

export default class StoryWebUtil {

  static defaultOptions = {};
  
  static ASSET_PREFIX = '//raw.githubusercontent.com/mark-sun/web_demo/master/app/assets';

  static getStoryJson({ storyId }) {
    if (process.env.NODE_ENV === 'development') {
      return Immutable.fromJS(require(`../assets/stories/${storyId}.json`));
    }
    return Promise.resolve(axios({
      ...StoryWebUtil.defaultOptions,
      url: `${StoryWebUtil.ASSET_PREFIX}/stories/${storyId}.json`,
    })).then(
      response => Immutable.fromJS(response.data)
    )
  }

  static getImageUrl(fileName) {
    if (process.env.NODE_ENV === 'development') {
      return require(`../assets/images/${fileName}`);
    }
    return `${StoryWebUtil.ASSET_PREFIX}/images/${fileName}`;
  }
}
