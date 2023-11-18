import React from 'react';

export interface MenuItem {
  label: string;
  key: string;
  path: string;
  filepath: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  parentKeys?: string[];
  // element?: { element: () => Promise<{ [key: string]: any }> };
}
