import { DesktopOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';

import { MenuItem } from 'components';

export const MenuData: {
  user: MenuItem[];
  admin: MenuItem[];
} = {
  user: [
    {
      label: 'User',
      key: 'user',
      path: '/user',
      icon: <DesktopOutlined />,
      filepath: 'pages/user/index.tsx',
    },
  ],
  admin: [
    {
      label: '告警监控',
      key: 'alarm',
      path: 'alarm',
      icon: <DesktopOutlined />,
      filepath: 'pages/alarm/index.tsx',
    },
    // {
    //   label: 'List Page',
    //   key: 'list-page',
    //   path: 'list-page',
    //   icon: <TableOutlined />,
    //   filepath: 'pages/list-page/index.tsx',
    // },
    // {
    //   label: 'System Management',
    //   key: 'systemManagement',
    //   path: 'systemManagement',
    //   icon: <UserOutlined />,
    //   filepath: 'components/OutletLayoutRouter/index.tsx',
    //   children: [
    //     {
    //       label: 'User Management',
    //       key: 'userManagement',
    //       path: 'userManagement',
    //       filepath: 'pages/systemManagement/userManagement/index.tsx',
    //     },
    //     {
    //       label: 'Role Management',
    //       key: 'roleManagement',
    //       path: 'roleManagement',
    //       filepath: 'pages/systemManagement/roleManagement/index.tsx',
    //     },
    //   ],
    // },
  ],
};
