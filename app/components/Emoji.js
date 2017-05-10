import EmojiConvertor from 'emoji-js';
import WebUtil from '../utils/WebUtil';

const emoji = new EmojiConvertor();

if (process.env.NODE_ENV === 'development') {
    emoji.img_sets.apple.path = '/emoji-apple-64/';
    emoji.img_sets.apple.sheet = '/emoji-apple-sheet-64.png';
} else {
    emoji.img_sets.apple.path = WebUtil.ASSET_PREFIX + '/images/emoji-apple-64/';
    emoji.img_sets.apple.sheet = WebUtil.ASSET_PREFIX + '/images/emoji-apple-sheet-64.png';
}

emoji.include_title = true;
export default emoji;
