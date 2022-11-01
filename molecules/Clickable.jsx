import React, { useState } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Clickable = (props) => {
  const {
    elemKey,
    className,
    children,
    handleClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    style = { padding: '5px' },
    isSelected = false,
  } = props
  const [isHovering, setHovering] = useState(false)

  const _onMouseEnter = () => {
    onMouseEnter()
    setHovering(true)
  }

  const _onMouseLeave = () => {
    onMouseLeave()
    setHovering(false)
  }

  return (
    <Elem
      key={elemKey}
      className={`clickable ${className}`}
      onClick={() => {
        handleClick()
      }} 
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      style={style}
      tabIndex='0'
      isSelected={isSelected}
      isHovering={isHovering}
    >
      {children}
    </Elem>
  )
}

Clickable.propTypes = {
  theme: PropTypes.oneOf(['nocturne', 'con fuoco']),
  elemKey: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  style: PropTypes.object,
  isSelected: PropTypes.bool,
}

const Elem = styled.div`
  background-color: ${props => (props.isHovering && props.theme.color4) || (props.isSelected && props.theme.color2)}
`;

export default Clickable