import React from "react"
import PropTypes from 'prop-types';
import Clickable from "./Clickable"

const IconClickable = (props) => {
  const {
    handleClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    showBorderOnHover = false,
    icon,
    label,
    padding = 5,
    className,
    style,
    children,
  } = props

  return (
    <Clickable
      className={className}
      handleClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      showBorderOnHover={showBorderOnHover}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${padding}px`
      }}
    >
      {icon}
      {children}
      {label && <span style={{ marginLeft:'5px'}}>{label}</span>}
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