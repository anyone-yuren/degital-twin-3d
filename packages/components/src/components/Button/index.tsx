import { Button, ButtonProps } from 'antd';
import React from 'react';

const AntButton = ({ children, ...props }: ButtonProps) => {
  return <Button {...props} >{children}</Button>;
};

export default AntButton;
