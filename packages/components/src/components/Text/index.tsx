import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import React, { memo } from 'react';

const Text = ({ children, ...props }: TextProps) => (
  <Typography.Text {...props}>{children}</Typography.Text>
);

export default memo(Text);
