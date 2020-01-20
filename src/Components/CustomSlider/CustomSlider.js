import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import Slider from 'rc-slider';
import './CustomSlider.scss';

export const CustomHandle = props => {
  const { value, dragging, index, ...restProps } = props;

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

export const CustomSlider = props => {
  const { value, handleAfterChange, attribute, text, offset, ...rest } = props;

  return (
    <div className="custom-slider">
      <p>{text}</p>
      <p>{value}</p>
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
