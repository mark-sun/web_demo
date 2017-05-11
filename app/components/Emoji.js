import EmojiConvertor from 'emoji-js';
import WebUtil from '../utils/WebUtil';

const EMOJI_DATA_REPO_URL = '//raw.githubusercontent.com/mark-sun/emoji-data-repo/master/'

const emoji = new EmojiConvertor();
emoji.img_sets.apple.path = EMOJI_DATA_REPO_URL + 'emoji-apple-64/';
emoji.img_sets.apple.sheet = EMOJI_DATA_REPO_URL + 'emoji-apple-sheet-64.png';

emoji.include_title = true;
export default emoji;
