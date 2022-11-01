import React from "react"
import PropTypes from 'prop-types';
import Clickable from "./Clickable"

const IconClickable = (props) => {
  const {
    handleClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    icon,
    padding = 5,
    className,
    style,
    children,
  } = props

  return (
    <Clickable
      handleClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${padding}px`
      }}
      className={className}
    >
      {icon}
      {children}
    </Clickable>
  )
}

IconClickable.propTypes = {
  theme: PropTypes.oneOf(['nocturne', 'con fuoco']),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  icon: PropTypes.element,
  padding: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default IconClickable