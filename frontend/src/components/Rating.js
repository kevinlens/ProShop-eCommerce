import React from 'react';
//this helps make sure the props require specific types like arrays, objects, functions, in order to be passed and work
import PropTypes from 'prop-types';

// 'color' is the default value which we had set at the very bottom in 'defaultProps'
const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {/* if text exist THEN show text */}
      <span>{text && text}</span>
    </div>
  );
};

//the default values which we set to 'props'
Rating.defaultProps = {
  color: '#f8e825',
};

//this helps make sure the props require specific types like arrays, objects, functions, in order to be passed and work
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}


export default Rating;
