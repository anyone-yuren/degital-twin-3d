import React from 'react';
import {
  DashboardOutlined,
  GithubFilled,
  InfoCircleFilled,
  LoginOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { ProBreadcrumb, ProConfigProvider, ProSettings } from '@ant-design/pro-components';
import ProLayout from '@ant-design/pro-layout';
import { Input, Switch, Tooltip } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings } from 'utils';

import {
  AuthContext,
  useAppDispatch,
  useAppSelector,
  KeepAlive,
  useLocationListen,
  shallowEqual,
} from 'hooks';
import { getOperatingSystem, treeRouter } from 'utils';
import Logo from '../../assets/logo.png';

import { Settings as layoutSetting } from '../../config/defaultSetting';
// import { baseRouterList } from "@/routes";

export const baseRouterList = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    path: 'dashboard',
    icon: <DashboardOutlined />,
    filepath: 'pages/dashboard/index.tsx',
  },
];
export default () => {
  const user = useAppSelector((state) => state.user, shallowEqual);
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const dispatch = useAppDispatch();
  const { signOut } = useContext(AuthContext);
  const [dark, setDark] = useState(
    getOperatingSystem() === 'mac' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useLocationListen((listener) => {
    // console.log(listener, "listener");
    setPathname(listener.pathname);
  });

  const settings: ProSettings | undefined = {
    title: Settings.title.slice(0, 11),
    ...layoutSetting,
    // contentWidth: 'Fluid',
    // splitMenus: true,
  };

  useEffect(() => {
    // 监听 Macos系统 颜色切换
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (event.matches) {
        setDark(true);
      } else {
        setDark(false);
      }
    });
  }, []);

  return (
    <ProConfigProvider dark={dark}>
      <div
        id="admin-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          siderWidth={245}
          logo={<img src={Logo} alt="logo" style={{ width: '60px', height: '20px' }} />}
          // className="h-full"
          style={{
            height: '100vh',
          }}
          ErrorBoundary={false}
          route={{
            path: '/',
            routes: treeRouter([...baseRouterList, ...user.menu]),
          }}
          {...settings}
          location={{
            pathname,
          }}
          waterMarkProps={{
            content: Settings.title,
          }}
          appList={[
            {
              icon: Settings.logo,
              title: 'WMS',
              desc: 'WMS系统',
            },
          ]}
          avatarProps={{
            src: Settings.logo,
            size: 'small',
            title: <div>{(user.token as unknown as { username: string })?.username}</div>,
          }}
          // headerContentRender={() => <ProBreadcrumb />}
          // actionsRender={(props) => {
          //   if (props.isMobile) return [];
          //   return [
          //     props.layout !== 'side' && document.body.clientWidth > 1400 ? (
          //       <div
          //         key="SearchOutlined"
          //         aria-hidden
          //         style={{
          //           display: 'flex',
          //           alignItems: 'center',
          //           marginInlineEnd: 24,
          //         }}
          //         onMouseDown={(e) => {
          //           e.stopPropagation();
          //           e.preventDefault();
          //         }}
          //       >
          //         <Input
          //           style={{
          //             borderRadius: 4,
          //             marginInlineEnd: 12,
          //             backgroundColor: 'rgba(57,62,67,1)',
          //             color: '#fff',
          //           }}
          //           prefix={
          //             <SearchOutlined
          //               style={{
          //                 color: '#dfdfdf',
          //               }}
          //             />
          //           }
          //           placeholder="搜索方案"
          //           bordered={false}
          //         />
          //         <PlusCircleFilled
          //           style={{
          //             color: 'var(--ant-primary-color)',
          //             fontSize: 24,
          //           }}
          //         />
          //       </div>
          //     ) : undefined,
          //     <InfoCircleFilled key="InfoCircleFilled" />,
          //     <QuestionCircleFilled key="QuestionCircleFilled" />,
          //     <GithubFilled key="GithubFilled" />,
          //   ];
          // }}
          menuFooterRender={(props) => {
            if (props?.collapsed || props?.isMobile) return undefined;
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <QuestionCircleFilled key="QuestionCircleFilled" />
                <InfoCircleFilled key="InfoCircleFilled" />
                {/* <Tooltip placement="bottom" title={'Switch topic'}>
                  <Switch
                    checkedChildren="🌜"
                    unCheckedChildren="🌞"
                    checked={dark}
                    onChange={(v) => setDark(v)}
                  />
                </Tooltip> */}
              </div>
            );
          }}
          menuItemRender={(item, dom) => (
            <Link
              to={item?.path || '/'}
              onClick={() => {
                setPathname(item.path || '/');
              }}
            >
              {dom}
            </Link>
          )}
          onMenuHeaderClick={() => navigate('/')}
        >
          <ErrorBoundary>
            <KeepAlive include={[]} keys={[]} />
          </ErrorBoundary>
        </ProLayout>
      </div>
    </ProConfigProvider>
  );
};
