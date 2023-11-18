import './main.css';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { globalConfig } from 'utils';

import App from './app';
// import store from "./store";
import { store, Provider } from 'store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <BrowserRouter
      // 生产环境配置二级路径
      basename={'/' + import.meta.env.BASE_URL.replaceAll('/', '')}
    >
      <ConfigProvider theme={{ ...globalConfig() }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
