export const globalConfig = () => {
  return {
    // Layout token配置
    token: {
      colorPrimary: '#00d1d1',
    },
    components: {
      // 组件的默认配置
      Modal: {
        // 在这里设置全局的 Modal 配置
        headerBg: '#ffffff00',
        contentBg: '#ffffff1f',
      },
    },
  };
};
