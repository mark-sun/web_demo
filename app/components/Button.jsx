import React, { PropTypes } from 'react'

export default function Button ({
  className,
  buttonName,
}) {
  return (
    <div>
      {buttonName}
    </div>
  );
}

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
};
