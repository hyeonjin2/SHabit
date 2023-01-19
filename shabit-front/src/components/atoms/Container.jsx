import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = ({ size, bg, border, shadow, onClick, children }) => {
  const bgClass = `bg-${bg}`;

  return (
    <ContainerWrapper
      className={` ${size} ${bgClass} ${border} ${shadow}`}
      onClick={onClick}
    >
      {children}
    </ContainerWrapper>
  );
};

Container.propTypes = {
  size: PropTypes.oneOf(['md', 'square']).isRequired,
  bg: PropTypes.oneOf(['primary', 'secondary']),
  border: PropTypes.oneOf(['rounded']),
  shadow: PropTypes.oneOf(['shadow']),
  onClick: PropTypes.func,
  children: PropTypes.element,
};

Container.defaultProps = {
  size: undefined,
  bg: undefined,
  border: undefined,
  shadow: undefined,
  onClick: undefined,
  children: undefined,
};

const ContainerWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.whiteColor};

  &.bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
  }

  &.bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  &.rounded {
    border-radius: 1.5rem;
  }

  &.shadow {
    box-shadow: 0 0.1rem 0.5rem ${({ theme }) => theme.color.grayColor};
  }
}

  &.md{
    width: 28rem;
    height: 25rem;
  }

  &.square {
    width: 27rem;
    height: 27rem;
  }
`;

export default Container;
