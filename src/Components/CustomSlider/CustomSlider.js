import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider, { Handle } from 'rc-slider';

export const CustomHandle = ({ value, dragging, index, ...restProps }) => {
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export const CustomSlider = ({
  value,
  handleAfterChange,
  attribute,
  text,
  offset,
  ...rest
}) => {
  return (
    <div className="custom-slider">
      <p>
        {text} {value}
      </p>
      <Slider
        {...rest}
        defaultValue={value}
        handle={CustomHandle}
        onAfterChange={value => handleAfterChange(value)}
      />
    </div>
  );
};

export const GenerateCustomSlider = ({
  CustomComponent = CustomSlider,
  ...customProps
}) => {
  return <CustomComponent {...customProps} />;
};
