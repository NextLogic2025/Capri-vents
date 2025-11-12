import React from 'react';
import UiButton from './UiButton';

const PrimaryButton = ({
  title,
  onPress,
  disabled,
  size = 'md',
  isFullWidth,
  rounded,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  return (
    <UiButton
      title={title}
      onPress={onPress}
      disabled={disabled}
      size={size}
      isFullWidth={isFullWidth}
      rounded={rounded}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      style={style}
      textStyle={textStyle}
      variant="primary"
    />
  );
};

export default PrimaryButton;

