import classNames from 'classnames';
import React from 'react';
import styles from './Spinner.scss';

class Spinner extends React.Component {
  static propTypes = {
    alignment: React.PropTypes.string,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.string,
  };
  
  static defaultProps = {
    color: 'blue',
    size: 'medium',
  };
  
  render() {
    const {
      alignment,
      className,
      color,
      size,
    } = this.props;
    
    return (
      <svg
        className={classNames(
          styles.spinner,
          styles[`spinner--color-${color}`],
          styles[`spinner--size-${size}`],
          styles[`spinner--alignment-${alignment}`],
          className
        )}
        viewBox="0 0 30 30"
      >
        <g transform="translate(15,15) scale(1,-1)">
          <circle
            className={styles.circle}
            r="12.5"
          />
          <path
            className={styles.arc}
            d="M 12.5 0 A 12.5 12.5 0 0 1 -12.5 0"
          />
        </g>
      </svg>
    );
  }
}

export default Spinner;
