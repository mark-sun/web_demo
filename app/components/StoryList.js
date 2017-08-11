import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Immutable from 'immutable';
import React from 'react';

import styles from './StoryList.scss';


class StoryList extends React.Component {

  static STORY_LIST = Immutable.List([
    { name: "test", id: 'test'},
    { name: "思思 - part 1", id: 'story_sisi'},
    { name: "思思 - part 2", id: 'story_sisi_2'},
    { name: "自拍", id: 'selfie'},
    { name: "爱德华八世退位宪政危机", id: 'abdication'},
    { name: "正在输入-old_version", id: 'zhengzaishuru0504'},
    { name: "正在输入", id: 'zhengzaishuru0517'},
    { name: "回家路上(kd)", id: 'huijialushang'},
  ]);

  render() {
    let { match } = this.props;
    let prefix = location.origin;
    if (process.env.NODE_ENV === 'gh') {
      prefix = prefix + '/#';
    } 
    return (
      <div className={styles.storyListContainer}>
        <p>Celine, 请不要分享这个list的链接。分享每个故事的链接。</p>
        <ul>
          { 
            StoryList.STORY_LIST.map((story, index) => {
              return (
                <li key={index}>
                  <Link to={`${match.url}${story.id}`}> {story.name} </Link>
                  : {`${prefix}${match.url}${story.id}`}
                </li>
              );
            })
          }
        </ul>

        <svg className={styles.hearts} dangerouslySetInnerHTML={{__html: require('../assets/images/hearts.svg')}} />
      </div>
    );
  }
}

export default connect(null, {})(StoryList);
